import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Send, Users, Plus, Trash2 } from "lucide-react";

const NewsletterManager = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Mock subscribers data
  const [subscribers] = useState([
    { id: 1, email: "john.doe@email.com", name: "John Doe", subscribed: "2024-01-15", status: "active" },
    { id: 2, email: "jane.smith@email.com", name: "Jane Smith", subscribed: "2024-01-20", status: "active" },
    { id: 3, email: "michael.johnson@email.com", name: "Michael Johnson", subscribed: "2024-02-01", status: "active" },
    { id: 4, email: "sarah.williams@email.com", name: "Sarah Williams", subscribed: "2024-02-10", status: "paused" },
    { id: 5, email: "david.brown@email.com", name: "David Brown", subscribed: "2024-02-15", status: "active" },
  ]);

  // Mock sent newsletters
  const [sentNewsletters] = useState([
    { id: 1, subject: "Monthly Health Tips - February 2024", sentDate: "2024-02-01", recipients: 1248, status: "sent" },
    { id: 2, subject: "Cervical Cancer Awareness Week", sentDate: "2024-01-25", recipients: 1180, status: "sent" },
    { id: 3, subject: "New Health Programs Launched", sentDate: "2024-01-15", recipients: 1150, status: "sent" },
  ]);

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
    
    // Mock API call - replace with your backend
    setTimeout(() => {
      toast({
        title: "Newsletter sent successfully",
        description: `"${subject}" sent to ${subscribers.filter(s => s.status === 'active').length} active subscribers`,
      });
      setSubject("");
      setContent("");
      setIsSending(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Newsletter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
            <p className="text-xs text-muted-foreground">
              {subscribers.filter(s => s.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Newsletters Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sentNewsletters.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67.8%</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Newsletter Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Newsletter
            </CardTitle>
          </CardHeader>
          <CardContent>
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
              <Button type="submit" disabled={isSending} className="w-full">
                {isSending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send to {subscribers.filter(s => s.status === 'active').length} Subscribers
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Newsletters */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Newsletters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentNewsletters.map((newsletter) => (
                <div key={newsletter.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{newsletter.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      Sent on {newsletter.sentDate} to {newsletter.recipients} recipients
                    </p>
                  </div>
                  <Badge variant="secondary">Sent</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Subscribers
            </span>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Subscriber
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subscribed Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">{subscriber.name}</TableCell>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>{subscriber.subscribed}</TableCell>
                  <TableCell>
                    <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'}>
                      {subscriber.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManager;