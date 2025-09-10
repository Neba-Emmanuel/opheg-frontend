import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import {
  useCreateAppointment,
  useAppointments,
  useUpdateAppointment,
  useDeleteAppointment,
} from "@/hooks/useAppointments";

const AppointmentsManager = () => {
  const { data: fetchedAppointments, isLoading, isError } = useAppointments();
  const [appointments, setAppointments] = useState(fetchedAppointments || []);
  const createAppointment = useCreateAppointment();

  const updateAppointment = useUpdateAppointment();
  const deleteAppointment = useDeleteAppointment();

  useEffect(() => {
    if (fetchedAppointments) {
      setAppointments(fetchedAppointments);
    }
  }, [fetchedAppointments]);

  type AppointmentStatus = "pending" | "approved" | "cancelled" | "completed";

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "confirmed":
        return <Badge variant="default">Confirmed</Badge>;
      case "completed":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter((apt) => apt.status === "pending").length,
    confirmed: appointments.filter((apt) => apt.status === "approved").length,
    completed: appointments.filter((apt) => apt.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Appointment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Confirmed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.confirmed}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Appointments Management
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Patient Info</TableHead>
                  <TableHead className="min-w-[120px] hidden sm:table-cell">Contact</TableHead>
                  <TableHead className="min-w-[180px]">Appointment Details</TableHead>
                  <TableHead className="min-w-[150px] hidden md:table-cell">Reason</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">{appointment.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {appointment.email}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground sm:hidden mt-1">
                            <Phone className="h-3 w-3" />
                            {appointment.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        <span className="truncate">{appointment.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs truncate">{appointment.location}</span>
                        </div>
                        <div className="md:hidden mt-2">
                          <p className="text-xs text-muted-foreground truncate" title={appointment.reason}>
                            {appointment.reason}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs hidden md:table-cell">
                      <p className="text-sm truncate" title={appointment.reason}>
                        {appointment.reason}
                      </p>
                    </TableCell>
                    <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-0.5">
                        {appointment.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              title="Approve"
                              onClick={() =>
                                handleStatusUpdate(appointment.id, "approved")
                              }
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              title="Cancel"
                              onClick={() =>
                                handleStatusUpdate(appointment.id, "cancelled")
                              }
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}

                        {appointment.status === "approved" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            title="Mark Complete"
                            onClick={() =>
                              handleStatusUpdate(appointment.id, "completed")
                            }
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsManager;
