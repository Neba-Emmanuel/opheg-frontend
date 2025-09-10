import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Send, Users, Plus, Trash2 } from "lucide-react";
import { useSubscribers, useSendNewsletter } from "@/hooks/useNewsletter";
import { formatTimestampShort } from "@/lib/utils";

const NewsletterManager = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { data: subscribers } = useSubscribers();
  const sendNewsletters = useSendNewsletter();

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
        description: `"${subject}" sent to ${
          subscribers?.filter((s) => s.isActive === true).length
        } active subscribers`,
      });
      setSubject("");
      setContent("");
      setIsSending(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Newsletter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers?.length}</div>
            <p className="text-xs text-muted-foreground">
              {subscribers?.filter((s) => s.isActive === true)?.length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inactive Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers?.filter((s) => s.isActive === false)?.length}
            </div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
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
                    Send to{" "}
                    {
                      subscribers?.filter((s) => s.isActive === true)?.length
                    }{" "}
                    Subscribers
                  </>
                )}
              </Button>
            </form>
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
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="overflow-x-auto">
            <Table className="min-w-[500px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[120px] hidden sm:table-cell">Subscribed At</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers?.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="text-sm">
                      <div>
                        <span className="truncate block">{subscriber.email}</span>
                        <div className="sm:hidden text-xs text-muted-foreground mt-1">
                          {formatTimestampShort(subscriber.createdAt)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                      {formatTimestampShort(subscriber.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          subscriber.isActive === true ? "default" : "secondary"
                        }
                      >
                        {subscriber.isActive === true ? "Active" : "Paused"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default NewsletterManager;
