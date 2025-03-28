
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  LogOut, 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-university-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl md:text-2xl mr-1">ECE</span>
              <span className="font-light text-lg md:text-xl">HSTU</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-university-accent transition-colors">Home</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center hover:text-university-accent transition-colors">
                  About <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Link to="/about/department" className="flex w-full">Department Overview</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/about/history" className="flex w-full">History</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/about/mission" className="flex w-full">Mission & Vision</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center hover:text-university-accent transition-colors">
                  Academic <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Link to="/academic/programs" className="flex w-full">Programs</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/academic/courses" className="flex w-full">Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/academic/calendar" className="flex w-full">Academic Calendar</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/faculty" className="hover:text-university-accent transition-colors">Faculty</Link>
            <Link to="/research" className="hover:text-university-accent transition-colors">Research</Link>
            <Link to="/news" className="hover:text-university-accent transition-colors">News</Link>
            <Link to="/contact" className="hover:text-university-accent transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-university-accent hover:bg-university-primary/90">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user?.name.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard" className="flex w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user?.role === 'faculty' && (
                    <DropdownMenuItem>
                      <Link to="/faculty/dashboard" className="flex w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Faculty Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user?.role === 'student' && (
                    <DropdownMenuItem>
                      <Link to="/student/dashboard" className="flex w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Student Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-university-accent hover:bg-university-primary/90">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-university-primary">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>Home</Link>
              <div className="border-b border-gray-700 my-2"></div>
              <div className="font-semibold">About</div>
              <Link to="/about/department" className="pl-4 hover:text-university-accent transition-colors" onClick={toggleMenu}>Department Overview</Link>
              <Link to="/about/history" className="pl-4 hover:text-university-accent transition-colors" onClick={toggleMenu}>History</Link>
              <Link to="/about/mission" className="pl-4 hover:text-university-accent transition-colors" onClick={toggleMenu}>Mission & Vision</Link>
              <div className="border-b border-gray-700 my-2"></div>
              <div className="font-semibold">Academic</div>
              <Link to="/academic/programs" className="pl-4 hover:text-university-accent transition-colors" onClick={toggleMenu}>Programs</Link>
              <Link to="/academic/courses" className="pl-4 hover:text-university-accent transition-colors" onClick={toggleMenu}>Courses</Link>
              <Link to="/academic/calendar" className="pl-4 hover:text-university-accent transition-colors" onClick={toggleMenu}>Academic Calendar</Link>
              <div className="border-b border-gray-700 my-2"></div>
              <Link to="/faculty" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>Faculty</Link>
              <Link to="/research" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>Research</Link>
              <Link to="/news" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>News</Link>
              <Link to="/contact" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>Contact</Link>
              <div className="border-b border-gray-700 my-2"></div>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>
                    Profile
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin/dashboard" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>
                      Admin Dashboard
                    </Link>
                  )}
                  {user?.role === 'faculty' && (
                    <Link to="/faculty/dashboard" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>
                      Faculty Dashboard
                    </Link>
                  )}
                  {user?.role === 'student' && (
                    <Link to="/student/dashboard" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>
                      Student Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="text-left hover:text-university-accent transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>
                    Login
                  </Link>
                  <Link to="/register" className="hover:text-university-accent transition-colors" onClick={toggleMenu}>
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
