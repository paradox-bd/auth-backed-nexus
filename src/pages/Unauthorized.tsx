
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const Unauthorized = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 flex flex-col items-center justify-center min-h-[calc(100vh-400px)]">
        <AlertTriangle className="text-red-500 h-16 w-16 mb-6" />
        <h1 className="text-3xl font-bold text-center mb-4">Access Denied</h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          You do not have permission to access this page.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button className="bg-university-primary hover:bg-university-secondary">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Unauthorized;
