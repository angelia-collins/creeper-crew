
USE ncgc2jgro4jiai3o;

CREATE TABLE contact_info
(
  id int NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(40) NOT NULL,
  last_name VARCHAR (40) NOT NULL,
  email VARCHAR (40) NOT NULL,  
  phone_number VARCHAR (20),
  user_login VARCHAR (50) NOT NULL,
  user_password VARCHAR (50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE attraction_info
(
   id int NOT NULL AUTO_INCREMENT,
   attraction_name VARCHAR(50) NOT NULL,
   address1 VARCHAR(50) NOT NULL,
   city VARCHAR(100) NOT NULL,
   state CHAR(2) NOT NULL,
   postalCode VARCHAR(16) NOT NULL,
   country CHAR(2) NOT NULL,
   PRIMARY KEY (id)
);
