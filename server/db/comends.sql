USE manageme;


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
--         'plumbing');
-- Electricity
-- Plumbing
-- SELECT p.id, img, adress, num_roms, bathroms, max_gusts, pool, ac, wifi,kitchen, onwer, maneger, name, phone, country, email
--         FROM PROPERTY AS p JOIN OWNERS AS o
--         ON p.ONWER = o.id
--        WHERE p.maneger = 11;

-- DELETE FROM USER_TYPE WHERE type_name = 'elctricety'

-- ALTER TABLE TODO
-- DROP service_provider_type;
-- ALTER TABLE user COLUMN

-- INSERT INTO owner VALUES(
--         NULL,
--         'Ido Zehavi',
--         '0508991538',
--         'Israel',
--         'idozehavi123@gmail.com');

-- delete from property

-- delete from todo
-- ALTER TABLE todo MODIFY t_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT