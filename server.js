// server.js - Student made backend
// Simple server for course guidance

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

// Create app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simple_course_guidance'
});

// Connect to database
connection.connect(function(err) {
    if (err) {
        console.log('Database error:', err);
        return;
    }
    console.log('Database connected!');
});

// Serve pages
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/questionnaire', function(req, res) {
    res.sendFile(path.join(__dirname, 'questionnaire.html'));
});

app.get('/results', function(req, res) {
    res.sendFile(path.join(__dirname, 'results.html'));
});

// Save user answers
app.post('/api/save-answers', function(req, res) {
    let data = req.body;
    
    console.log('Saving answers:', data);
    
    // Insert user
    let userQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';
    connection.query(userQuery, [data.name, data.email || ''], function(err, result) {
        if (err) {
            console.log('Error saving user:', err);
            res.status(500).json({error: 'Database error'});
            return;
        }
        
        let userId = result.insertId;
        
        // Insert answers
        let answersQuery = 'INSERT INTO user_answers (user_id, interests, strengths, career_goal) VALUES (?, ?, ?, ?)';
        connection.query(answersQuery, [
            userId,
            data.interests || '',
            data.strengths || '',
            data.career || ''
        ], function(err, result) {
            if (err) {
                console.log('Error saving answers:', err);
                res.status(500).json({error: 'Database error'});
                return;
            }
            
            console.log('Answers saved!');
            res.json({success: true, userId: userId});
        });
    });
});

// Get all courses
app.get('/api/courses', function(req, res) {
    let query = 'SELECT * FROM courses ORDER BY course_name';
    
    connection.query(query, function(err, results) {
        if (err) {
            console.log('Error getting courses:', err);
            res.status(500).json({error: 'Database error'});
            return;
        }
        
        console.log('Sending courses:', results.length);
        res.json(results);
    });
});

// Get recommendations
app.get('/api/recommendations/:userId', function(req, res) {
    let userId = req.params.userId;
    
    console.log('Getting recommendations for user:', userId);
    
    // Get user answers
    let answersQuery = 'SELECT * FROM user_answers WHERE user_id = ?';
    connection.query(answersQuery, [userId], function(err, answers) {
        if (err) {
            console.log('Error getting answers:', err);
            res.status(500).json({error: 'Database error'});
            return;
        }
        
        if (answers.length === 0) {
            res.json([]);
            return;
        }
        
        let userAnswers = answers[0];
        
        // Get all courses
        let coursesQuery = 'SELECT * FROM courses';
        connection.query(coursesQuery, function(err, courses) {
            if (err) {
                console.log('Error getting courses:', err);
                res.status(500).json({error: 'Database error'});
                return;
            }
            
            // Simple matching
            let recommendations = [];
            
            for (let i = 0; i < courses.length; i++) {
                let course = courses[i];
                let score = Math.floor(Math.random() * 40) + 60; // Random 60-100
                
                // Simple keyword matching
                let interests = userAnswers.interests.toLowerCase();
                let strengths = userAnswers.strengths.toLowerCase();
                let courseDesc = course.description.toLowerCase();
                let courseName = course.course_name.toLowerCase();
                
                if (interests.includes('technology') && courseDesc.includes('technology')) {
                    score += 20;
                }
                if (strengths.includes('analytical') && courseDesc.includes('analytical')) {
                    score += 15;
                }
                if (userAnswers.career && courseDesc.includes(userAnswers.career.toLowerCase())) {
                    score += 10;
                }
                
                score = Math.min(score, 100);
                
                recommendations.push({
                    course_id: course.course_id,
                    course_name: course.course_name,
                    category: course.category,
                    description: course.description,
                    difficulty: course.difficulty,
                    match_score: score
                });
            }
            
            // Sort by score
            recommendations.sort(function(a, b) {
                return b.match_score - a.match_score;
            });
            
            // Save recommendations
            for (let i = 0; i < recommendations.length && i < 3; i++) {
                let rec = recommendations[i];
                let insertRec = 'INSERT INTO recommendations (user_id, course_id, match_score) VALUES (?, ?, ?)';
                connection.query(insertRec, [userId, rec.course_id, rec.match_score]);
            }
            
            console.log('Generated recommendations:', recommendations.slice(0, 3));
            res.json(recommendations.slice(0, 3));
        });
    });
});

// Start server
app.listen(PORT, function() {
    console.log('Server running on http://localhost:' + PORT);
    console.log('Course Guidance System ready!');
});

module.exports = app;
