# Здесь Выполенние базового задания из файла (Задание по SQL.pdf)
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

# НАЧАЛО ДОМАШКИ
/*
Задание 1. Создайте БД для хранения информации о сотрудниках. 
Для каждого сотрудника будем хранить следующую информацию:
Имя, Фамилия, Должность, Зарплата
Все поля обязательные и не могут быть пустыми. 
У каждого сотрудника может быть только одна должность, могут быть сотрудники с одинаковыми должностями.
Добавьте 3-5 записей в каждую таблицу.
*/
# Тут создаю пустую таблицу Работников
CREATE DATABASE IF NOT EXISTS employees; 
use employees;
CREATE TABLE IF NOT EXISTS employees (
id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL, 
emp_position VARCHAR(30) NOT NULL,
salary INT
);
# Тут заполняю таблицу Работников данными
INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Иван', 'Иванов', 'anypos', 40000);
INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Петр', 'Петров', 'anypos', 32000);
INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Сидр', 'Сидоров', 'anypos', 27000);
INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Сергей', 'Сергеев', 'anypos', 27000);
INSERT INTO employees ( id, first_name, last_name, emp_position, salary) VALUES ( null, 'Костя', 'Константинов', 'anypos', 15500);
# Тут создаю таблицу с Должностями
CREATE TABLE IF NOT EXISTS emp_position (
id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key,
position_name VARCHAR(20)
);
# Тут заполняю таблицу Должностей данными
INSERT INTO emp_position (id, position_name) VALUES (null, 'Директор');
INSERT INTO emp_position (id, position_name) VALUES (null, 'Бухгалтер'); 
INSERT INTO emp_position (id, position_name) VALUES (null, 'Менеджер');
INSERT INTO emp_position (id, position_name) VALUES (null, 'Охранник');
# Тут назначаю сотрудникам должности 
use employees;
UPDATE employees SET emp_position=1 WHERE id=1;
UPDATE employees SET emp_position=2 WHERE id=2;
UPDATE employees SET emp_position=3 WHERE id IN (3,4);
UPDATE employees SET emp_position=4 WHERE id=5;
ALTER TABLE employees MODIFY emp_position INTEGER NOT NULL;
use employees;
/*
Задание 2. Составьте запросы на выборку данных (SELECT):
Все сотрудники с зарплатами меньше 30 000 рублей.
Всех сотрудники, занимающие определённую должность (например - дизайнеры), с зарплатой меньше 30 000 рублей.
*/
# Здесь выбираю всех с ЗП меньше 30тр
SELECT employees.first_name, employees.last_name, employees.salary 
FROM employees 
WHERE employees.salary < 30000; 

# Здесь выбираю всех МЕНЕДЖЕРОВ с ЗП меньше 30тр
SELECT men.first_name, men.last_name, men.salary, pos.position_name 
FROM employees men
INNER JOIN emp_position pos ON men.emp_position=pos.id AND (men.salary < 30000 AND pos.position_name = 'Менеджер');
/*
Задание 3 (повышенной сложности). 
Часть 1.
Доработать схему БД таким образом, чтобы можно было хранить информацию о подчинённых.
Без каких-либо ограничений: Значит я не делаю столбец Id (в духе id INT UNSIGNED NOT NULL AUTO_INCREMENT primary key), 
а просто таблица соответсвия (emp_id и sub_id) Айдишников работников друг с другом. 
... каждый сотрудник может иметь несколько подчинённых (либо не иметь их вовсе), 
и сам может иметь несколько начальников (либо вовсе начальников не иметь).
Часть 2.
Составьте запрос на выборку всех подчинённых определённого сотрудника.
А тут я выберу Сидорова (id=3) и у него один подчиненный Сергеев (id=4), 
для проверки выборать Иванова (id=1) у него должно вывестись 4 подчиненных
*/
use employees;
# Таблица Подчиненный (sub_id) и его руковидитель (emp_id) 
CREATE TABLE sub_emp (
     sub_id INTEGER UNSIGNED NOT NULL,
     emp_id INTEGER UNSIGNED NOT NULL,
     PRIMARY KEY (sub_id, emp_id)
);
# Заполеннение связями построчно, вероятно есть более быстрый способ, пока умею так... 
INSERT INTO sub_emp (sub_id, emp_id) VALUES (2, 1);
INSERT INTO sub_emp (sub_id, emp_id) VALUES (3, 1);
INSERT INTO sub_emp (sub_id, emp_id) VALUES (4, 1);
INSERT INTO sub_emp (sub_id, emp_id) VALUES (5, 1);
INSERT INTO sub_emp (sub_id, emp_id) VALUES (4, 3);

# Тут вывожу всех подчиненных Сидора Сидорова, ожидаемый результат (1 строка) Серегей Сергеев.
SELECT sub.first_name, sub.last_name /*, boss.first_name, boss.last_name     - это выводит ИФ начальника (boss) */
FROM  employees sub, employees boss, sub_emp bossId
WHERE sub.id = bossId.sub_id AND boss.id = bossId.emp_id AND boss.first_name = 'Сидр' AND boss.last_name = 'Сидоров';

# Тут вывожу всех подчиненных Ивана Иванова, ожидаемый результат (4 строки) Петр ,Сидр, Сергей, Костя.
SELECT sub.first_name, sub.last_name /*, boss.first_name, boss.last_name     - это выводит ИФ начальника (boss) */
FROM  employees sub, employees boss, sub_emp bossId
WHERE sub.id = bossId.sub_id AND boss.id = bossId.emp_id AND boss.first_name = 'Иван' AND boss.last_name = 'Иванов';

