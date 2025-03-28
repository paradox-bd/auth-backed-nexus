
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      // Toast is already shown in the AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  // For demo purposes, we'll add quick login buttons
  const handleQuickLogin = async (userType: 'admin' | 'faculty' | 'student') => {
    setIsSubmitting(true);
    try {
      let demoEmail, demoPassword;
      
      switch (userType) {
        case 'admin':
          demoEmail = 'admin@ece-hstu.edu';
          demoPassword = 'admin123';
          break;
        case 'faculty':
          demoEmail = 'faculty@ece-hstu.edu';
          demoPassword = 'faculty123';
          break;
        case 'student':
          demoEmail = 'student@ece-hstu.edu';
          demoPassword = 'student123';
          break;
      }
      
      await login(demoEmail, demoPassword);
      navigate('/');
    } catch (error) {
      console.error('Quick login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-university-primary hover:bg-university-secondary" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Demo Accounts</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleQuickLogin('admin')}
                disabled={isSubmitting}
                className="text-xs"
              >
                Admin
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleQuickLogin('faculty')}
                disabled={isSubmitting}
                className="text-xs"
              >
                Faculty
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleQuickLogin('student')}
                disabled={isSubmitting}
                className="text-xs"
              >
                Student
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center mt-2">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <Link to="/register" className="text-sm text-blue-600 hover:text-blue-800">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
