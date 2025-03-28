
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-university-primary text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About ECE HSTU</h3>
            <p className="mb-4">
              The Department of Electrical and Computer Engineering at HSTU strives to provide a rigorous education, innovative research, and service to the community.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-university-accent">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-university-accent">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-university-accent">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-university-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about/department" className="hover:text-university-accent transition-colors">About</Link>
              </li>
              <li>
                <Link to="/academic/programs" className="hover:text-university-accent transition-colors">Academic Programs</Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-university-accent transition-colors">Faculty Members</Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-university-accent transition-colors">Research</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-university-accent transition-colors">News & Events</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-university-accent transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <address className="not-italic">
              <div className="flex items-start mb-2">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Department of ECE, Hajee Mohammad Danesh Science & Technology University, Dinajpur, Bangladesh</span>
              </div>
              <div className="flex items-center mb-2">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>+880 123 456 7890</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:ece@hstu.edu.bd" className="hover:text-university-accent transition-colors">ece@hstu.edu.bd</a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} Department of Electrical and Computer Engineering, HSTU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
