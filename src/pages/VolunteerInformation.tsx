import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEO from "@/components/SEO";
import { validateVolunteerValues, validateAttachmentMetadata, validateAttachmentContents } from "@/lib/volunteerValidation";
import { apiRequest } from "@/lib/apiClient";
import {
  Check,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Upload,
  UserRound,
  FileText,
} from "lucide-react";
import "./volunteer-information.css";
import { volunteerFields, volunteerDepartments } from "@/lib/volunteerFields";

const groups = [
  "Personal details",
  "Contact & location",
  "Your volunteering",
  "Education & experience",
  "Availability & support",
  "Emergency contact & additional details",
];
async function encodeFile(file: File, kind: "photo" | "document") {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () =>
      reject(
        new Error("Unable to read an attachment. Please select it again."),
      );
    reader.readAsDataURL(file);
  });
  return { name: file.name, kind, base64 };
}

  function readForm(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form));
    return { ...data, consent: data.consent === "on" };
  }

export default function VolunteerInformation() {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [nativeErrors, setNativeErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [assignedId, setAssignedId] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const photoInput = useRef<HTMLInputElement>(null);
  const documentInput = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [checkedAttachments, setCheckedAttachments] = useState<{ photo: File | null; documents: File[]; errors: Record<string, string> } | null>(null);
  useEffect(() => {
    let current = true;
    void validateAttachmentContents(photo, documents).then(errors => {
      if (current) setCheckedAttachments({ photo, documents, errors });
    });
    return () => { current = false; };
  }, [photo, documents]);
  const checkingAttachments = checkedAttachments?.photo !== photo || checkedAttachments?.documents !== documents;
  const fileErrors = { ...validateAttachmentMetadata(photo, documents), ...(!checkingAttachments ? checkedAttachments.errors : {}) };
  const errors = { ...nativeErrors, ...validateVolunteerValues(values) };
  const canSubmit = Object.keys(errors).length === 0 && Object.keys(fileErrors).length === 0 && !checkingAttachments;
  const syncForm = useCallback((form: HTMLFormElement) => {
    setValues(readForm(form));
    const invalid: Record<string, string> = {};
    for (const element of Array.from(form.elements)) {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
        if (element.name && !element.validity.valid) invalid[element.name] = element.validationMessage;
      }
    }
    setNativeErrors(invalid);
  }, []);
  const fieldFeedback = (key: string) => ({
    "aria-invalid": Boolean(touched[key] && errors[key]),
    "aria-describedby": touched[key] && errors[key] ? `${key}-error` : undefined,
  });
  useEffect(() => {
    const sync = () => { if (formRef.current) syncForm(formRef.current); };
    sync();
    window.addEventListener("pageshow", sync);
    return () => window.removeEventListener("pageshow", sync);
  }, [syncForm]);
  useEffect(() => {
    if (!photo) {
      setPhotoPreview("");
      return;
    }
    const url = URL.createObjectURL(photo);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);
  const submission = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const files = [...(photo ? [photo] : []), ...documents];
      if (documents.length > 3)
        throw new Error("Choose up to three PDF documents.");
      if (
        files.some((file) => file.size === 0 || file.size > 1048576) ||
        files.reduce((size, file) => size + file.size, 0) > 2621440
      )
        throw new Error(
          "Each file must be at most 1 MB, with a total of at most 2.5 MB.",
        );
      if (photo && !/\.(jpe?g|png)$/i.test(photo.name))
        throw new Error("Choose a JPG or PNG photo.");
      if (documents.some((file) => !/\.pdf$/i.test(file.name)))
        throw new Error("Choose PDF documents.");
      const attachments = await Promise.all([
        ...(photo ? [encodeFile(photo, "photo")] : []),
        ...documents.map((file) => encodeFile(file, "document")),
      ]);
      return apiRequest<{ message: string; volunteerId: string }>(
        "/volunteers",
        { method: "POST", body: JSON.stringify({ ...data, attachments }) },
      );
    },
  });
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = readForm(form);
    if (submission.isPending || !canSubmit || Object.keys(validateVolunteerValues(data)).length || !form.checkValidity()) {
      syncForm(form);
      setTouched(Object.fromEntries([...volunteerFields.map(field => field.key), "consent"].map(key => [key, true])));
      return;
    }
    try {
      const result = await submission.mutateAsync({
        ...data,
        consent: data.consent,
      });
      setAssignedId(result.volunteerId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      /* The mutation error is displayed below, preserving entered values. */
    }
  }
  return (
    <div className="volunteer-page">
      <SEO
        title="Volunteer Profile | OPHEG"
        description="Complete your OPHEG volunteer profile and receive your volunteer ID."
        canonical="/volunteer-information"
      />
      <header className="volunteer-hero">
        <div className="volunteer-shell">
          <div className="volunteer-kicker">
            <span /> THE PEOPLE BEHIND THE IMPACT
          </div>
          <h1>
            Your commitment.
            <br />
            <span>Our shared impact.</span>
          </h1>
          <p>
            Every volunteer brings something unique. Complete your profile so we
            can connect your skills with the communities that need them.
          </p>
          <div className="volunteer-hero-meta">
            <span>
              <ShieldCheck size={17} /> Private & secure
            </span>
            <span>
              <HeartHandshake size={17} /> For the Love of Humanity. We are OPHEGMITE.
            </span>
          </div>
        </div>
      </header>
      <div className="volunteer-shell volunteer-layout">
        <aside className="volunteer-guide">
          <div className="volunteer-guide-card">
            <p className="volunteer-eyebrow">YOUR VOLUNTEER PROFILE</p>
            <h2>
              A little about you.
              <br />A lot of possibility.
            </h2>
            <nav aria-label="Profile sections">
              {groups.map((group, index) => (
                <a key={group} href={`#profile-section-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {group}
                </a>
              ))}
              <a href="#profile-files">
                <span>07</span>Photo & documents
              </a>
            </nav>
            {/* <div className="volunteer-id-note">
              <ShieldCheck size={20} />
              <div>
                <strong>Your ID, assigned automatically</strong>
                <p>
                  Once you submit, you’ll receive your unique OPHEG volunteer
                  ID.
                </p>
                <code>OPHEG–YEAR–DEPT–NUMBER</code>
              </div>
            </div> */}
          </div>
          <p className="volunteer-new"><Link to="/volunteers/login">Already registered? Sign in to your portal →</Link><br />
            New to OPHEG?{" "}
            <Link to="/get-involved">
              Apply to volunteer <ArrowRight size={14} />
            </Link>
          </p>
        </aside>
        <div className="volunteer-content">
          {assignedId ? (
            <section role="status" className="volunteer-success">
              <div className="volunteer-success-icon">
                <Check size={30} />
              </div>
              <p className="volunteer-eyebrow">PROFILE RECEIVED</p>
              <h2>You’re part of the impact.</h2>
              <p>
                Your details and attachments have been saved for the OPHEG team.
              </p>
              <div className="volunteer-issued-id">
                <span>Your assigned volunteer ID</span>
                <strong>{assignedId}</strong>
                <small>
                  Keep this ID for future communication with your coordinator.
                </small>
              </div>
              <Button asChild size="lg">
                <Link to="/">
                  Back to home <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </section>
          ) : (
            <form ref={formRef} onSubmit={submit} className="volunteer-form"
              onInput={event => syncForm(event.currentTarget)}
              onChange={event => syncForm(event.currentTarget)}
              onBlur={event => {
                const field = event.target;
                if ((field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) && field.name) setTouched(previous => ({ ...previous, [field.name]: true }));
                syncForm(event.currentTarget);
              }}>
              <div className="volunteer-form-heading">
                <div>
                  <p className="volunteer-eyebrow">EXISTING VOLUNTEERS</p>
                  <h2>Complete your profile</h2>
                </div>
                <span>* Required fields</span>
              </div>
              <p className="volunteer-intro">
                Please share your current information. To update an existing profile, sign in to the volunteer portal.
              </p>
              {groups.map((group, index) => (
                <section
                  id={`profile-section-${index}`}
                  key={group}
                  className="volunteer-section"
                  aria-labelledby={`section-heading-${index}`}
                >
                  <div className="volunteer-section-heading">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 id={`section-heading-${index}`}>{group}</h3>
                      <p>
                        {
                          [
                            "Let’s start with the person behind the work.",
                            "Help us reach you and coordinate locally.",
                            "Tell us where you make a difference.",
                            "Share the knowledge you bring to the team.",
                            "Help us plan opportunities that work for you.",
                            "A contact we can reach if needed.",
                          ][index]
                        }
                      </p>
                    </div>
                  </div>
                  {group === "Emergency contact & additional details" && (
                    <p className="volunteer-field-note">
                      Emergency contact is optional. If provided, complete all
                      three fields with their permission.
                    </p>
                  )}
                  <div className="volunteer-fields">
                    {volunteerFields
                      .filter((field) => field.group === group)
                      .map((field) => (
                        <div
                          key={field.key}
                          className={
                            field.max > 250 ? "volunteer-field-wide" : ""
                          }
                        >
                          {field.key === "gender" ? (
                            <fieldset className="volunteer-gender" {...fieldFeedback(field.key)}>
                              <legend>
                                Gender <span>*</span>
                              </legend>
                              <div>
                                {["Male", "Female"].map((gender) => (
                                  <label key={gender}>
                                    <input
                                      type="radio"
                                      name="gender"
                                      {...fieldFeedback("gender")}
                                      value={gender}
                                      required
                                    />
                                    <span>{gender}</span>
                                  </label>
                                ))}
                              </div>
                            </fieldset>
                          ) : (
                            <>
                              <label htmlFor={field.key}>
                                {field.label}
                                {field.required && <span> *</span>}
                              </label>
                              {field.key === "department" ? (
                                <select
                                  id={field.key}
                                  {...fieldFeedback(field.key)}
                                  name={field.key}
                                  required
                                  defaultValue=""
                                >
                                  <option value="" disabled>
                                    Select your department
                                  </option>
                                  {volunteerDepartments.map((dept) => (
                                    <option key={dept.code} value={dept.code}>
                                      {dept.label} ({dept.code})
                                    </option>
                                  ))}
                                </select>
                              ) : field.max > 250 ? (
                                <Textarea
                                  id={field.key}
                                  {...fieldFeedback(field.key)}
                                  name={field.key}
                                  required={field.required}
                                  maxLength={field.max}
                                  rows={3}
                                />
                              ) : (
                                <Input
                                  id={field.key}
                                  {...fieldFeedback(field.key)}
                                  name={field.key}
                                  required={field.required}
                                  maxLength={field.max}
                                  type={
                                    field.key === "dateOfBirth"
                                      ? "date"
                                      : field.key === "portfolio"
                                        ? "url"
                                        : field.key === "email"
                                          ? "email"
                                          : field.key
                                                .toLowerCase()
                                                .includes("phone")
                                            ? "tel"
                                            : "text"
                                  }
                                  autoComplete={
                                    field.key === "name"
                                      ? "name"
                                      : field.key === "email"
                                        ? "email"
                                        : field.key === "phone"
                                          ? "tel"
                                          : undefined
                                  }
                                />
                              )}
                            </>
                          )}
                          {touched[field.key] && errors[field.key] && <p id={`${field.key}-error`} className="volunteer-validation-error">{errors[field.key]}</p>}
                        </div>
                      ))}
                  </div>
                </section>
              ))}
              <section
                id="profile-files"
                className="volunteer-section"
                aria-labelledby="files-heading"
              >
                <div className="volunteer-section-heading">
                  <span>07</span>
                  <div>
                    <h3 id="files-heading">Put a face to your impact.</h3>
                    <p>
                      Add an optional photo, CV, qualifications, or training
                      certificates.
                    </p>
                  </div>
                </div>
                <fieldset
                  disabled={submission.isPending}
                  className="volunteer-uploads"
                >
                  <legend className="sr-only">
                    Photo and supporting documents
                  </legend>
                  <div className="volunteer-upload">
                    <div className="volunteer-upload-icon">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Selected profile photo" />
                      ) : (
                        <UserRound size={25} />
                      )}
                    </div>
                    <label htmlFor="photo">Profile photo</label>
                    <p>JPG or PNG · Up to 1 MB</p>
                    <Input
                      ref={photoInput}
                      id="photo"
                      aria-invalid={Boolean(fileErrors.photo)}
                      aria-describedby={fileErrors.photo ? "photo-error" : undefined}
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={(event) =>
                        setPhoto(event.target.files?.[0] ?? null)
                      }
                    />
                    {photo && <small>{photo.name}</small>}
                    {fileErrors.photo && <p id="photo-error" className="volunteer-validation-error" role="alert">{fileErrors.photo}</p>}
                  </div>
                  <div className="volunteer-upload">
                    <div className="volunteer-upload-icon">
                      <FileText size={25} />
                    </div>
                    <label htmlFor="documents">Supporting documents</label>
                    <p>Up to 3 PDFs · 1 MB each</p>
                    <Input
                      ref={documentInput}
                      id="documents"
                      aria-invalid={Boolean(fileErrors.documents)}
                      aria-describedby={fileErrors.documents ? "documents-error" : undefined}
                      type="file"
                      multiple
                      accept="application/pdf"
                      onChange={(event) =>
                        setDocuments(Array.from(event.target.files ?? []))
                      }
                    />
                    {fileErrors.documents && <p id="documents-error" className="volunteer-validation-error" role="alert">{fileErrors.documents}</p>}
                    {documents.map((file, index) => (
                      <small key={`${file.name}-${index}`}>{file.name}</small>
                    ))}
                  </div>
                  {(photo || documents.length > 0) && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setPhoto(null);
                        setDocuments([]);
                        if (photoInput.current) photoInput.current.value = "";
                        if (documentInput.current)
                          documentInput.current.value = "";
                      }}
                    >
                      Clear attachments
                    </Button>
                  )}
                </fieldset>
                {fileErrors.attachments && <p className="volunteer-validation-error" role="alert">{fileErrors.attachments}</p>}
                {checkingAttachments && <p role="status" className="volunteer-field-note">Checking attachments…</p>}
                <p className="volunteer-field-note">
                  <Upload size={14} /> Maximum combined upload size: 2.5 MB.
                </p>
              </section>
              <div className="volunteer-consent">
                <ShieldCheck size={22} />
                <div>
                  <h3>Your information is in trusted hands.</h3>
                  <p>
                    Only authorized OPHEG administrators can access your
                    submission.
                  </p>
                  <label>
                    <input type="checkbox" name="consent" required {...fieldFeedback("consent")} />
                    <span>
                      I confirm my details are accurate and consent to OPHEG
                      storing my information, photo, and documents for volunteer
                      coordination and contacting me. *
                    </span>
                  </label>
                  {touched.consent && errors.consent && <p id="consent-error" className="volunteer-validation-error">{errors.consent}</p>}
                </div>
              </div>
              <p id="submit-requirements" className="volunteer-validation-status" role="status">{canSubmit ? "Your profile is ready to submit." : "Complete all required fields, correct any errors, and give your consent to enable submission."}</p>
              {submission.isError && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-4 text-red-700"
                >
                  {submission.error.message}
                </p>
              )}
              <div className="volunteer-submit">
                <p>
                  Your volunteer ID will be generated
                  <br />
                  when your profile is saved.
                </p>
                <Button type="submit" size="lg" disabled={!canSubmit || submission.isPending} aria-describedby="submit-requirements">
                  {submission.isPending
                    ? "Saving your profile…"
                    : "Submit my profile"}
                  <ArrowRight size={17} className="ml-3" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
