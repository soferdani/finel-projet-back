USE manageme;

-- select * from booking;

-- UPDATE booking set end_data = "2020-04-26T14:30:00.000Z" where id = 3;

-- UPDATE booking
-- SET g_first_name = 'dudi'
-- WHERE id = 4;



-- ALTER TABLE property
-- RENAME COLUMN adress to address;
-- ALTER TABLE property
-- RENAME COLUMN num_roms to rooms;
-- ALTER TABLE property
-- RENAME COLUMN bathroms to bathrooms;
-- ALTER TABLE property
-- RENAME COLUMN max_gusts to guests;


-- ALTER TABLE booking
-- ADD phone varchar(10);

-- ALTER TABLE property
-- ADD name text;

select * from booking

-- UPDATE booking

--                 SET channel = 'vrbo'
--                 WHERE id = 4;
-- `UPDATE booking
--                 SET ${key} = '${booking[key]}'
--                 WHERE id = ${id};`

-- SELECT * from booking;
-- INSERT INTO booking VALUES(
--         null,
--         "2020-04-22 14:30:00",
--         "2020-04-31 14:30:00",
--         2,
--         4,
--         "airbnb",
--         9,
--         "yago",
--         "jekobson",
--         "ma-23",
--         "masd.img"
-- );





-- alter TABLE booking add external_property_name varchar(50);

--  CREATE TABLE user_type (
--     type_id INT AUTO_INCREMENT PRIMARY KEY,
--     type_name varchar(40)
-- );


-- create TABLE user (
--     user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(40),
--     last_name VARCHAR(40),
--     email VARCHAR(80),
--     phone VARCHAR(10),
--     datejoin datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     user_pass VARCHAR (60),
--     user_type INT,
--     token VARCHAR (60) NOT NULL,
--     FOREIGN KEY (user_type) REFERENCES user_type(type_id)
-- );


-- CREATE TABLE owner (
--     o_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
--     name varchar(40),
--     phone varchar(10),
--     country varchar(50),
--     email varchar(60)
-- );



-- CREATE TABLE property(
--     id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
--     img TEXT,
--     adress TEXT,
--     num_roms int,
--     bathroms int,
--     max_gusts int,
--     pool boolean,
--     ac boolean,
--     wifi boolean,
--     kitchen boolean,
--     owner int,
--     FOREIGN KEY (owner) REFERENCES owner(o_id)
-- );



-- CREATE TABLE todo (
--     t_id int,
--     task text,
--     property int,
--     service_type int,
--     create_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     is_complete boolean,
--     img text,
--     FOREIGN KEY (property) REFERENCES property(id),
--     FOREIGN KEY (service_type) REFERENCES user_type(type_id)
-- );


-- CREATE TABLE booking (
--     id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
--     start_date datetime NOT NULL,
--     end_data datetime NOT NULL,
--     property int,
--     gusts int,
--     channel text,
--     nights int,
--     g_first_name varchar(50),
--     g_last_name varchar(50),
--     g_photo text,
--     FOREIGN KEY (property) REFERENCES property(id)
-- );



-- CREATE TABLE property_user (
--     user int,
--     property int,
--     FOREIGN KEY (user) REFERENCES user(user_id),
--     FOREIGN KEY (property) REFERENCES property(id),
--     PRIMARY KEY (user, property)
-- );


-- insert into user_type values (
--     null,
--     "manager"
-- );

-- SELECT * from user_type;

-- DELETE from TODO;
-- alter TABLE TODO drop service_provider_type;

-- insert into PROPERTY_SERVICE values (
--     14,
--     6
-- );

-- ALTER TABLE PROPERTY_SERVICE DROP S;

-- ALTER TABLE PROPERTY_SERVICE ADD create_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CREATE TABLE PROPERTY_SERVICE (
--     service_provider int,
--     property int,
--     FOREIGN KEY (service_provider) REFERENCES USER(user_id),
--     FOREIGN KEY (property) REFERENCES PROPERTY(id),
--     PRIMARY KEY (service_provider, property)
-- ) ;

-- SELECT * FROM user;
-- SELECT * FROM user_type;
-- SELECT * FROM property;
-- SELECT * FROM property_user;
-- SELECT * FROM owner;
-- SELECT * FROM booking;
-- SELECT * FROM todo;
-- DELETE FROM USER;

-- INSERT INTO OWNERS VALUES(
--         NULL,
--         'Yossi Cohen',
--         '0528756600',
--         'Israel',
--         'yossicohen@gmail.com');

-- SELECT id, img, adress, num_roms, bathroms, max_gusts, pool, ac, wifi, kitchen, onwer, maneger
--  FROM PROPERTY, USER
-- WHERE PROPERTY.maneger = USER.user_id
-- AND PROPERTY.maneger = 11;

-- INSERT INTO user_type VALUES(
--         NULL,
--         'Plumbing');


-- insert into USER_TYPE values (null, "elctricety");


-- ALTER TABLE USER ADD avater text;


--
-- select * from property_user
-- select * from property
-- select * from owner
-- select * from user
-- DELETE from user where user_id = 7
-- DELETE from property_user where user = 7
-- DELETE from owner where o_id = 3