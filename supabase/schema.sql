-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Enable full text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(255),
  date_of_birth DATE,
  address TEXT,
  profile_picture TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token TEXT,
  reset_token TEXT,
  reset_token_expires_at TIMESTAMP WITH TIME ZONE,
  preferred_language VARCHAR(10) DEFAULT 'id',
  accessibility_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- COMPANIES TABLE
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  logo TEXT,
  website VARCHAR(255),
  description TEXT,
  industry VARCHAR(255),
  company_size VARCHAR(50),
  founded_year INTEGER,
  headquarters VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- JOB CATEGORIES TABLE
CREATE TABLE job_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LOCATIONS TABLE
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL DEFAULT 'Indonesia',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(city, province, country)
);

-- JOBS TABLE
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  responsibilities TEXT,
  category_id UUID REFERENCES job_categories(id),
  location_id UUID REFERENCES locations(id),
  job_type VARCHAR(50) NOT NULL, -- Full-time, Part-time, Freelance, Internship
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency VARCHAR(10) DEFAULT 'IDR',
  is_salary_visible BOOLEAN DEFAULT TRUE,
  is_remote BOOLEAN DEFAULT FALSE,
  experience_level VARCHAR(50), -- Entry, Mid, Senior
  education_level VARCHAR(100),
  no_age_limit BOOLEAN DEFAULT FALSE,
  disability_friendly BOOLEAN DEFAULT FALSE,
  suitable_for VARCHAR(50), -- freshgrad, intern, experienced
  application_deadline TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for job search
CREATE INDEX jobs_search_idx ON jobs USING GIN (
  to_tsvector('indonesian', title) || 
  to_tsvector('indonesian', description)
);

-- SKILLS TABLE
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- JOB SKILLS TABLE (Many-to-Many relationship between jobs and skills)
CREATE TABLE job_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, skill_id)
);

-- USER SKILLS TABLE (Many-to-Many relationship between users and skills)
CREATE TABLE user_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level INTEGER, -- 1-5 scale
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- EDUCATION TABLE
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  institution VARCHAR(255) NOT NULL,
  degree VARCHAR(255),
  field_of_study VARCHAR(255),
  start_year INTEGER NOT NULL,
  end_year INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EXPERIENCE TABLE
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RESUMES TABLE
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  file_url TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- JOB APPLICATIONS TABLE
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id),
  cover_letter TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'applied', -- applied, reviewed, interview, rejected, accepted
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_status_change TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);

-- APPLICATION STATUS HISTORY TABLE
CREATE TABLE application_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  notes TEXT,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SAVED JOBS TABLE
CREATE TABLE saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- COMPANY REVIEWS TABLE
CREATE TABLE company_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(255),
  review_text TEXT,
  pros TEXT,
  cons TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, user_id)
);

-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- application_update, job_recommendation, etc.
  is_read BOOLEAN DEFAULT FALSE,
  related_entity_type VARCHAR(50), -- job, application, etc.
  related_entity_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- USER PREFERENCES TABLE
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_categories JSONB, -- Array of category IDs
  preferred_locations JSONB, -- Array of location IDs
  min_salary INTEGER,
  job_types JSONB, -- Array of job types
  is_remote BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CHAT MESSAGES TABLE (for chatbot history)
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  role VARCHAR(10) NOT NULL, -- 'user' or 'bot'
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_user_skills_updated_at BEFORE UPDATE ON user_skills FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_company_reviews_updated_at BEFORE UPDATE ON company_reviews FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create views for common queries
CREATE VIEW active_jobs AS
SELECT j.*, c.name as company_name, c.logo as company_logo, l.city, l.province, jc.name as category_name
FROM jobs j
JOIN companies c ON j.company_id = c.id
LEFT JOIN locations l ON j.location_id = l.id
LEFT JOIN job_categories jc ON j.category_id = jc.id
WHERE j.is_active = TRUE AND j.application_deadline > NOW();

CREATE VIEW job_application_stats AS
SELECT 
  j.id as job_id,
  j.title as job_title,
  c.name as company_name,
  COUNT(ja.id) as total_applications,
  SUM(CASE WHEN ja.status = 'applied' THEN 1 ELSE 0 END) as applied_count,
  SUM(CASE WHEN ja.status = 'reviewed' THEN 1 ELSE 0 END) as reviewed_count,
  SUM(CASE WHEN ja.status = 'interview' THEN 1 ELSE 0 END) as interview_count,
  SUM(CASE WHEN ja.status = 'accepted' THEN 1 ELSE 0 END) as accepted_count,
  SUM(CASE WHEN ja.status = 'rejected' THEN 1 ELSE 0 END) as rejected_count
FROM jobs j
LEFT JOIN job_applications ja ON j.id = ja.job_id
JOIN companies c ON j.company_id = c.id
GROUP BY j.id, j.title, c.name;

CREATE VIEW company_rating_stats AS
SELECT 
  c.id as company_id,
  c.name as company_name,
  COUNT(cr.id) as total_reviews,
  ROUND(AVG(cr.rating), 1) as average_rating
FROM companies c
LEFT JOIN company_reviews cr ON c.id = cr.company_id
GROUP BY c.id, c.name;

-- Row Level Security (RLS) Policies
-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users table policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Jobs table policies
CREATE POLICY "Anyone can view active jobs" ON jobs
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Companies can manage their own jobs" ON jobs
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM companies WHERE id = company_id
  ));

-- Job applications policies
CREATE POLICY "Users can view their own applications" ON job_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" ON job_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Companies can view applications for their jobs" ON job_applications
  FOR SELECT USING (
    job_id IN (
      SELECT id FROM jobs WHERE company_id IN (
        SELECT id FROM companies WHERE id = auth.uid()
      )
    )
  );

-- Saved jobs policies
CREATE POLICY "Users can manage their saved jobs" ON saved_jobs
  FOR ALL USING (auth.uid() = user_id);

-- Resumes policies
CREATE POLICY "Users can manage their own resumes" ON resumes
  FOR ALL USING (auth.uid() = user_id);

-- Education policies
CREATE POLICY "Users can manage their own education" ON education
  FOR ALL USING (auth.uid() = user_id);

-- Experience policies
CREATE POLICY "Users can manage their own experience" ON experience
  FOR ALL USING (auth.uid() = user_id);

-- Company reviews policies
CREATE POLICY "Anyone can view approved company reviews" ON company_reviews
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Users can manage their own reviews" ON company_reviews
  FOR ALL USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can mark their notifications as read" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- User preferences policies
CREATE POLICY "Users can manage their own preferences" ON user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- User skills policies
CREATE POLICY "Users can manage their own skills" ON user_skills
  FOR ALL USING (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can view their own chat messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert initial data for job categories
INSERT INTO job_categories (name, description) VALUES
('IT & Teknologi', 'Pekerjaan di bidang teknologi informasi dan pengembangan software'),
('Retail & F&B', 'Pekerjaan di bidang retail dan food & beverage'),
('Keuangan & Perbankan', 'Pekerjaan di bidang keuangan, asuransi, dan perbankan'),
('Kesehatan', 'Pekerjaan di bidang kesehatan dan medis'),
('Pendidikan', 'Pekerjaan di bidang pendidikan dan pengajaran'),
('Manufaktur', 'Pekerjaan di bidang manufaktur dan produksi'),
('Media & Komunikasi', 'Pekerjaan di bidang media, komunikasi, dan periklanan'),
('Transportasi & Logistik', 'Pekerjaan di bidang transportasi dan logistik'),
('Konstruksi & Properti', 'Pekerjaan di bidang konstruksi dan properti'),
('Pariwisata & Perhotelan', 'Pekerjaan di bidang pariwisata dan perhotelan');

-- Insert initial data for locations
INSERT INTO locations (city, province) VALUES
('Jakarta Pusat', 'DKI Jakarta'),
('Jakarta Utara', 'DKI Jakarta'),
('Jakarta Barat', 'DKI Jakarta'),
('Jakarta Selatan', 'DKI Jakarta'),
('Jakarta Timur', 'DKI Jakarta'),
('Bandung', 'Jawa Barat'),
('Surabaya', 'Jawa Timur'),
('Medan', 'Sumatera Utara'),
('Makassar', 'Sulawesi Selatan'),
('Semarang', 'Jawa Tengah'),
('Yogyakarta', 'DI Yogyakarta'),
('Denpasar', 'Bali'),
('Tangerang', 'Banten'),
('Bekasi', 'Jawa Barat'),
('Depok', 'Jawa Barat');

-- Insert initial data for skills
INSERT INTO skills (name, category) VALUES
('JavaScript', 'Programming'),
('Python', 'Programming'),
('Java', 'Programming'),
('SQL', 'Database'),
('HTML/CSS', 'Web Development'),
('React', 'Web Development'),
('Node.js', 'Web Development'),
('Microsoft Office', 'Office Tools'),
('Digital Marketing', 'Marketing'),
('Customer Service', 'Service'),
('Project Management', 'Management'),
('Data Analysis', 'Analytics'),
('Graphic Design', 'Design'),
('Content Writing', 'Content'),
('Sales', 'Business'),
('Accounting', 'Finance'),
('Communication', 'Soft Skills'),
('Leadership', 'Soft Skills'),
('Problem Solving', 'Soft Skills'),
('Teamwork', 'Soft Skills');
