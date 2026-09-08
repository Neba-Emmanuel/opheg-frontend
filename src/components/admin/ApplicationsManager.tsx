import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  UserPlus,
  Handshake,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  Calendar,
  Users,
} from "lucide-react";
import { useApplications, useUpdateApplication } from "@/hooks/useApplications";

const statusClass: Record<string, string> = {
  pending: "is-pending",
  under_review: "is-review",
  approved: "is-approved",
  rejected: "is-rejected",
};

const StatusPill = ({ status }: { status: string }) => {
  const label = status === "under_review" ? "Under review" : status.charAt(0).toUpperCase() + status.slice(1);
  return <span className={`admin-pill ${statusClass[status] ?? "is-draft"}`}>{label}</span>;
};

const ApplicationsManager = () => {
  const volunteerQuery = useApplications("volunteer");
  const partnerQuery = useApplications("partner");
  const updateApplication = useUpdateApplication();

  const volunteerApplications = volunteerQuery.data || [];
  const partnershipApplications = partnerQuery.data || [];

  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  const handleStatusUpdate = (
    id: number,
    status: string,
    type: "volunteer" | "partner"
  ) => {
    updateApplication.mutate(
      { id, status },
      {
        onSuccess: () => {
          toast({
            title: `${type === "volunteer" ? "Volunteer" : "Partnership"} application updated`,
            description: `Application status changed to ${status}`,
          });
          setSelectedApp(null);
        },
        onError: () => {
          toast({
            title: "Error updating application",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const stats = [
    { label: "Volunteers", value: volunteerApplications.length, icon: UserPlus, tone: "" },
    { label: "Partnerships", value: partnershipApplications.length, icon: Handshake, tone: "" },
    {
      label: "Pending review",
      value:
        volunteerApplications.filter((a) => a.status === "pending").length +
        partnershipApplications.filter((a) => a.status === "pending").length,
      icon: Users,
      tone: "is-warning",
    },
    {
      label: "Approved",
      value:
        volunteerApplications.filter((a) => a.status === "approved").length +
        partnershipApplications.filter((a) => a.status === "approved").length,
      icon: CheckCircle,
      tone: "is-success",
    },
  ];

  return (
    <div className="admin-manager">
      <div className="admin-mgr-stats">
        {stats.map((s) => (
          <div key={s.label} className="admin-mgr-stat">
            <div className="admin-mgr-stat-top">
              <span>{s.label}</span>
              <s.icon size={17} />
            </div>
            <div className={`admin-mgr-stat-value ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="volunteers" className="space-y-4">
        <TabsList className="flex w-full gap-2">
          <TabsTrigger value="volunteers" className="flex-1 flex items-center justify-center gap-2">
            <UserPlus className="h-4 w-4" />
            Volunteers
          </TabsTrigger>
          <TabsTrigger value="partnerships" className="flex-1 flex items-center justify-center gap-2">
            <Handshake className="h-4 w-4" />
            Partnerships
          </TabsTrigger>
        </TabsList>

        <TabsContent value="volunteers">
          <div className="admin-section">
            <div className="admin-section-head">
              <div>
                <h3>
                  <UserPlus size={18} />
                  Volunteer applications
                </h3>
                <p>People ready to give their time to the mission.</p>
              </div>
            </div>
            <div className="admin-section-body">
              {volunteerQuery.isLoading ? (
                <div className="admin-empty" role="status">Loading applications…</div>
              ) : volunteerApplications.length === 0 ? (
                <div className="admin-empty">
                  <UserPlus size={30} />
                  <h3>No volunteer applications yet</h3>
                  <p>New applications will appear here.</p>
                </div>
              ) : (
                <div className="admin-table-wrap">
                  <Table className="min-w-[600px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Applicant</TableHead>
                        <TableHead className="min-w-[120px] hidden md:table-cell">Interest</TableHead>
                        <TableHead className="min-w-[100px] hidden sm:table-cell">Applied</TableHead>
                        <TableHead className="min-w-[90px]">Status</TableHead>
                        <TableHead className="min-w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {volunteerApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div className="admin-row-person">
                              <span className="admin-row-avatar">
                                {application.name.slice(0, 1).toUpperCase()}
                              </span>
                              <div className="min-w-0">
                                <p className="admin-row-name">{application.name}</p>
                                <div className="admin-row-meta">
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate">{application.email}</span>
                                </div>
                                <div className="admin-row-meta">
                                  <Phone className="h-3 w-3" />
                                  {application.phone}
                                </div>
                                <div className="md:hidden admin-row-meta">
                                  {application.interest}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm">
                            {application.interest}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="admin-row-meta">
                              <Calendar className="h-3 w-3" />
                              {new Date(application.createdAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusPill status={application.status} />
                          </TableCell>
                          <TableCell>
                            <div className="admin-actions">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="admin-act"
                                title="View details"
                                onClick={() => setSelectedApp(application)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {application.status === "pending" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="admin-act admin-act-approve"
                                    title="Approve"
                                    onClick={() =>
                                      handleStatusUpdate(application.id, "approved", "volunteer")
                                    }
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="admin-act admin-act-reject"
                                    title="Reject"
                                    onClick={() =>
                                      handleStatusUpdate(application.id, "rejected", "volunteer")
                                    }
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="partnerships">
          <div className="admin-section">
            <div className="admin-section-head">
              <div>
                <h3>
                  <Handshake size={18} />
                  Partnership requests
                </h3>
                <p>Organizations looking to join forces for greater impact.</p>
              </div>
            </div>
            <div className="admin-section-body">
              {partnerQuery.isLoading ? (
                <div className="admin-empty" role="status">Loading requests…</div>
              ) : partnershipApplications.length === 0 ? (
                <div className="admin-empty">
                  <Handshake size={30} />
                  <h3>No partnership requests yet</h3>
                  <p>New requests will appear here.</p>
                </div>
              ) : (
                <div className="admin-table-wrap">
                  <Table className="min-w-[700px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[180px]">Organization</TableHead>
                        <TableHead className="min-w-[120px] hidden md:table-cell">Contact</TableHead>
                        <TableHead className="min-w-[100px] hidden sm:table-cell">Type</TableHead>
                        <TableHead className="min-w-[100px] hidden sm:table-cell">Applied</TableHead>
                        <TableHead className="min-w-[90px]">Status</TableHead>
                        <TableHead className="min-w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {partnershipApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div className="admin-row-person">
                              <span className="admin-row-avatar">
                                {(application.organization ?? application.name).slice(0, 1).toUpperCase()}
                              </span>
                              <div className="min-w-0">
                                <p className="admin-row-name">{application.organization}</p>
                                <div className="admin-row-meta">
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate">{application.email}</span>
                                </div>
                                <div className="md:hidden admin-row-meta">
                                  Contact: {application.name}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm">
                            {application.name}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm">
                            {application.interest}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="admin-row-meta">
                              <Calendar className="h-3 w-3" />
                              {new Date(application.createdAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusPill status={application.status} />
                          </TableCell>
                          <TableCell>
                            <div className="admin-actions">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="admin-act"
                                title="View details"
                                onClick={() => setSelectedApp(application)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {application.status === "pending" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="admin-act admin-act-approve"
                                    title="Approve"
                                    onClick={() =>
                                      handleStatusUpdate(application.id, "approved", "partner")
                                    }
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="admin-act admin-act-reject"
                                    title="Reject"
                                    onClick={() =>
                                      handleStatusUpdate(application.id, "rejected", "partner")
                                    }
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Application details</DialogTitle>
          </DialogHeader>

          {selectedApp && (
            <div className="mt-4 space-y-6">
              <dl className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm">
                <dt className="font-medium text-muted-foreground">Name</dt>
                <dd className="col-span-2 font-medium">{selectedApp.name}</dd>

                <dt className="font-medium text-muted-foreground">Email</dt>
                <dd className="col-span-2">{selectedApp.email}</dd>

                <dt className="font-medium text-muted-foreground">Phone</dt>
                <dd className="col-span-2">{selectedApp.phone || "—"}</dd>

                {selectedApp.organization && (
                  <>
                    <dt className="font-medium text-muted-foreground">Organization</dt>
                    <dd className="col-span-2">{selectedApp.organization}</dd>
                  </>
                )}

                <dt className="font-medium text-muted-foreground">Interest</dt>
                <dd className="col-span-2">{selectedApp.interest}</dd>

                {selectedApp.message && (
                  <>
                    <dt className="font-medium text-muted-foreground">Message</dt>
                    <dd className="col-span-2">{selectedApp.message}</dd>
                  </>
                )}

                <dt className="font-medium text-muted-foreground">Status</dt>
                <dd className="col-span-2">
                  <StatusPill status={selectedApp.status} />
                </dd>

                <dt className="font-medium text-muted-foreground">Applied</dt>
                <dd className="col-span-2">
                  {new Date(selectedApp.createdAt).toLocaleString()}
                </dd>
              </dl>

              {selectedApp.status === "pending" && (
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleStatusUpdate(selectedApp.id, "rejected", selectedApp.type)
                    }
                  >
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    onClick={() =>
                      handleStatusUpdate(selectedApp.id, "approved", selectedApp.type)
                    }
                  >
                    Approve
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsManager;
