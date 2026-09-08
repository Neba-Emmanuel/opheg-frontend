import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  useAppointments,
  useUpdateAppointment,
} from "@/hooks/useAppointments";

type AppointmentStatus = "pending" | "approved" | "cancelled" | "completed";

const StatusPill = ({ status }: { status: string }) => (
  <span className={`admin-pill is-${status}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

const AppointmentsManager = () => {
  const { data: fetchedAppointments, isLoading, isError } = useAppointments();
  const [appointments, setAppointments] = useState(fetchedAppointments || []);
  const updateAppointment = useUpdateAppointment();

  useEffect(() => {
    if (fetchedAppointments) {
      setAppointments(fetchedAppointments);
    }
  }, [fetchedAppointments]);

  const handleStatusUpdate = async (
    appointmentId: number,
    newStatus: AppointmentStatus
  ) => {
    try {
      await updateAppointment.mutateAsync({
        id: appointmentId,
        status: newStatus,
      });

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );

      toast({
        title: "Appointment updated",
        description: `Appointment status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not update appointment status",
        variant: "destructive",
      });
    }
  };

  const stats = [
    { label: "Total", value: appointments.length, tone: "" },
    {
      label: "Pending",
      value: appointments.filter((a) => a.status === "pending").length,
      tone: "is-warning",
    },
    {
      label: "Confirmed",
      value: appointments.filter((a) => a.status === "approved").length,
      tone: "is-info",
    },
    {
      label: "Completed",
      value: appointments.filter((a) => a.status === "completed").length,
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
              <Calendar size={17} />
            </div>
            <div className={`admin-mgr-stat-value ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="admin-section">
        <div className="admin-section-head">
          <div>
            <h3>
              <Calendar size={18} />
              Appointments
            </h3>
            <p>Review requests and keep care moving for your community.</p>
          </div>
        </div>
        <div className="admin-section-body">
          {isLoading ? (
            <div className="admin-empty" role="status">
              Loading appointments…
            </div>
          ) : isError ? (
            <div className="admin-empty">Appointments are currently unavailable.</div>
          ) : appointments.length === 0 ? (
            <div className="admin-empty">
              <Calendar size={30} />
              <h3>No appointments yet</h3>
              <p>New appointment requests will appear here.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <Table className="min-w-[760px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Patient</TableHead>
                    <TableHead className="min-w-[120px] hidden sm:table-cell">
                      Contact
                    </TableHead>
                    <TableHead className="min-w-[180px]">Details</TableHead>
                    <TableHead className="min-w-[150px] hidden md:table-cell">
                      Reason
                    </TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[110px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="admin-row-person">
                          <span className="admin-row-avatar">
                            {appointment.name.slice(0, 1).toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="admin-row-name">{appointment.name}</p>
                            <div className="admin-row-meta">
                              <span className="truncate">{appointment.email}</span>
                            </div>
                            <div className="admin-row-meta sm:hidden">
                              <Phone className="h-3 w-3" />
                              {appointment.phone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="admin-row-meta">
                          <Phone className="h-3 w-3" />
                          <span className="truncate">{appointment.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="admin-row-meta">
                            <Calendar className="h-3 w-3" />
                            {appointment.date}
                          </div>
                          <div className="admin-row-meta">
                            <Clock className="h-3 w-3" />
                            {appointment.time}
                          </div>
                          <div className="admin-row-meta">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{appointment.location}</span>
                          </div>
                          <div className="md:hidden admin-row-meta">
                            <span className="truncate" title={appointment.reason}>
                              {appointment.reason}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs hidden md:table-cell">
                        <p className="text-sm truncate" title={appointment.reason}>
                          {appointment.reason}
                        </p>
                      </TableCell>
                      <TableCell>
                        <StatusPill status={appointment.status} />
                      </TableCell>
                      <TableCell>
                        <div className="admin-actions">
                          {appointment.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="admin-act admin-act-approve"
                                title="Approve"
                                onClick={() =>
                                  handleStatusUpdate(appointment.id, "approved")
                                }
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="admin-act admin-act-reject"
                                title="Cancel"
                                onClick={() =>
                                  handleStatusUpdate(appointment.id, "cancelled")
                                }
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {appointment.status === "approved" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="admin-act admin-act-approve"
                              title="Mark complete"
                              onClick={() =>
                                handleStatusUpdate(appointment.id, "completed")
                              }
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
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
    </div>
  );
};

export default AppointmentsManager;
