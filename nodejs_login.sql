DROP database if exists account;
create database account default character set utf8 ;
use account ;

create table if not exists infor_account 
(
id int primary key auto_increment,
name varchar(225) not null,
email varchar(225) null,
password varchar(225) null
);

