import EmailComposer from "./EmailComposer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Mail, UserX } from "lucide-react";
import { useSubscribers } from "@/hooks/useNewsletter";
import { formatTimestampShort } from "@/lib/utils";

const NewsletterManager = () => {
  const { data: subscribers, isLoading, isError } = useSubscribers();
  const activeCount = subscribers?.filter(s => s.isActive).length ?? 0;
  const inactiveCount = subscribers?.filter(s => !s.isActive).length ?? 0;

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

      <EmailComposer activeCount={activeCount} subscribersUnavailable={isLoading || isError} />

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
          ) : isError ? (<div role="alert" className="admin-error">Unable to load subscribers. Refresh the page to try again.</div>) : !subscribers || subscribers.length === 0 ? (
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
