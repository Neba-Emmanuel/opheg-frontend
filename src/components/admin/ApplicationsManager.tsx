import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { UserPlus, Handshake, CheckCircle, XCircle, Eye, Mail, Phone, Calendar } from "lucide-react";

const ApplicationsManager = () => {
  // Mock volunteer applications
  const [volunteerApplications, setVolunteerApplications] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+237 650 111 222",
      position: "Health Outreach Coordinator",
      experience: "3 years in community health",
      motivation: "Passionate about community health education and prevention",
      status: "pending",
      appliedDate: "2024-12-08"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+237 651 333 444",
      position: "Medical Volunteer",
      experience: "Medical student, 4th year",
      motivation: "Want to contribute to healthcare access in underserved communities",
      status: "approved",
      appliedDate: "2024-12-06"
    },
    {
      id: 3,
      name: "Grace Nduma",
      email: "grace.nduma@email.com",
      phone: "+237 652 555 666",
      position: "Data Entry Volunteer",
      experience: "Administrative experience in healthcare",
      motivation: "Support OPHEG's mission through administrative assistance",
      status: "pending",
      appliedDate: "2024-12-05"
    }
  ]);

  // Mock partnership applications
  const [partnershipApplications, setPartnershipApplications] = useState([
    {
      id: 1,
      organizationName: "Regional Medical Center",
      contactPerson: "Dr. Emmanuel Tabi",
      email: "contact@regionalmed.cm",
      phone: "+237 670 123 456",
      partnershipType: "Healthcare Provider",
      proposal: "Collaboration on community health screenings and referrals",
      resources: "Medical equipment, specialized staff, facilities",
      status: "under_review",
      appliedDate: "2024-12-07"
    },
    {
      id: 2,
      organizationName: "Community Development Foundation",
      contactPerson: "Mrs. Patience Fon",
      email: "info@cdf.org",
      phone: "+237 671 987 654",
      partnershipType: "NGO Collaboration",
      proposal: "Joint health education programs in rural communities",
      resources: "Community networks, transportation, local knowledge",
      status: "pending",
      appliedDate: "2024-12-03"
    }
  ]);

  const handleVolunteerStatusUpdate = (id: number, status: string) => {
    setVolunteerApplications(prev =>
      prev.map(app => app.id === id ? { ...app, status } : app)
    );
    toast({
      title: "Volunteer application updated",
      description: `Application status changed to ${status}`,
    });
  };

  const handlePartnershipStatusUpdate = (id: number, status: string) => {
    setPartnershipApplications(prev =>
      prev.map(app => app.id === id ? { ...app, status } : app)
    );
    toast({
      title: "Partnership application updated",
      description: `Application status changed to ${status}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-600 hover:bg-blue-700">Under Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-600 hover:bg-green-700">Approved</Badge>;
      case 'rejected':
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Volunteer Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteerApplications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Partnership Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partnershipApplications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {volunteerApplications.filter(a => a.status === 'pending').length + 
               partnershipApplications.filter(a => a.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {volunteerApplications.filter(a => a.status === 'approved').length + 
               partnershipApplications.filter(a => a.status === 'approved').length}
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

        <TabsContent value="volunteers">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Experience</TableHead>
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
                      <TableCell className="font-medium">{application.position}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate" title={application.experience}>
                          {application.experience}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {application.appliedDate}
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
                            onClick={() => {
                              toast({
                                title: "Viewing application",
                                description: `Opening details for ${application.name}`,
                              });
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {application.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleVolunteerStatusUpdate(application.id, 'approved')}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleVolunteerStatusUpdate(application.id, 'rejected')}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partnerships">
          <Card>
            <CardHeader>
              <CardTitle>Partnership Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Partnership Type</TableHead>
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
                          <p className="font-medium">{application.organizationName}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {application.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{application.contactPerson}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {application.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{application.partnershipType}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {application.appliedDate}
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
                            onClick={() => {
                              toast({
                                title: "Viewing partnership request",
                                description: `Opening details for ${application.organizationName}`,
                              });
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {(application.status === 'pending' || application.status === 'under_review') && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePartnershipStatusUpdate(application.id, 'approved')}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePartnershipStatusUpdate(application.id, 'rejected')}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationsManager;