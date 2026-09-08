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
import { Plus, Edit, Trash2, Eye, FileText, Upload } from "lucide-react";

const statusClass: Record<string, string> = {
  draft: "is-draft",
  published: "is-published",
  scheduled: "is-scheduled",
  archived: "is-archived",
};

const StatusPill = ({ status }: { status: string }) => (
  <span className={`admin-pill ${statusClass[status] ?? "is-draft"}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

const PostsManager = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 3,
      title: "Managing Sickle Cell Disease: A Comprehensive Guide",
      author: "Dr. Emmanuel Tabi",
      category: "Health Education",
      status: "draft",
      publishDate: null as string | null,
      views: 0,
      excerpt:
        "Essential information for patients and families dealing with sickle cell disease.",
    },
    {
      id: 4,
      title: "Partnership Success: OPHEG and Regional Medical Center",
      author: "OJ Nathaniel Eben",
      category: "Partnerships",
      status: "published",
      publishDate: "2024-11-25",
      views: 567,
      excerpt:
        "Celebrating our new partnership that will enhance healthcare delivery in the region.",
    },
    {
      id: 5,
      title: "Mental Health Awareness Week: Breaking the Stigma",
      author: "Dr. Grace Fon",
      category: "Health Education",
      status: "scheduled",
      publishDate: "2024-12-15",
      views: 0,
      excerpt:
        "Addressing mental health challenges and promoting community awareness and support.",
    },
  ]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category || !author) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    setTimeout(() => {
      const newPost = {
        id: posts.length + 1,
        title,
        author,
        category,
        status: "draft",
        publishDate: null,
        views: 0,
        excerpt: content.substring(0, 100) + "...",
      };

      setPosts((prev) => [newPost, ...prev]);
      toast({
        title: "Post created successfully",
        description: `"${title}" has been saved as draft`,
      });

      setTitle("");
      setContent("");
      setCategory("");
      setAuthor("");
      setIsCreating(false);
    }, 1500);
  };

  const handleStatusUpdate = (postId: number, newStatus: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              status: newStatus,
              publishDate:
                newStatus === "published"
                  ? new Date().toISOString().split("T")[0]
                  : post.publishDate,
            }
          : post
      )
    );

    toast({
      title: "Post updated",
      description: `Post status changed to ${newStatus}`,
    });
  };

  const stats = [
    { label: "Total posts", value: posts.length, tone: "" },
    { label: "Published", value: posts.filter((p) => p.status === "published").length, tone: "is-success" },
    { label: "Drafts", value: posts.filter((p) => p.status === "draft").length, tone: "is-warning" },
    { label: "Scheduled", value: posts.filter((p) => p.status === "scheduled").length, tone: "is-info" },
  ];

  return (
    <div className="admin-manager">
      <div className="admin-mgr-stats">
        {stats.map((s) => (
          <div key={s.label} className="admin-mgr-stat">
            <div className="admin-mgr-stat-top">
              <span>{s.label}</span>
              <FileText size={17} />
            </div>
            <div className={`admin-mgr-stat-value ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="admin-split is-form">
        <div className="admin-section">
          <div className="admin-section-head">
            <div>
              <h3>
                <Plus size={18} />
                Create post
              </h3>
              <p>Share the stories and updates behind your impact.</p>
            </div>
          </div>
          <div className="admin-section-body is-padded">
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  placeholder="Author name"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  placeholder="e.g., Health Education, News & Updates"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Featured image</Label>
                <Button type="button" variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload image
                </Button>
              </div>
              <Button type="submit" disabled={isCreating} className="w-full">
                {isCreating ? "Creating..." : "Create post as draft"}
              </Button>
            </form>
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-head">
            <div>
              <h3>Quick actions</h3>
              <p>Shortcuts to speed up your workflow.</p>
            </div>
          </div>
          <div className="admin-section-body is-padded space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Import from document
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Bulk image upload
            </Button>
            <div className="pt-4 space-y-2">
              <h4 className="font-medium text-sm">Recent activity</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• 3 posts published this month</p>
                <p>• 2 drafts pending review</p>
                <p>• 1,245 total post views</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <div className="admin-section-head">
          <div>
            <h3>
              <FileText size={18} />
              All posts
            </h3>
            <p>Manage drafts, scheduled content, and published stories.</p>
          </div>
        </div>
        <div className="admin-section-body">
          {posts.length === 0 ? (
            <div className="admin-empty">
              <FileText size={30} />
              <h3>No posts yet</h3>
              <p>Create your first post to get started.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <Table className="min-w-[860px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[250px]">Title</TableHead>
                    <TableHead className="min-w-[120px] hidden md:table-cell">Author</TableHead>
                    <TableHead className="min-w-[120px] hidden sm:table-cell">Category</TableHead>
                    <TableHead className="min-w-[90px]">Status</TableHead>
                    <TableHead className="min-w-[100px] hidden sm:table-cell">Publish date</TableHead>
                    <TableHead className="min-w-[70px] hidden md:table-cell">Views</TableHead>
                    <TableHead className="min-w-[140px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div>
                          <p className="admin-row-name">{post.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {post.excerpt}
                          </p>
                          <div className="md:hidden admin-row-meta">
                            {post.author}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{post.author}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">{post.category}</TableCell>
                      <TableCell>
                        <StatusPill status={post.status} />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {post.publishDate || "—"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{post.views}</TableCell>
                      <TableCell>
                        <div className="admin-actions">
                          <Button variant="ghost" size="sm" className="admin-act" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="admin-act" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {post.status === "draft" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-xs"
                              onClick={() => handleStatusUpdate(post.id, "published")}
                            >
                              Publish
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="admin-act admin-act-reject" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

export default PostsManager;
