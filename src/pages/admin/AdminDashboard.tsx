import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Calendar,
  Mail,
  FileText,
  UserPlus,
  Handshake,
  LogOut,
  BarChart3,
  Bell,
} from "lucide-react";
import SEO from "@/components/SEO";
import logo from "/logo.png";
import NewsletterManager from "@/components/admin/NewsletterManager";
import AppointmentsManager from "@/components/admin/AppointmentsManager";
import ApplicationsManager from "@/components/admin/ApplicationsManager";
import PostsManager from "@/components/admin/PostsManager";
import { useApplications } from "@/hooks/useApplications";
import { useAppointments } from "@/hooks/useAppointments";
import { useSubscribers } from "@/hooks/useNewsletter";
import Footer from "@/components/admin/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { data: subscribers } = useSubscribers();
  const { data: appointments } = useAppointments();
  const volunteerQuery = useApplications("volunteer");
  const partnerQuery = useApplications("partner");

  // show latest 3
  const recent = appointments?.slice(0, 3);

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem("opheg_admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("opheg_admin_token");
    navigate("/admin/login");
  };

  const stats = [
    { title: "Newsletter Subscribers", value: subscribers?.length, icon: Mail },
    {
      title: "Pending Appointments",
      value: appointments?.length,
      icon: Calendar,
    },
    {
      title: "Volunteer Applications",
      value: volunteerQuery?.data?.length,
      icon: UserPlus,
    },
    {
      title: "Partner Requests",
      value: partnerQuery?.data?.length,
      icon: Handshake,
    },
    { title: "Published Posts", value: "0", icon: FileText },
    { title: "Active Programs", value: "0", icon: BarChart3 },
  ];

  const tabs = [
    { value: "overview", label: "Overview", icon: BarChart3 },
    { value: "newsletter", label: "Newsletter", icon: Mail },
    { value: "appointments", label: "Appointments", icon: Calendar },
    { value: "applications", label: "Applications", icon: Users },
    { value: "posts", label: "Posts", icon: FileText },
  ];

  return (
    <>
      <SEO
        title="Admin Dashboard - OPHEG"
        description="OPHEG administration dashboard for managing operations"
        noindex
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="OPHEG Logo"
                className="h-14 w-14 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary">OPHEG Admin</h1>
                <p className="text-muted-foreground text-sm">
                  Dashboard & Management
                </p>
              </div>
            </div>

            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="hidden md:grid w-full grid-cols-5">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="md:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {tabs.map((tab) => (
                  <option key={tab.value} value={tab.value}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      {/* <p className="text-xs text-muted-foreground">
                        <span
                          className={
                            stat.change.startsWith("+")
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {stat.change}
                        </span>{" "}
                        from last month
                      </p> */}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Recent Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recent?.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No recent appointments
                      </p>
                    ) : (
                      recent?.map((appt) => (
                        <div
                          key={appt.id}
                          className="flex items-start space-x-3"
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              appt.status === "completed"
                                ? "bg-green-500"
                                : appt.status === "cancelled"
                                ? "bg-red-500"
                                : "bg-primary"
                            }`}
                          ></div>
                          <div>
                            <p className="text-sm font-medium">
                              {appt.name} – {appt.reason}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(appt.date).toLocaleDateString()} at{" "}
                              {appt.time} ·{" "}
                              {appt.status.charAt(0).toUpperCase() +
                                appt.status.slice(1)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setActiveTab("newsletter")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Send Newsletter
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setActiveTab("applications")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Review Applications
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => setActiveTab("posts")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Create New Post
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="newsletter">
              <NewsletterManager />
            </TabsContent>

            <TabsContent value="appointments">
              <AppointmentsManager />
            </TabsContent>

            <TabsContent value="applications">
              <ApplicationsManager />
            </TabsContent>

            <TabsContent value="posts">
              <PostsManager />
            </TabsContent>
          </Tabs>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
