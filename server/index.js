import express from 'express';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'kaziconnect',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Initialize database tables
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        location VARCHAR(255),
        user_type VARCHAR(50) NOT NULL DEFAULT 'jobseeker',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        level VARCHAR(50) NOT NULL,
        endorsed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        institution VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        field_of_study VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE,
        in_progress BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS experience (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE,
        current BOOLEAN DEFAULT FALSE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        salary_min INTEGER,
        salary_max INTEGER,
        salary_currency VARCHAR(10) DEFAULT 'TZS',
        skills TEXT[] NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT[] NOT NULL,
        responsibilities TEXT[] NOT NULL,
        posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deadline_date TIMESTAMP NOT NULL,
        employer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        duration VARCHAR(100) NOT NULL,
        level VARCHAR(50) NOT NULL,
        skills TEXT[] NOT NULL,
        description TEXT NOT NULL,
        certificate BOOLEAN DEFAULT TRUE,
        cost_amount INTEGER DEFAULT 0,
        cost_currency VARCHAR(10) DEFAULT 'TZS',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS career_paths (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        demand_score INTEGER NOT NULL,
        growth_rate DECIMAL(5,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS career_stages (
        id SERIAL PRIMARY KEY,
        career_path_id INTEGER REFERENCES career_paths(id) ON DELETE CASCADE,
        level VARCHAR(100) NOT NULL,
        skills TEXT[] NOT NULL,
        courses TEXT[] NOT NULL,
        experience VARCHAR(255) NOT NULL,
        salary_min INTEGER NOT NULL,
        salary_max INTEGER NOT NULL,
        salary_currency VARCHAR(10) DEFAULT 'TZS',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS mentors (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        specialties TEXT[] NOT NULL,
        experience INTEGER NOT NULL,
        rating DECIMAL(3,2) DEFAULT 0.0,
        reviews INTEGER DEFAULT 0,
        available BOOLEAN DEFAULT TRUE,
        hourly_rate INTEGER,
        hourly_rate_currency VARCHAR(10) DEFAULT 'TZS',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Database tables initialized');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

// Routes
// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, location, password, userType } = req.body;
    
    // Check if user already exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, phone, location, user_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, phone, location, user_type',
      [name, email, hashedPassword, phone, location, userType]
    );
    
    // Generate JWT
    const token = jwt.sign(
      { id: newUser.rows[0].id }, 
      process.env.JWT_SECRET || 'kaziconnectsecret', 
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: newUser.rows[0]
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.rows[0].id }, 
      process.env.JWT_SECRET || 'kaziconnectsecret', 
      { expiresIn: '7d' }
    );
    
    // Remove password from response
    const { password: pass, ...userWithoutPassword } = user.rows[0];
    
    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'kaziconnectsecret');
    
    const user = await pool.query('SELECT id, name, email, phone, location, user_type, created_at FROM users WHERE id = $1', [decoded.id]);
    
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error('Auth verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
});

// User profile routes
app.get('/api/users/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'kaziconnectsecret');
    
    // Get basic user info
    const userResult = await pool.query(
      'SELECT id, name, email, phone, location, user_type, created_at FROM users WHERE id = $1',
      [decoded.id]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = userResult.rows[0];
    
    // Get user skills
    const skillsResult = await pool.query(
      'SELECT id, name, level, endorsed FROM skills WHERE user_id = $1',
      [user.id]
    );
    
    // Get user education
    const educationResult = await pool.query(
      'SELECT id, institution, degree, field_of_study, start_date, end_date, in_progress FROM education WHERE user_id = $1 ORDER BY start_date DESC',
      [user.id]
    );
    
    // Get user experience
    const experienceResult = await pool.query(
      'SELECT id, title, company, location, start_date, end_date, current, description FROM experience WHERE user_id = $1 ORDER BY start_date DESC',
      [user.id]
    );
    
    // Combine all data
    const profile = {
      ...user,
      skills: skillsResult.rows,
      education: educationResult.rows,
      experience: experienceResult.rows
    };
    
    res.json(profile);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Server error retrieving profile' });
  }
});

app.put('/api/users/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'kaziconnectsecret');
    const { name, phone, location } = req.body;
    
    // Update user
    const updatedUser = await pool.query(
      'UPDATE users SET name = $1, phone = $2, location = $3 WHERE id = $4 RETURNING id, name, email, phone, location, user_type, created_at',
      [name, phone, location, decoded.id]
    );
    
    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

// Job routes
app.get('/api/jobs', async (req, res) => {
  try {
    const jobsResult = await pool.query(
      'SELECT * FROM jobs ORDER BY posted_date DESC LIMIT 50'
    );
    
    res.json(jobsResult.rows);
  } catch (err) {
    console.error('Jobs fetch error:', err);
    res.status(500).json({ message: 'Server error fetching jobs' });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const jobResult = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
    
    if (jobResult.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(jobResult.rows[0]);
  } catch (err) {
    console.error('Job fetch error:', err);
    res.status(500).json({ message: 'Server error fetching job' });
  }
});

app.get('/api/jobs/recommended', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'kaziconnectsecret');
    
    // Get user skills
    const userSkills = await pool.query(
      'SELECT name FROM skills WHERE user_id = $1',
      [decoded.id]
    );
    
    const skills = userSkills.rows.map(skill => skill.name);
    
    // Simple recommendation: jobs that match any of the user's skills
    let jobsQuery = 'SELECT * FROM jobs WHERE ';
    const conditions = [];
    
    for (let i = 0; i < skills.length; i++) {
      conditions.push(`$${i + 1} = ANY(skills)`);
    }
    
    if (conditions.length === 0) {
      // If user has no skills, return recent jobs
      jobsQuery = 'SELECT * FROM jobs ORDER BY posted_date DESC LIMIT 10';
      const jobsResult = await pool.query(jobsQuery);
      return res.json(jobsResult.rows);
    }
    
    jobsQuery += conditions.join(' OR ');
    jobsQuery += ' ORDER BY posted_date DESC LIMIT 10';
    
    const jobsResult = await pool.query(jobsQuery, skills);
    
    res.json(jobsResult.rows);
  } catch (err) {
    console.error('Recommended jobs fetch error:', err);
    res.status(500).json({ message: 'Server error fetching recommended jobs' });
  }
});

// Course routes
app.get('/api/courses', async (req, res) => {
  try {
    const coursesResult = await pool.query(
      'SELECT * FROM courses ORDER BY created_at DESC LIMIT 50'
    );
    
    res.json(coursesResult.rows);
  } catch (err) {
    console.error('Courses fetch error:', err);
    res.status(500).json({ message: 'Server error fetching courses' });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const courseResult = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    
    if (courseResult.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(courseResult.rows[0]);
  } catch (err) {
    console.error('Course fetch error:', err);
    res.status(500).json({ message: 'Server error fetching course' });
  }
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDb();
});

export default app;