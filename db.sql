-- This is the db schema used for the database
CREATE TABLE users(
`id` int PRIMARY KEY AUTO_INCREMENT
`name` VARCHAR(100) NOT NULL,
`email` VARCHAR(100) NOT NULL UNIQUE,
`balance` DECIMAL(10,2) NOT NULL DEFAULT 5000.00,
`password` VARCHAR(100) NOT NULL /* USE SHA2 */
);

CREATE TABLE transactions(
`id` INT PRIMARY KEY AUTO_INCREMENT,
`user_id` INT NOT NULL REFERENCES Users(id),
`ticker` VARCHAR(30) NOT NULL,
`unit_price` DECIMAL(15,2) NOT NULL,
`qty` INT NOT NULL,
`type` VARCHAR(4) NOT NULL,
`timestamp` DATETIME NOT NULL 
);
