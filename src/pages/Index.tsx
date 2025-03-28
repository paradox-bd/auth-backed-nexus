
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Newspaper, Award, BookOpen, Users, GraduationCap, Lightbulb } from 'lucide-react';

// Sample data for news and events
const newsItems = [
  {
    id: 1,
    title: 'New Research Grant Awarded',
    date: '2023-10-15',
    excerpt: 'The ECE department has been awarded a $2M research grant to develop advanced renewable energy solutions.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2300&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Annual Technical Symposium',
    date: '2023-11-10',
    excerpt: 'Join us for the annual technical symposium where students showcase their innovative projects.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2370&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Faculty Publication in IEEE Journal',
    date: '2023-09-28',
    excerpt: 'Professor Rahman's research on IoT security protocols has been published in the prestigious IEEE journal.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2369&auto=format&fit=crop'
  }
];

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const [announcements, setAnnouncements] = useState<{ id: number, text: string, date: string }[]>([
    { id: 1, text: 'Registration for Fall 2023 begins on September 1st', date: '2023-08-15' },
    { id: 2, text: 'Mid-term exams will be held from October 10-15', date: '2023-09-20' },
    { id: 3, text: 'Department seminar on AI in Healthcare on October 5th', date: '2023-09-25' }
  ]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-university-primary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fadeIn">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Department of Electrical and Computer Engineering
              </h1>
              <h2 className="text-xl md:text-2xl mb-6">
                Hajee Mohammad Danesh Science & Technology University
              </h2>
              <p className="text-lg mb-8">
                Empowering students with knowledge and skills to innovate and excel in the dynamic fields of electrical and computer engineering.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/academic/programs">
                  <Button className="bg-white text-university-primary hover:bg-gray-100">
                    Explore Programs
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-university-primary">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2369&auto=format&fit=crop"
                alt="ECE Department"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-university-primary">Welcome to ECE HSTU</h2>
            <p className="text-lg text-gray-700 mb-8">
              The Department of Electrical and Computer Engineering at HSTU is dedicated to providing quality education and fostering innovation in the fields of electrical engineering, electronics, and computer science.
            </p>
            {isAuthenticated ? (
              <div className="bg-university-secondary/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Welcome back, {user?.name}!</h3>
                <p className="mb-4">
                  {user?.role === 'student' && "Access your student resources and course materials."}
                  {user?.role === 'faculty' && "Manage your courses and access faculty resources."}
                  {user?.role === 'admin' && "Access administrative controls and department management."}
                </p>
                <Link to={
                  user?.role === 'student' ? "/student/dashboard" :
                  user?.role === 'faculty' ? "/faculty/dashboard" :
                  "/admin/dashboard"
                }>
                  <Button className="bg-university-primary">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex justify-center gap-4">
                <Link to="/about/department">
                  <Button className="bg-university-primary">
                    Learn More
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-university-primary">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89f12e?q=80&w=2370&auto=format&fit=crop"
                alt="Bachelor's Program"
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-university-primary" />
                  Bachelor of Science
                </h3>
                <p className="text-gray-600 mb-4">
                  A four-year undergraduate program that provides a strong foundation in electrical and computer engineering principles.
                </p>
                <Link to="/academic/programs#bsc">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2370&auto=format&fit=crop"
                alt="Master's Program"
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-university-primary" />
                  Master of Science
                </h3>
                <p className="text-gray-600 mb-4">
                  An advanced degree program focused on specialized areas of electrical and computer engineering.
                </p>
                <Link to="/academic/programs#msc">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2370&auto=format&fit=crop"
                alt="PhD Program"
                className="h-48 w-full object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-university-primary" />
                  PhD Program
                </h3>
                <p className="text-gray-600 mb-4">
                  A research-focused doctoral program designed to advance knowledge in specialized engineering domains.
                </p>
                <Link to="/academic/programs#phd">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News and Announcements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-university-primary">
                <Newspaper className="mr-2 h-6 w-6" />
                Latest News & Events
              </h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {newsItems.map((item) => (
                    <CarouselItem key={item.id}>
                      <Card className="overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-64 w-full object-cover"
                        />
                        <CardContent className="p-6">
                          <div className="text-sm text-gray-500 mb-2">
                            {new Date(item.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-4">{item.excerpt}</p>
                          <Link to={`/news/${item.id}`}>
                            <Button variant="link" className="px-0 text-university-primary">
                              Read More
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Announcements Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-university-primary">
                <BookOpen className="mr-2 h-6 w-6" />
                Announcements
              </h2>
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200 bg-university-primary text-white rounded-t-lg">
                  <h3 className="font-semibold">Important Notices</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="p-4 hover:bg-gray-50">
                      <p className="text-gray-800 mb-1">{announcement.text}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(announcement.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <Link to="/news">
                    <Button variant="outline" className="w-full">
                      View All Announcements
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Highlight */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-university-primary">Meet Our Faculty</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((id) => (
              <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow text-center">
                <img
                  src={`https://randomuser.me/api/portraits/${id % 2 === 0 ? 'women' : 'men'}/${id + 50}.jpg`}
                  alt={`Faculty Member ${id}`}
                  className="h-48 w-48 object-cover rounded-full mx-auto mt-6"
                />
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-1">Dr. {['John Smith', 'Sarah Johnson', 'Mohammad Rahman', 'Emily Chen'][id - 1]}</h3>
                  <p className="text-gray-500 mb-3">{['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'][id - 1]}</p>
                  <p className="text-sm text-gray-600">
                    {['Digital Signal Processing', 'Computer Networks', 'Power Systems', 'VLSI Design'][id - 1]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/faculty">
              <Button className="bg-university-primary">
                View All Faculty
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-university-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Department?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Apply today and become part of our vibrant academic community dedicated to excellence in electrical and computer engineering.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/academic/admission">
              <Button className="bg-white text-university-primary hover:bg-gray-200">
                Apply Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-university-primary">
                Contact Admissions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
