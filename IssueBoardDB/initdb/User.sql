CREATE DATABASE IF NOT EXISTS issue_board;

USE issue_board;

CREATE TABLE IF NOT EXISTS users(
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_salt BINARY(32) NOT NULL,
    password_hash BINARY(20)NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS issues (
    issuesid INT AUTO_INCREMENT PRIMARY KEY,
    titel VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    assigned_to INT,
    FOREIGN KEY (created_by) REFERENCES users(userid),
    FOREIGN KEY (assigned_to) REFERENCES users(userid)
);

CREATE TABLE IF NOT EXISTS comments(
    commentsid INT AUTO_INCREMENT PRIMARY KEY,
    issue_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (issue_id) REFERENCES issues(issuesid) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(userid)
);