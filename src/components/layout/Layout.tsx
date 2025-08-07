import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';
import { Toaster } from '../../components/ui/Toaster';

const Layout = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileNavigation isAuthenticated={isAuthenticated} />
      <Toaster />
    </div>
  );
};

export default Layout;