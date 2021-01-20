
-- USE ;//insert here database property from JawsDB HEROKU

CREATE TABLE contact_info
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(40) NOT NULL,
    last_name varchar (40) NOT NULL,
	email varchar (50) NOT NULL,
    phone_number varchar (10),
	PRIMARY KEY (id)
);