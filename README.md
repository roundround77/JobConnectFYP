# JobConnect FYP

JobConnect is a web application designed to streamline the job search process and facilitate communication between job seekers and employers. This platform provides a user-friendly interface for candidates to search and apply for jobs, manage their applications, and engage in real-time communication with employers.

## Features

- **Real-Time Messaging:** Seamlessly communicate with employers in real time.
- **Job Tracking System:** Keep track of your job applications with a centralized dashboard.
- **User Profile Management:** Create, edit, and manage your user profile.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.7+
- Node.js
- npm

### Installation

1. Clone this repository:
- git clone https://github.com/yourusername/jobconnect.git
2. Change to the project directory:
- cd jobconnect
3. Backend:
- cd backend
4. Create a Python virtual environment named "venv" for the backend:
- python -m venv venv
5. Activate the virtual environment:
- (MAC) source venv/bin/activate (WINDOWS) venv\Scripts\activate
6. Install Python packages listed in the "requirements.txt" file for project dependencies:
- pip install -r requirements.txt
7. Generate database migration files based on changes in the Django models:
- python manage.py makemigrations
8. Apply the database migrations to update the database schema:
- python manage.py migrate
9. Start the Django development server to run the backend application:
- python manage.py runserver
10. Frontend:
- cd ../frontend
11. Install Node.js packages and dependencies for the frontend project:
- npm install
12. Start the development server for the frontend application:
- npm start

### Usage
Visit http://localhost:3000 in your web browser to access the JobConnect application

