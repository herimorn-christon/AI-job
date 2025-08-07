import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/slices/authSlice';
import { AppDispatch, RootState } from './store';

// Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Loader from './components/ui/Loader';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import JobsPage from './pages/jobs/JobsPage';
import JobDetail from './pages/jobs/JobDetail';
import CoursesPage from './pages/courses/CoursesPage';
import CourseDetail from './pages/courses/CourseDetail';
import ProfilePage from './pages/profile/ProfilePage';
import MentorsPage from './pages/mentors/MentorsPage';
import MarketInsights from './pages/insights/MarketInsights';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        <Route path="jobs">
          <Route index element={<JobsPage />} />
          <Route path=":jobId" element={<JobDetail />} />
        </Route>
        
        <Route path="courses">
          <Route index element={<CoursesPage />} />
          <Route path=":courseId" element={<CourseDetail />} />
        </Route>
        
        <Route path="mentors" element={<MentorsPage />} />
        <Route path="insights" element={<MarketInsights />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;