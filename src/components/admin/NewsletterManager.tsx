import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Send, Users, Mail, UserX } from "lucide-react";
import { useSubscribers, useSendNewsletter } from "@/hooks/useNewsletter";
import { formatTimestampShort } from "@/lib/utils";

const NewsletterManager = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { data: subscribers, isLoading } = useSubscribers();
  const sendNewsletters = useSendNewsletter();

  const activeCount = subscribers?.filter((s) => s.isActive === true).length ?? 0;
  const inactiveCount = subscribers?.filter((s) => s.isActive === false).length ?? 0;

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) {
      toast({
        title: "Missing information",
        description: "Please fill in both subject and content",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    await sendNewsletters.mutateAsync({
      subject,
      html: content,
      toAll: true,
    });

    setTimeout(() => {
      toast({
        title: "Newsletter sent successfully",
        description: `"${subject}" sent to ${activeCount} active subscribers`,
      });
      setSubject("");
      setContent("");
      setIsSending(false);
    }, 2000);
  };

  const stats = [
    { label: "Total subscribers", value: subscribers?.length ?? 0, icon: Users, hint: `${activeCount} active`, tone: "" },
    { label: "Inactive", value: inactiveCount, icon: UserX, hint: "Paused subscriptions", tone: "is-warning" },
  ];

  return (
    <div className="admin-manager">
      <div className="admin-mgr-stats" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        {stats.map((s) => (
          <div key={s.label} className="admin-mgr-stat">
            <div className="admin-mgr-stat-top">
              <span>{s.label}</span>
              <s.icon size={17} />
            </div>
            <div className={`admin-mgr-stat-value ${s.tone}`}>{s.value}</div>
            <div className="admin-mgr-stat-hint">{s.hint}</div>
          </div>
        ))}
      </div>

      <div className="admin-section">
        <div className="admin-section-head">
          <div>
            <h3>
              <Send size={18} />
              Compose newsletter
            </h3>
            <p>Keep your community informed, connected, and inspired.</p>
          </div>
        </div>
        <div className="admin-section-body is-padded">
          <form onSubmit={handleSendNewsletter} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter newsletter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter newsletter content"
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="admin-form-actions">
              <Button type="submit" disabled={isSending} className="w-full sm:w-auto">
                {isSending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send to {activeCount} subscribers
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="admin-section">
        <div className="admin-section-head">
          <div>
            <h3>
              <Users size={18} />
              Subscribers
            </h3>
            <p>Everyone who has opted in to hear from OPHEG.</p>
          </div>
        </div>
        <div className="admin-section-body">
          {isLoading ? (
            <div className="admin-empty" role="status">Loading subscribers…</div>
          ) : !subscribers || subscribers.length === 0 ? (
            <div className="admin-empty">
              <Mail size={30} />
              <h3>No subscribers yet</h3>
              <p>New newsletter sign-ups will appear here.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <Table className="min-w-[500px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Email</TableHead>
                    <TableHead className="min-w-[120px] hidden sm:table-cell">Subscribed</TableHead>
                    <TableHead className="min-w-[90px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="text-sm">
                        <div>
                          <span className="truncate block font-medium">{subscriber.email}</span>
                          <div className="sm:hidden admin-row-meta">
                            {formatTimestampShort(subscriber.createdAt)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {formatTimestampShort(subscriber.createdAt)}
                      </TableCell>
                      <TableCell>
                        <span className={`admin-pill ${subscriber.isActive ? "is-active" : "is-paused"}`}>
                          {subscriber.isActive ? "Active" : "Paused"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterManager;
