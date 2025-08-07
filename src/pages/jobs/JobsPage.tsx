import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { fetchJobs, setFilters, clearFilters } from '../../store/slices/jobsSlice';
import { Card, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import { Search, MapPin, Calendar, Briefcase, Filter, X } from 'lucide-react';

const JobsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredJobs, loading, error } = useSelector((state: RootState) => state.jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    location: [] as string[],
    jobType: [] as string[],
    skillLevel: [] as string[],
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const updated = {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      };
      dispatch(setFilters(updated));
      return updated;
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      location: [],
      jobType: [],
      skillLevel: [],
    });
    dispatch(clearFilters());
  };

  const locations = ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mwanza', 'Zanzibar'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Gig'];
  const skillLevels = ['Entry Level', 'Mid Level', 'Senior Level'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => dispatch(fetchJobs())}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find Your Next Opportunity
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Explore thousands of job opportunities from top companies across Tanzania. 
          Use our advanced filters to find the perfect match for your skills and preferences.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs by title, company, or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="md:w-auto"
            leftIcon={<Filter className="h-5 w-5" />}
          >
            Filters
          </Button>
          {(selectedFilters.location.length > 0 || 
           selectedFilters.jobType.length > 0 || 
           selectedFilters.skillLevel.length > 0) && (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="md:w-auto"
              leftIcon={<X className="h-5 w-5" />}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <label key={location} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.location.includes(location)}
                        onChange={() => handleFilterChange('location', location)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.jobType.includes(type)}
                        onChange={() => handleFilterChange('jobType', type)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skill Level Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Experience Level</h3>
                <div className="space-y-2">
                  {skillLevels.map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.skillLevel.includes(level)}
                        onChange={() => handleFilterChange('skillLevel', level)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} hover>
            <CardBody className="p-6">
              <Link to={`/jobs/${job.id}`} className="block">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-600 line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-start md:items-end">
                    {job.salary && (
                      <div className="text-lg font-medium text-gray-900 mb-2">
                        {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                      </div>
                    )}
                    <Button>
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            </CardBody>
          </Card>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;