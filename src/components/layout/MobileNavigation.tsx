import { Link, useLocation } from 'react-router-dom';
import { Briefcase, BookOpen, Home, User, BarChart2 } from 'lucide-react';

interface MobileNavigationProps {
  isAuthenticated: boolean;
}

const MobileNavigation = ({ isAuthenticated }: MobileNavigationProps) => {
  const location = useLocation();
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/jobs" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname.includes('/jobs') ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Briefcase className="h-5 w-5" />
          <span className="text-xs mt-1">Jobs</span>
        </Link>
        
        <Link 
          to="/courses" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname.includes('/courses') ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs mt-1">Learn</span>
        </Link>
        
        <Link 
          to="/insights" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname === '/insights' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <BarChart2 className="h-5 w-5" />
          <span className="text-xs mt-1">Insights</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center justify-center w-full h-full ${
            location.pathname === '/profile' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;