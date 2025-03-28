
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, BookOpen, Users, FileText, Clipboard, MessageSquare, PlusCircle } from 'lucide-react';

const FacultyDashboard = () => {
  const { user } = useAuth();
  
  // Sample teaching courses
  const courses = [
    { id: 'ECE201', title: 'Digital Circuit Design', students: 35, schedule: 'MWF 10:00 AM - 11:15 AM', room: 'ECE-301' },
    { id: 'ECE401', title: 'Advanced Electronics', students: 28, schedule: 'TR 2:00 PM - 3:15 PM', room: 'ECE-205' },
    { id: 'ECE521', title: 'Wireless Communications', students: 22, schedule: 'MW 1:00 PM - 2:15 PM', room: 'ECE-310' }
  ];
  
  // Sample announcements
  const [announcements, setAnnouncements] = useState([
    { id: 1, course: 'ECE201', title: 'Lab Session Rescheduled', content: 'The lab session this Thursday is rescheduled to Friday at the same time.', date: '2023-11-10' },
    { id: 2, course: 'ECE401', title: 'Project Guidelines Updated', content: 'Please check the updated project guidelines on the course website.', date: '2023-11-08' }
  ]);
  
  // New announcement form
  const [newAnnouncement, setNewAnnouncement] = useState({
    course: '',
    title: '',
    content: ''
  });
  
  const handleAnnouncementChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.course || !newAnnouncement.title || !newAnnouncement.content) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields for the announcement.",
        variant: "destructive"
      });
      return;
    }
    
    const announcement = {
      id: Date.now(),
      course: newAnnouncement.course,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toISOString().split('T')[0]
    };
    
    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({ course: '', title: '', content: '' });
    
    toast({
      title: "Announcement Added",
      description: "Your announcement has been published successfully.",
    });
  };

  return (
    <ProtectedRoute allowedRoles={['faculty', 'admin']}>
      <Layout>
        <div className="container mx-auto py-8 px-4">
          {/* Header and Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="materials">Course Materials</TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Current Semester</CardTitle>
                    <Calendar className="h-5 w-5 text-university-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Fall 2023</div>
                    <p className="text-sm text-gray-500">Sept 1, 2023 - Dec 20, 2023</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Courses Teaching</CardTitle>
                    <BookOpen className="h-5 w-5 text-university-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{courses.length}</div>
                    <p className="text-sm text-gray-500">This Semester</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Total Students</CardTitle>
                    <Users className="h-5 w-5 text-university-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {courses.reduce((total, course) => total + course.students, 0)}
                    </div>
                    <p className="text-sm text-gray-500">Enrolled in your courses</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{course.id}: {course.title}</span>
                        <span className="text-sm bg-university-primary text-white px-3 py-1 rounded-full">
                          {course.students} Students
                        </span>
                      </CardTitle>
                      <CardDescription>{course.schedule} • Room {course.room}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Button className="bg-university-primary hover:bg-university-secondary">
                          <Users className="h-4 w-4 mr-2" />
                          View Students
                        </Button>
                        <Button variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Course Materials
                        </Button>
                        <Button variant="outline">
                          <Clipboard className="h-4 w-4 mr-2" />
                          Assignments
                        </Button>
                        <Button variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Announcement
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Students Tab */}
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>View and manage students in your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Digital Circuit Design (ECE201)</h3>
                        <p className="text-gray-500">35 Students Enrolled</p>
                      </div>
                      <Button className="bg-university-primary hover:bg-university-secondary">
                        <Users className="h-4 w-4 mr-2" />
                        View Class List
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Advanced Electronics (ECE401)</h3>
                        <p className="text-gray-500">28 Students Enrolled</p>
                      </div>
                      <Button className="bg-university-primary hover:bg-university-secondary">
                        <Users className="h-4 w-4 mr-2" />
                        View Class List
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Wireless Communications (ECE521)</h3>
                        <p className="text-gray-500">22 Students Enrolled</p>
                      </div>
                      <Button className="bg-university-primary hover:bg-university-secondary">
                        <Users className="h-4 w-4 mr-2" />
                        View Class List
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Announcements</CardTitle>
                      <CardDescription>Announcements you've made for your courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {announcements.map((announcement) => (
                          <div key={announcement.id} className="border-b pb-6 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-lg">{announcement.title}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(announcement.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-university-primary mb-2">Course: {announcement.course}</p>
                            <p className="text-gray-700">{announcement.content}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PlusCircle className="h-5 w-5 mr-2 text-university-primary" />
                      New Announcement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddAnnouncement} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="course" className="text-sm font-medium">Course</label>
                        <select
                          id="course"
                          name="course"
                          value={newAnnouncement.course}
                          onChange={handleAnnouncementChange}
                          className="w-full border-input border rounded-md p-2"
                          required
                        >
                          <option value="">Select Course</option>
                          {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.id}: {course.title}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <Input
                          id="title"
                          name="title"
                          value={newAnnouncement.title}
                          onChange={handleAnnouncementChange}
                          placeholder="Announcement Title"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">Content</label>
                        <Textarea
                          id="content"
                          name="content"
                          value={newAnnouncement.content}
                          onChange={handleAnnouncementChange}
                          placeholder="Announcement content..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-university-primary hover:bg-university-secondary">
                        Post Announcement
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Course Materials Tab */}
            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle>Course Materials</CardTitle>
                  <CardDescription>Manage and upload course materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {courses.map((course) => (
                      <div key={course.id} className="border p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">{course.id}: {course.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button variant="outline" className="flex items-center justify-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Lecture Notes
                          </Button>
                          <Button variant="outline" className="flex items-center justify-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Assignments
                          </Button>
                          <Button variant="outline" className="flex items-center justify-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Lab Materials
                          </Button>
                          <Button variant="outline" className="flex items-center justify-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Syllabus
                          </Button>
                        </div>
                        <div className="mt-4">
                          <Button className="bg-university-primary hover:bg-university-secondary">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Upload New Material
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default FacultyDashboard;
