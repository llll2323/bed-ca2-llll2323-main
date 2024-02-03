// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SQL STATEMENTS
// ##############################################################
const SQLSTATEMENT = `
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT
);
CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
);
CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT
);
INSERT INTO TASK (task_id, title, description, points) VALUES 
(1,"Plant a Tree", "Plant a tree in your neighbourhood or a designated green area. "
, 50),
(2,"Use Public Transportation", "Use public transportation or carpool instead of driving alone",
30),
(3,"Reduce Plastic Usage", "Commit to using reusable bags
and containers.", 40),
(4, "Energy Conservation", "Turn off lights and appliances 
when not in use.", 25),
(5, "Composting","Start composting kitchen scraps to create natural
fertiliser.", 35)
INSERT INTO TASKPROGRESS (user_id,task_id,completion_date,notes) VALUES
(1,1,'2023-1-1','planted a tree'),
(1,2,'2023-1-2','used public transportation'),
(2,4,'2023-1-3','conserved energy')
`;

//pets

const SQLSTATEMENT2 = `
CREATE TABLE pets (
  pet_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  health INT DEFAULT 100, 
  mood INT DEFAULT 50,  
  money INT DEFAULT 0
);
CREATE TABLE petShop (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INT NOT NULL,
  type VARCHAR(50)  
);
CREATE TABLE petTask (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  description TEXT,
  points INT
);
CREATE TABLE petTaskProgress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  pet_id INT NOT NULL,
  task_id INT NOT NULL,
  completion_date TIMESTAMP,
  notes TEXT
);
CREATE TABLE petWallet (
  wallet_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  balance INT DEFAULT 0
);
CREATE TABLE petInventory (
  inventory_id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT DEFAULT 1,
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Messages;

CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Messages (message_text, user_id) VALUES
  ("Hello world!", 1),
  ("Yummy!", 2),  
  ("I am the one", 3);

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
`

// ##############################################################
// RUN SQL STATEMENTS
// ##############################################################
pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
