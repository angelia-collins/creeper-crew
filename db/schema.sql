
USE ncgc2jgro4jiai3o;

CREATE TABLE user
(
  id int NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(40) NOT NULL,
  last_name VARCHAR (40) NOT NULL,
  email VARCHAR (40) NOT NULL,  
  user_password VARCHAR (50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE attraction
(
  id int NOT NULL AUTO_INCREMENT,
  attraction_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE available 
(
  FOREIGN KEY (user_id) REFERENCES user(id), 
  FOREIGN KEY (attraction_id) REFERENCES attraction(id),
  dateEntered DATE NOT NULL(),
)

SELECT * FROM user;
SELECT * FROM attraction;
SELECT * FROM available;

SELECT first_name, email, dateEntered
FROM available
INNER JOIN user ON available.dateEntered = user.id;