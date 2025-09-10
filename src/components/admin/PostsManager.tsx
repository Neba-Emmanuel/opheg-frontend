import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, FileText, Upload } from "lucide-react";

const PostsManager = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // Mock posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Cervical Cancer Awareness: Early Detection Saves Lives",
      author: "Dr. Sarah Mbah",
      category: "Health Education",
      status: "published",
      publishDate: "2024-12-01",
      views: 1245,
      excerpt: "Understanding the importance of regular cervical cancer screenings and prevention methods."
    },
    {
      id: 2,
      title: "OPHEG Launches New Mobile Health Unit in Southwest Region",
      author: "Communications Team",
      category: "News & Updates",
      status: "published", 
      publishDate: "2024-11-28",
      views: 892,
      excerpt: "Expanding healthcare access to remote communities with our new mobile health initiative."
    },
    {
      id: 3,
      title: "Managing Sickle Cell Disease: A Comprehensive Guide",
      author: "Dr. Emmanuel Tabi",
      category: "Health Education",
      status: "draft",
      publishDate: null,
      views: 0,
      excerpt: "Essential information for patients and families dealing with sickle cell disease."
    },
    {
      id: 4,
      title: "Partnership Success: OPHEG and Regional Medical Center",
      author: "OJ Nathaniel Eben",
      category: "Partnerships",
      status: "published",
      publishDate: "2024-11-25",
      views: 567,
      excerpt: "Celebrating our new partnership that will enhance healthcare delivery in the region."
    },
    {
      id: 5,
      title: "Mental Health Awareness Week: Breaking the Stigma",
      author: "Dr. Grace Fon",
      category: "Health Education",
      status: "scheduled",
      publishDate: "2024-12-15",
      views: 0,
      excerpt: "Addressing mental health challenges and promoting community awareness and support."
    }
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
    
    // Mock API call - replace with your backend
    setTimeout(() => {
      const newPost = {
        id: posts.length + 1,
        title,
        author,
        category,
        status: "draft",
        publishDate: null,
        views: 0,
        excerpt: content.substring(0, 100) + "..."
      };
      
      setPosts(prev => [newPost, ...prev]);
      toast({
        title: "Post created successfully",
        description: `"${title}" has been saved as draft`,
      });
      
      // Reset form
      setTitle("");
      setContent("");
      setCategory("");
      setAuthor("");
      setIsCreating(false);
    }, 1500);
  };

  const handleStatusUpdate = (postId: number, newStatus: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              status: newStatus,
              publishDate: newStatus === 'published' ? new Date().toISOString().split('T')[0] : post.publishDate
            } 
          : post
      )
    );
    
    toast({
      title: "Post updated",
      description: `Post status changed to ${newStatus}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'published':
        return <Badge className="bg-green-600 hover:bg-green-700">Published</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-600 hover:bg-blue-700">Scheduled</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = {
    total: posts.length,
    published: posts.filter(post => post.status === 'published').length,
    drafts: posts.filter(post => post.status === 'draft').length,
    scheduled: posts.filter(post => post.status === 'scheduled').length,
  };

  return (
    <div className="space-y-6">
      {/* Post Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.drafts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Post Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                <Label>Featured Image</Label>
                <Button type="button" variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>
              <Button type="submit" disabled={isCreating} className="w-full">
                {isCreating ? "Creating..." : "Create Post as Draft"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Import from Document
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Image Upload
            </Button>
            <div className="pt-4 space-y-2">
              <h4 className="font-medium">Recent Activity</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• 3 posts published this month</p>
                <p>• 2 drafts pending review</p>
                <p>• 1,245 total post views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Management Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Posts Management
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[250px]">Title</TableHead>
                  <TableHead className="min-w-[120px] hidden md:table-cell">Author</TableHead>
                  <TableHead className="min-w-[120px] hidden sm:table-cell">Category</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[100px] hidden sm:table-cell">Publish Date</TableHead>
                  <TableHead className="min-w-[80px] hidden md:table-cell">Views</TableHead>
                  <TableHead className="min-w-[140px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{post.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {post.excerpt}
                        </p>
                        <div className="md:hidden mt-2 space-y-1">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Author:</span> {post.author}
                          </p>
                          <div className="sm:hidden">
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Category:</span> {post.category}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Published:</span> {post.publishDate || '-'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium">Views:</span> {post.views}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{post.author}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">{post.category}</TableCell>
                    <TableCell>
                      {getStatusBadge(post.status)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm">
                      {post.publishDate || '-'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{post.views}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-0.5">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {post.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs"
                            onClick={() => handleStatusUpdate(post.id, 'published')}
                          >
                            Publish
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Delete">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
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

export default PostsManager;