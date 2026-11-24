-- Simple Course Guidance Database
-- Made by a student for coursework

-- Create database
CREATE DATABASE IF NOT EXISTS simple_course_guidance;
USE simple_course_guidance;

-- Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    difficulty VARCHAR(20)
);

-- User answers table
CREATE TABLE user_answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    interests VARCHAR(200),
    strengths VARCHAR(200),
    career_goal VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Recommendations table
CREATE TABLE recommendations (
    rec_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    course_id INT,
    match_score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Add some sample courses
INSERT INTO courses (course_name, category, description, difficulty) VALUES
('Computer Science', 'Technology', 'Learn programming and software development', 'Hard'),
('Business Management', 'Business', 'Learn how to manage companies and people', 'Medium'),
('Graphic Design', 'Arts', 'Create visual designs and graphics', 'Medium'),
('Psychology', 'Science', 'Study human behavior and mind', 'Medium'),
('Engineering', 'Technology', 'Design and build things', 'Hard'),
('English Literature', 'Arts', 'Study books and writing', 'Easy');

-- Sample User
INSERT INTO users (name, email) VALUES 
('John Smith', 'john@email.com');

-- Sample User Answers
INSERT INTO user_answers (user_id, interests, strengths, career_goal) VALUES
(1, 'technology,mathematics', 'analytical,technical', 'technology');

-- Sample Recommendations
INSERT INTO recommendations (user_id, course_id, match_score) VALUES
(1, 1, 95), -- Computer Science - 95% match
(1, 6, 85), -- Engineering - 85% match
(1, 2, 60); -- Business Management - 60% match
