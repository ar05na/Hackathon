-- Use the database
USE mentor_connect;

-- Create table for mentees
CREATE TABLE mentees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Create table for mentors
CREATE TABLE mentors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL
);

-- Create table for feedback
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mentor_id INT,
    mentee_id INT,
    feedback_text TEXT,
    FOREIGN KEY (mentor_id) REFERENCES mentors(id),
    FOREIGN KEY (mentee_id) REFERENCES mentees(id)
);
