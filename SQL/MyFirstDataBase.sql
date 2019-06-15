CREATE DATABASE IF NOT EXISTS footballers;
USE footballers;
CREATE TABLE IF NOT EXISTS players (
id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL, 
year_of_birth YEAR
);
INSERT INTO players ( id, first_name, last_name) VALUES ( null, 'Artem', 'Dzyuba');
INSERT INTO players ( id, first_name, last_name, year_of_birth) VALUES ( null, 'Igor', 'Akinfeev', 1986);
INSERT INTO players ( id, first_name, last_name, year_of_birth) VALUES ( null, 'Denis', 'Cheryshev', 1990);
INSERT INTO players ( id, first_name, last_name, year_of_birth) VALUES ( null, 'Igor', 'Smolnikov', 1988);
SELECT first_name, last_name FROM footballers.players;
SELECT * FROM footballers.players WHERE year_of_birth IS NOT NULL;
UPDATE players
SET year_of_birth=1988
WHERE id=23;
SELECT first_name, last_name FROM players WHERE year_of_birth > 1987;
CREATE TABLE IF NOT EXISTS teams (
id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
team_name VARCHAR(20)
);
INSERT INTO teams (id, team_name) VALUES (null, 'Zenit');
INSERT INTO teams (id, team_name) VALUES (null, 'CSKA'); 
INSERT INTO teams (id, team_name) VALUES (null, 'Villarreal');
ALTER TABLE players ADD team_id INTEGER NOT NULL;
UPDATE players SET team_id=2 WHERE id IN (23,26);
UPDATE players SET team_id=3 WHERE id=24;
UPDATE players SET team_id=1 WHERE id=25;
SELECT player.first_name, player.last_name, team.team_name
FROM players player
INNER JOIN teams team ON player.team_id=team.id;

CREATE DATABASE IF NOT EXISTS employees; # Тут начинается домашка 
use employees;
CREATE TABLE IF NOT EXISTS employees (
id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL, 
emp_position VARCHAR(30) NOT NULL,
salary INT
);


INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Иван', 'Иванов', 'anypos', 40000);
INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Петр', 'Петров', 'anypos', 32000);
INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Сидр', 'Сидоров', 'anypos', 27000);
INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Сергей', 'Сергеев', 'anypos', 27000);
INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Костя', 'Константинов', 'anypos', 15500);

CREATE TABLE IF NOT EXISTS emp_position (
id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
position_name VARCHAR(20)
);
INSERT INTO emp_position (id, position_name) VALUES (null, 'Директор');
INSERT INTO emp_position (id, position_name) VALUES (null, 'Бухгалтер'); 
INSERT INTO emp_position (id, position_name) VALUES (null, 'Менеджер');
INSERT INTO emp_position (id, position_name) VALUES (null, 'Охранник');
use employees;
UPDATE employees SET emp_position=1 WHERE id=1;
UPDATE employees SET emp_position=2 WHERE id=2;
UPDATE employees SET emp_position=3 WHERE id IN (3,4);
UPDATE employees SET emp_position=4 WHERE id=5;
ALTER TABLE employees MODIFY emp_position INTEGER NOT NULL;
use employees;
SELECT employees.first_name, employees.last_name, employees.salary FROM employees WHERE employees.salary < 30000; # Выбрать всех с ЗП меньше 30тр

SELECT men.first_name, men.last_name, men.salary, pos.position_name # Объединяю ИФ с названием должности и фильтрую МЕНЕДЖЕРОВ с ЗП меньше 30тр
FROM employees men
INNER JOIN emp_position pos ON men.emp_position=pos.id AND (men.salary < 30000 AND pos.position_name = 'Менеджер');

