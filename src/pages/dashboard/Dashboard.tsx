import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { fetchRecommendedJobs } from '../../store/slices/jobsSlice';
import { fetchUserProfile } from '../../store/slices/userSlice';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { Briefcase, BookOpen, Users, BarChart2, ArrowRight, Award, MapPin, Calendar } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile, loading: profileLoading } = useSelector((state: RootState) => state.user);
  const { recommendedJobs, loading: jobsLoading } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchRecommendedJobs());
  }, [dispatch]);

  if (profileLoading || jobsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's your personalized career dashboard
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="flex items-center p-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Job Applications</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center p-6">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Courses In Progress</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center p-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Skills Endorsed</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center p-6">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Mentor Sessions</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recommended Jobs */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recommended Jobs</h2>
                <Link to="/jobs">
                  <Button variant="outline" size="small">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recommendedJobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <Link to={`/jobs/${job.id}`} className="block hover:bg-gray-50 rounded-lg p-4 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                            <span className="mx-2">•</span>
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {job.type}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Career Progress */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Career Progress</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                    <span className="text-sm font-medium text-gray-700">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Skills Development</span>
                    <span className="text-sm font-medium text-gray-700">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Course Completion</span>
                    <span className="text-sm font-medium text-gray-700">40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Profile Summary</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                    <p className="text-gray-600">{profile?.title || 'Add your title'}</p>
                    <p className="text-sm text-gray-500">{profile?.location}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Top Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile?.skills?.slice(0, 5).map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill.name}
                      </span>
                    ))}
                    <Link
                      to="/profile"
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      Add more
                    </Link>
                  </div>
                </div>

                <Link to="/profile">
                  <Button variant="outline" fullWidth>
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Interview Preparation</p>
                    <p className="text-sm text-gray-500">Tomorrow, 2:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Mentorship Session</p>
                    <p className="text-sm text-gray-500">Friday, 11:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Course Deadline</p>
                    <p className="text-sm text-gray-500">Next Week</p>
                  </div>
                </div>

                <Button variant="outline" fullWidth>
                  View Calendar
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Market Insights */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Market Insights</h2>
                <Link to="/insights">
                  <Button variant="outline" size="small">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Tech Jobs Growth</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">+15%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Average Salary</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">+8%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Remote Jobs</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">+25%</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;