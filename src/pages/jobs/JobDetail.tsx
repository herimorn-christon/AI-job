import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchJobDetail } from '../../store/slices/jobsSlice';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { MapPin, Calendar, Briefcase, Building, DollarSign, Clock, CheckCircle, Share2, Bookmark } from 'lucide-react';

const JobDetail = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { jobDetail, loading, error } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobDetail(jobId));
    }
  }, [dispatch, jobId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (error || !jobDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Job not found'}</p>
          <Link to="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Header */}
          <Card>
            <CardBody className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {jobDetail.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Building className="h-5 w-5 mr-2" />
                    <span className="text-lg">{jobDetail.company}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {jobDetail.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {jobDetail.type}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Posted {new Date(jobDetail.postedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Closes {new Date(jobDetail.deadlineDate).toLocaleDateString()}
                    </div>
                  </div>

                  {jobDetail.salary && (
                    <div className="flex items-center text-lg font-medium text-gray-900 mb-4">
                      <DollarSign className="h-5 w-5 mr-1" />
                      {jobDetail.salary.min.toLocaleString()} - {jobDetail.salary.max.toLocaleString()} {jobDetail.salary.currency}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {jobDetail.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button
                    variant="outline"
                    leftIcon={<Share2 className="h-4 w-4" />}
                  >
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<Bookmark className="h-4 w-4" />}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Job Description */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-line">
                  {jobDetail.description}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Requirements */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {jobDetail.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          {/* Responsibilities */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {jobDetail.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Apply Card */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Apply for this position
              </h2>
              <div className="space-y-4">
                <Button fullWidth size="large">
                  Apply Now
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Application deadline: {new Date(jobDetail.deadlineDate).toLocaleDateString()}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Company Card */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About the Company
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {jobDetail.company}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Technology • 100-500 employees
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Leading technology company in Tanzania, focused on innovation and digital transformation.
                </p>
                <Button variant="outline" fullWidth>
                  View Company Profile
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Similar Jobs */}
          <Card>
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Similar Jobs
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <Link key={index} to={`/jobs/${index + 1}`}>
                    <div className="group hover:bg-gray-50 rounded-lg p-4 transition-colors">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                        Senior Software Engineer
                      </h3>
                      <p className="text-gray-600">Tech Company Ltd</p>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        Dar es Salaam
                      </div>
                    </div>
                  </Link>
                ))}
                <Link to="/jobs">
                  <Button variant="outline" fullWidth>
                    View More Jobs
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;