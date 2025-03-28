
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
  Users,
  BookOpen,
  Calendar,
  Settings,
  PieChart,
  Bell,
  PlusCircle,
  Trash2,
  Edit,
  UserPlus,
  Search
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Sample user management data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@ece-hstu.edu', role: 'faculty', department: 'ECE' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@ece-hstu.edu', role: 'faculty', department: 'ECE' },
    { id: 3, name: 'Ali Rahman', email: 'ali@ece-hstu.edu', role: 'student', department: 'ECE' },
    { id: 4, name: 'Emily Chen', email: 'emily@ece-hstu.edu', role: 'student', department: 'ECE' },
    { id: 5, name: 'Michael Brown', email: 'michael@ece-hstu.edu', role: 'student', department: 'ECE' }
  ]);

  // Sample courses data
  const courses = [
    { id: 'ECE101', title: 'Introduction to Electrical Engineering', instructor: 'Dr. Sarah Johnson', enrolled: 48, capacity: 50 },
    { id: 'ECE201', title: 'Digital Circuit Design', instructor: 'Dr. John Smith', enrolled: 35, capacity: 40 },
    { id: 'ECE221', title: 'Signals and Systems', instructor: 'Dr. Emily Chen', enrolled: 42, capacity: 45 },
    { id: 'ECE341', title: 'Communication Theory', instructor: 'Dr. Michael Brown', enrolled: 33, capacity: 35 },
    { id: 'ECE401', title: 'Advanced Electronics', instructor: 'Dr. John Smith', enrolled: 28, capacity: 30 }
  ];

  // Sample announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'New Faculty Member Joining',
      content: 'We are pleased to announce that Dr. Jessica Williams will be joining our department starting next semester.',
      date: '2023-11-10'
    },
    {
      id: 2,
      title: 'Upcoming Department Meeting',
      content: 'There will be a department meeting on November 20th at 2:00 PM in Room 301.',
      date: '2023-11-08'
    }
  ]);

  // New announcement form
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: ''
  });

  const handleAnnouncementChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields for the announcement.",
        variant: "destructive"
      });
      return;
    }

    const announcement = {
      id: Date.now(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toISOString().split('T')[0]
    };

    setAnnouncements(prev => [announcement, ...prev]);
    setNewAnnouncement({ title: '', content: '' });

    toast({
      title: "Announcement Added",
      description: "Your department announcement has been published successfully.",
    });
  };

  // User search state
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Layout>
        <div className="container mx-auto py-8 px-4">
          {/* Header and Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Total Students</CardTitle>
                    <Users className="h-5 w-5 text-university-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">158</div>
                    <p className="text-sm text-gray-500">Currently Enrolled</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Faculty Members</CardTitle>
                    <Users className="h-5 w-5 text-university-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-sm text-gray-500">Active Faculty</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Active Courses</CardTitle>
                    <BookOpen className="h-5 w-5 text-university-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-sm text-gray-500">This Semester</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Current Semester</CardTitle>
                    <Calendar className="h-5 w-5 text-university-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Fall 2023</div>
                    <p className="text-sm text-gray-500">Sept 1 - Dec 20, 2023</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart className="h-5 w-5 mr-2 text-university-primary" />
                        Department Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Student Enrollment by Program</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                              <div className="text-3xl font-bold text-university-primary">108</div>
                              <div className="text-sm text-gray-600">B.Sc in EEE</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                              <div className="text-3xl font-bold text-university-primary">34</div>
                              <div className="text-sm text-gray-600">M.Sc in EEE</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                              <div className="text-3xl font-bold text-university-primary">16</div>
                              <div className="text-sm text-gray-600">PhD Program</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Course Distribution</h3>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-university-primary">5</div>
                              <div className="text-sm text-gray-600">100-Level</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-university-primary">4</div>
                              <div className="text-sm text-gray-600">200-Level</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-university-primary">3</div>
                              <div className="text-sm text-gray-600">300-Level</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                              <div className="text-2xl font-bold text-university-primary">3</div>
                              <div className="text-sm text-gray-600">400-Level</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-university-primary" />
                      Recent Announcements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.slice(0, 3).map((announcement) => (
                        <div key={announcement.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <h4 className="font-medium">{announcement.title}</h4>
                          <p className="text-sm text-gray-500 mt-1 mb-2">
                            {new Date(announcement.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-sm text-gray-700 truncate">{announcement.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Announcements
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage faculty and student accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-6">
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search users..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button className="bg-university-primary ml-4">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium bg-muted">
                      <div>Name</div>
                      <div className="col-span-2">Email</div>
                      <div>Role</div>
                      <div>Actions</div>
                    </div>
                    
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="grid grid-cols-5 gap-4 p-4 border-t">
                        <div>{user.name}</div>
                        <div className="col-span-2">{user.email}</div>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'faculty' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <Card>
                <CardHeader>
                  <CardTitle>Course Management</CardTitle>
                  <CardDescription>Manage department courses and assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-6">
                    <Input placeholder="Search courses..." className="max-w-sm" />
                    <Button className="bg-university-primary">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Course
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 gap-4 p-4 font-medium bg-muted">
                      <div>Course ID</div>
                      <div className="col-span-2">Title</div>
                      <div>Instructor</div>
                      <div>Enrollment</div>
                      <div>Actions</div>
                    </div>
                    
                    {courses.map((course) => (
                      <div key={course.id} className="grid grid-cols-6 gap-4 p-4 border-t">
                        <div>{course.id}</div>
                        <div className="col-span-2">{course.title}</div>
                        <div>{course.instructor}</div>
                        <div>
                          <div className="flex items-center">
                            <span className="mr-2">{course.enrolled}/{course.capacity}</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  (course.enrolled / course.capacity) > 0.9 ? 'bg-red-500' : 
                                  (course.enrolled / course.capacity) > 0.7 ? 'bg-yellow-500' : 
                                  'bg-green-500'
                                }`}
                                style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
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
                      <CardTitle>Department Announcements</CardTitle>
                      <CardDescription>Manage official department announcements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {announcements.map((announcement) => (
                          <div key={announcement.id} className="border-b pb-6 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-lg">{announcement.title}</h4>
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 mr-4">
                                  {new Date(announcement.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
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

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-university-primary" />
                    Department Settings
                  </CardTitle>
                  <CardDescription>Configure department settings and options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="departmentName" className="text-sm font-medium">Department Name</label>
                        <Input
                          id="departmentName"
                          defaultValue="Department of Electrical and Computer Engineering"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="departmentCode" className="text-sm font-medium">Department Code</label>
                        <Input
                          id="departmentCode"
                          defaultValue="ECE"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="departmentEmail" className="text-sm font-medium">Department Email</label>
                        <Input
                          id="departmentEmail"
                          type="email"
                          defaultValue="ece@hstu.edu.bd"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="departmentPhone" className="text-sm font-medium">Department Phone</label>
                        <Input
                          id="departmentPhone"
                          defaultValue="+880 123 456 7890"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="departmentAddress" className="text-sm font-medium">Department Address</label>
                        <Textarea
                          id="departmentAddress"
                          defaultValue="Department of ECE, Hajee Mohammad Danesh Science & Technology University, Dinajpur, Bangladesh"
                          rows={2}
                        />
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Academic Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="currentSemester" className="text-sm font-medium">Current Semester</label>
                          <Input
                            id="currentSemester"
                            defaultValue="Fall 2023"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="academicYear" className="text-sm font-medium">Academic Year</label>
                          <Input
                            id="academicYear"
                            defaultValue="2023-2024"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="semesterStart" className="text-sm font-medium">Semester Start Date</label>
                          <Input
                            id="semesterStart"
                            type="date"
                            defaultValue="2023-09-01"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="semesterEnd" className="text-sm font-medium">Semester End Date</label>
                          <Input
                            id="semesterEnd"
                            type="date"
                            defaultValue="2023-12-20"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-university-primary hover:bg-university-secondary">Save Changes</Button>
                    </div>
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

export default AdminDashboard;
