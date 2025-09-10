import { useState } from "react";
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
} from "lucide-react";
import { useApplications, useUpdateApplication } from "@/hooks/useApplications";

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
            title: `${
              type === "volunteer" ? "Volunteer" : "Partnership"
            } application updated`,
            description: `Application status changed to ${status}`,
          });
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "under_review":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700">Under Review</Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">Approved</Badge>
        );
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Application Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Volunteer Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {volunteerApplications.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Partnership Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {partnershipApplications.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {volunteerApplications.filter((a) => a.status === "pending")
                .length +
                partnershipApplications.filter((a) => a.status === "pending")
                  .length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {volunteerApplications.filter((a) => a.status === "approved")
                .length +
                partnershipApplications.filter((a) => a.status === "approved")
                  .length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="volunteers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="volunteers" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Volunteer Applications
          </TabsTrigger>
          <TabsTrigger value="partnerships" className="flex items-center gap-2">
            <Handshake className="h-4 w-4" />
            Partnership Requests
          </TabsTrigger>
        </TabsList>

        {/* Volunteer Applications */}
        <TabsContent value="volunteers">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {volunteerQuery.isLoading ? (
                <p>Loading...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {volunteerApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{application.name}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {application.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {application.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {application.interest}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {new Date(
                              application.createdAt
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(application.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedApp(application)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {application.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      application.id,
                                      "approved",
                                      "volunteer"
                                    )
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      application.id,
                                      "rejected",
                                      "volunteer"
                                    )
                                  }
                                >
                                  <XCircle className="h-4 w-4 text-red-600" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Partnership Applications */}
        <TabsContent value="partnerships">
          <Card>
            <CardHeader>
              <CardTitle>Partnership Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {partnerQuery.isLoading ? (
                <p>Loading...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnershipApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {application.organization}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {application.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{application.name}</TableCell>
                        <TableCell>{application.interest}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {new Date(
                              application.createdAt
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(application.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedApp(application)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {application.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      application.id,
                                      "approved",
                                      "partner"
                                    )
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleStatusUpdate(
                                      application.id,
                                      "rejected",
                                      "partner"
                                    )
                                  }
                                >
                                  <XCircle className="h-4 w-4 text-red-600" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Application Details Modal */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Application Details
            </DialogTitle>
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
                    <dt className="font-medium text-muted-foreground">
                      Organization
                    </dt>
                    <dd className="col-span-2">{selectedApp.organization}</dd>
                  </>
                )}

                <dt className="font-medium text-muted-foreground">Interest</dt>
                <dd className="col-span-2">{selectedApp.interest}</dd>

                {selectedApp.message && (
                  <>
                    <dt className="font-medium text-muted-foreground">
                      Message
                    </dt>
                    <dd className="col-span-2">{selectedApp.message}</dd>
                  </>
                )}

                <dt className="font-medium text-muted-foreground">Status</dt>
                <dd className="col-span-2">
                  {getStatusBadge(selectedApp.status)}
                </dd>

                <dt className="font-medium text-muted-foreground">Applied</dt>
                <dd className="col-span-2">
                  {new Date(selectedApp.createdAt).toLocaleString()}
                </dd>
              </dl>

              {/* Optional Action Buttons */}
              {selectedApp.status === "pending" && (
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleStatusUpdate(
                        selectedApp.id,
                        "rejected",
                        selectedApp.type
                      )
                    }
                  >
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    onClick={() =>
                      handleStatusUpdate(
                        selectedApp.id,
                        "approved",
                        selectedApp.type
                      )
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
