
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText, BookOpen, GraduationCap, Layers, User, MessageSquare } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  
  // Sample course data
  const courses = [
    { id: 'ECE101', title: 'Introduction to Electrical Engineering', progress: 65, instructor: 'Dr. Sarah Johnson', credits: 3 },
    { id: 'ECE201', title: 'Digital Circuit Design', progress: 80, instructor: 'Dr. Mohammad Rahman', credits: 4 },
    { id: 'ECE221', title: 'Signals and Systems', progress: 45, instructor: 'Dr. John Smith', credits: 3 },
    { id: 'ECE341', title: 'Communication Theory', progress: 70, instructor: 'Dr. Emily Chen', credits: 3 }
  ];
  
  // Sample upcoming deadlines
  const deadlines = [
    { id: 1, title: 'ECE201 Lab Report', course: 'Digital Circuit Design', due: '2023-11-15T23:59:59' },
    { id: 2, title: 'ECE221 Assignment 4', course: 'Signals and Systems', due: '2023-11-18T23:59:59' },
    { id: 3, title: 'ECE101 Mid-term Exam', course: 'Introduction to Electrical Engineering', due: '2023-11-25T10:00:00' }
  ];
  
  // Sample announcements
  const announcements = [
    { id: 1, title: 'ECE201 Lab Cancelled', content: 'The lab scheduled for November 12th is cancelled due to maintenance.', date: '2023-11-10' },
    { id: 2, title: 'Upcoming Department Seminar', content: 'Join us for a seminar on Advanced Circuit Design on November 20th.', date: '2023-11-08' }
  ];

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <Layout>
        <div className="container mx-auto py-8 px-4">
          {/* Header and Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
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
                    <CardTitle className="text-lg font-medium">GPA</CardTitle>
                    <GraduationCap className="h-5 w-5 text-university-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.75</div>
                    <p className="text-sm text-gray-500">Current Cumulative GPA</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Credits</CardTitle>
                    <Layers className="h-5 w-5 text-university-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">13 / 120</div>
                    <p className="text-sm text-gray-500">Credits Completed / Required</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-university-primary" />
                        Current Courses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {courses.map((course) => (
                          <div key={course.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{course.id}: {course.title}</h4>
                                <p className="text-sm text-gray-500">{course.instructor}</p>
                              </div>
                              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                                {course.credits} credits
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Progress value={course.progress} className="h-2 flex-1" />
                              <span className="text-sm font-medium">{course.progress}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-university-primary" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deadlines.map((deadline) => (
                        <div key={deadline.id} className="border-l-4 border-university-primary pl-3 py-1">
                          <h4 className="font-medium">{deadline.title}</h4>
                          <p className="text-sm text-gray-500">{deadline.course}</p>
                          <div className="text-sm font-medium mt-1">
                            Due: {new Date(deadline.due).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.id} • {course.credits} credits</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Instructor</p>
                          <p>{course.instructor}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Progress</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Progress value={course.progress} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                        </div>
                        <div className="pt-4 flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            Materials
                          </Button>
                          <Button size="sm" className="flex-1 bg-university-primary hover:bg-university-secondary">
                            <BookOpen className="h-4 w-4 mr-2" />
                            View Course
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments">
              <Card>
                <CardHeader>
                  <CardTitle>Current Assignments</CardTitle>
                  <CardDescription>View and manage your assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {deadlines.map((deadline) => (
                      <div key={deadline.id} className="flex items-start border p-4 rounded-lg">
                        <div className="bg-university-primary/10 p-3 rounded-full mr-4">
                          <FileText className="h-6 w-6 text-university-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-lg">{deadline.title}</h4>
                          <p className="text-sm text-gray-500 mb-2">{deadline.course}</p>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-sm">
                              Due: {new Date(deadline.due).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline">View Details</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements">
              <Card>
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Latest updates and notifications</CardDescription>
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
                        <p className="text-gray-700">{announcement.content}</p>
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

export default StudentDashboard;
