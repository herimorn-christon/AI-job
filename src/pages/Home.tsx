import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, Users, BarChart2, Briefcase as BriefcaseBusiness, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardBody } from '../components/ui/Card';

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Connect to Your Future Career in Tanzania
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                AI-powered job matching and skills training for Tanzanians
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link to="/register">
                  <Button size="large">
                    Get Started
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-blue-700">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="bg-white rounded-lg shadow-2xl p-6 text-gray-800">
                <h3 className="text-xl font-semibold mb-4">Quick Job Search</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords or Job Title
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="keyword"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="e.g. Software Developer, Marketing"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <select
                      id="location"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">All of Tanzania</option>
                      <option>Dar es Salaam</option>
                      <option>Dodoma</option>
                      <option>Arusha</option>
                      <option>Mwanza</option>
                      <option>Zanzibar</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">All Categories</option>
                      <option>Information Technology</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>Agriculture</option>
                      <option>Tourism & Hospitality</option>
                    </select>
                  </div>
                  
                  <Button fullWidth>
                    Search Jobs
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Path to Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              KaziConnect offers AI-powered tools and resources to help Tanzanians discover opportunities and build successful careers.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn}>
              <Card hover className="h-full">
                <CardBody className="flex flex-col items-center text-center p-8">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI-Powered Job Matching</h3>
                  <p className="text-gray-600 mb-4">
                    Our intelligent system matches your skills and preferences with the most relevant job opportunities across Tanzania.
                  </p>
                  <Link to="/jobs" className="mt-auto text-blue-600 font-medium inline-flex items-center">
                    Find jobs <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card hover className="h-full">
                <CardBody className="flex flex-col items-center text-center p-8">
                  <div className="bg-green-100 p-4 rounded-full mb-6">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Skills Development</h3>
                  <p className="text-gray-600 mb-4">
                    Access personalized training programs and courses to develop in-demand skills that enhance your employability.
                  </p>
                  <Link to="/courses" className="mt-auto text-green-600 font-medium inline-flex items-center">
                    Start learning <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card hover className="h-full">
                <CardBody className="flex flex-col items-center text-center p-8">
                  <div className="bg-purple-100 p-4 rounded-full mb-6">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Mentorship Network</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with experienced professionals who can guide your career development and provide valuable insights.
                  </p>
                  <Link to="/mentors" className="mt-auto text-purple-600 font-medium inline-flex items-center">
                    Find mentors <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card hover className="h-full">
                <CardBody className="flex flex-col items-center text-center p-8">
                  <div className="bg-orange-100 p-4 rounded-full mb-6">
                    <BriefcaseBusiness className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Employer Connection</h3>
                  <p className="text-gray-600 mb-4">
                    Tanzanian businesses can find qualified talent and post opportunities directly to our growing community.
                  </p>
                  <Link to="/register" className="mt-auto text-orange-600 font-medium inline-flex items-center">
                    For employers <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card hover className="h-full">
                <CardBody className="flex flex-col items-center text-center p-8">
                  <div className="bg-red-100 p-4 rounded-full mb-6">
                    <GraduationCap className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Career Pathways</h3>
                  <p className="text-gray-600 mb-4">
                    Explore personalized career paths with step-by-step guidance on how to achieve your professional goals.
                  </p>
                  <Link to="/insights" className="mt-auto text-red-600 font-medium inline-flex items-center">
                    Explore paths <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card hover className="h-full">
                <CardBody className="flex flex-col items-center text-center p-8">
                  <div className="bg-teal-100 p-4 rounded-full mb-6">
                    <BarChart2 className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Market Insights</h3>
                  <p className="text-gray-600 mb-4">
                    Stay informed about emerging job trends, in-demand skills, and growing industries across Tanzania.
                  </p>
                  <Link to="/insights" className="mt-auto text-teal-600 font-medium inline-flex items-center">
                    View insights <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Connecting Tanzania to Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is growing to become Tanzania's premier hub for jobs, skills, and career development.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-blue-600">5,000+</p>
              <p className="text-gray-600 mt-2">Job Listings</p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-blue-600">300+</p>
              <p className="text-gray-600 mt-2">Employers</p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-blue-600">10,000+</p>
              <p className="text-gray-600 mt-2">Registered Users</p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-blue-600">150+</p>
              <p className="text-gray-600 mt-2">Training Courses</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from Tanzanians who have transformed their careers through KaziConnect.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardBody className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-blue-600">JM</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">John Makundi</h4>
                      <p className="text-sm text-gray-600">Software Developer, Dar es Salaam</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "Through KaziConnect's training programs, I was able to develop coding skills that were in high demand. Within three months, I secured a job at a tech company in Dar es Salaam."
                  </p>
                  <div className="flex text-yellow-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardBody className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-green-600">MH</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Maria Hassan</h4>
                      <p className="text-sm text-gray-600">Digital Marketer, Arusha</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "The mentorship program connected me with a marketing expert who helped refine my skills. The personalized guidance was invaluable and led to a job offer from a leading tourism company."
                  </p>
                  <div className="flex text-yellow-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Card className="h-full">
                <CardBody className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-purple-600">DM</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">David Mushi</h4>
                      <p className="text-sm text-gray-600">Agribusiness Manager, Mwanza</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "The platform's AI-based career recommendations showed me opportunities in modern agriculture I hadn't considered. After completing targeted courses, I now manage a thriving agri-tech business."
                  </p>
                  <div className="flex text-yellow-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Ready to Transform Your Career Journey?
              </h2>
              <p className="text-xl text-blue-100">
                Join KaziConnect today and take the first step toward your dream career in Tanzania.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                  <span>Access personalized job recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                  <span>Develop in-demand skills with targeted training</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                  <span>Connect with mentors in your field</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                  <span>Discover the best career path for your talents</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link to="/register">
                  <Button size="large" variant="success">
                    Create Your Free Account
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-full h-full border-2 border-blue-400 rounded-lg"></div>
                <img 
                  src="https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Happy professional" 
                  className="relative z-10 rounded-lg shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;