# Course Guidance System

A web-based prototype application designed to help students choose university courses that align with their interests, strengths, and career goals.

## 📋 Project Overview

This system addresses the rising university dropout rates by providing personalized course recommendations based on:

- Academic interests
- Personal strengths and weaknesses
- Learning preferences
- Career aspirations
- Work environment preferences

## 🎯 Key Features

1. **User Information Input**: Interactive questionnaire collecting student preferences
2. **Smart Analysis**: Intelligent matching algorithm that analyzes user profiles
3. **Personalized Recommendations**: Top 5 course matches with detailed explanations

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Architecture**: Client-Server with RESTful API

## 📁 Project Structure

```
course-guidance-system/
├── index.html              # Homepage
├── questionnaire.html      # Interactive questionnaire
├── results.html           # Results/recommendations page
├── about.html             # About page (optional)
├── styles.css             # Global styles
├── questionnaire.js       # Questionnaire logic
├── results.js             # Results display & matching logic
├── script.js              # General scripts
├── server.js              # Backend API server
├── database_schema.sql    # Database structure
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- Web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Clone or Download the Project

```bash
# Download all project files to a folder
# Or clone if using git:
git clone <repository-url>
cd course-guidance-system
```

### Step 2: Install Node.js Dependencies

```bash
npm install
```

### Step 3: Setup MySQL Database

1. Start your MySQL server
2. Open MySQL command line or MySQL Workbench
3. Run the database schema:

```bash
mysql -u root -p < database_schema.sql
```

Or manually:

```sql
-- Copy and paste the contents of database_schema.sql into MySQL
```

4. Update database credentials in `server.js`:

```javascript
const dbConfig = {
  host: "localhost",
  user: "your_mysql_username",
  password: "your_mysql_password",
  database: "course_guidance_system",
};
```

### Step 4: Start the Backend Server

```bash
npm start
```

The server will run on `http://localhost:3000`

### Step 5: Open the Website

Simply open `index.html` in your web browser, or access:

```
http://localhost:3000/index.html
```

## 📊 Database Schema

### Main Tables:

- **users**: Basic user information
- **user_profiles**: Detailed questionnaire responses
- **user_interests**: Academic interests
- **user_strengths**: Skills and strengths
- **user_preferences**: Learning style, career goals
- **courses**: Available university courses
- **recommendations**: Generated course recommendations

See `database_schema.sql` for complete structure.

## 🎨 Features in Detail

### Questionnaire (10 Questions)

1. Name
2. Academic interests
3. Strengths
4. Weaknesses
5. Learning style
6. Career goals
7. Work environment preferences
8. Study intensity preference
9. Career values
10. Additional information

### Matching Algorithm

The system calculates match scores based on:

- **Interests alignment** (40%)
- **Strengths match** (30%)
- **Career goals** (20%)
- **Work environment** (10%)

### Results Display

- Top 5 recommended courses
- Match percentage for each course
- Detailed course information
- Career paths
- Explanation of why each course matches

## 🔌 API Endpoints

### POST `/api/submit-questionnaire`

Submit user questionnaire data

```json
{
  "userName": "John Doe",
  "interests": ["technology", "mathematics"],
  "strengths": ["analytical", "technical"]
  // ... other fields
}
```

### POST `/api/get-recommendations`

Get course recommendations

```json
{
  "profileId": 1
}
```

### GET `/api/courses`

Get all available courses

### GET `/api/course/:courseId`

Get specific course details

### POST `/api/submit-feedback`

Submit feedback on recommendations

## 🎓 Sample Courses Included

1. Computer Science
2. Business Management
3. Graphic Design
4. Medicine
5. Psychology
6. Engineering
7. Education & Teaching
8. Law
9. Environmental Science
10. English Literature
11. Data Science
12. Sports Science

## 🔄 Development Sprints

### Sprint 1 (Planning)

- Research student needs
- Design questionnaire
- Create wireframes
- Plan database structure

### Sprint 2 (Development)

- Build frontend interface
- Implement questionnaire
- Develop matching algorithm
- Setup database

### Sprint 3 (Refinement)

- Improve recommendations
- Enhance UI/UX
- Add explanations
- Testing and debugging

## 🧪 Testing

### Frontend Testing

1. Open `index.html` in browser
2. Navigate through all pages
3. Complete questionnaire
4. Verify results display

### Backend Testing

Use Postman or similar tool to test API endpoints:

```bash
# Test submit questionnaire
POST http://localhost:3000/api/submit-questionnaire

# Test get courses
GET http://localhost:3000/api/courses
```

## 🐛 Troubleshooting

### Database Connection Issues

- Check MySQL is running
- Verify credentials in `server.js`
- Ensure database `course_guidance_system` exists

### Port Already in Use

Change the port in `server.js`:

```javascript
const PORT = process.env.PORT || 3001; // Change to 3001 or other port
```

### Missing Dependencies

```bash
npm install
```

## 📈 Future Enhancements

- User authentication system
- Save and retrieve past recommendations
- Admin panel for managing courses
- More detailed course information
- Integration with university APIs
- Mobile app version
- AI-powered matching improvements

## 👥 Team

**Team Six** - Software Engineering Project

- Product Owner: [Name]
- Developers: [Names]
- Line Manager: Sean Maudsley Barton

## 📄 License

This project is created for educational purposes as part of a university software engineering module.

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📞 Support

For issues or questions:

- Check the troubleshooting section
- Review code comments
- Contact team members

---

**Note**: This system is designed to guide students but should not replace professional academic counseling. Always consult with qualified advisors before making important educational decisions.
