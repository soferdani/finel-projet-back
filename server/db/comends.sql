USE crm;

/* SELECT * from clients; */



SELECT c.id, c.firstName as clineFirstName , c.lastName as clineLastName, c.email, c.firstContact, c.sold, co.country as country , o.firstName , o.lastName , t.type_name as emailType
from owners as o, countrys as co, emailtype as t , clients as c
where o.id = c.owner 
AND co.id = c.country
and t.id = c.emailtype;
 









/* 
SELECT t.name 
FROM trainer AS t, pokemon AS p, pokemon_trainer as pt
WHERE p.name = "${pokemonName}"
AND p.id = pt.p_id 
AND t.id = pt.t_id` */

/* select * from emailtype; */

/* 
insert into clients (firstName, lastName, email, firstContact, sold, emailtype, country, owner)
        values ("Stacy","Morton","stacymorton@imant.com","2018-12-08 22:00:00.000",1,(select id from emailtype where type_name='A'),(select id from countrys where country='France'),(select id from owners where firstName='Janice'
        and lastName='Alvarado')); */





/* select id from owners where firstName="Janice"
        and lastName="Alvarado" */

/* select * from emailtype; */
/* 
insert into clients (firstName, lastName, email, firstContact)
values ("Perkins","Cunningham","perkinscunningham@imant.com","2018-11-26 22:00:00.000"); */





/* DROP TABLE OWNERS; */
/* delete from OWNERS;
select * from OWNERS;
/* insert into OWNERS (firstName, lastName) values ("yosi","gana"); */

/* ALTER TABLE OWNERS RENAME COLUMN lastNmae TO lastName; */
/* 
create TABLE clients (
    id int AUTO_INCREMENT PRIMARY KEY,
    firstName varchar (50),
    lastName varchar (50),
    email varchar (80),
    firstContact DATETIME,
    sold boolean not null DEFAULT 0,
    emailtype int,
    country int,
    owner int,
    FOREIGN KEY (emailtype) REFERENCES emailtype(id),
    FOREIGN KEY (country) REFERENCES countrys(id),
    FOREIGN KEY (owner) REFERENCES OWNERS(id)
); */

/* 
    FOREIGN KEY (c_id) REFERENCES clients(id)

CREATE TABLE emailType (
    id int AUTO_INCREMENT PRIMARY KEY,
    type_name varchar(5),
    c_id int,
    FOREIGN KEY (c_id) REFERENCES clients(id)
);
 */



/* CREATE TABLE OWNERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(40),
    lastName varchar(40)
); */

/* DROP TABLE clients ; */

/* client tabel -  DONE
id PK
first name 
last name 
email
sold */


/* owner table -- Done 
id PK
first name 
last name 
id clint FK  */

/* county table -- Done 
id PK
country name 
id clint  */

/* email type 
id 
type 
id client   */




