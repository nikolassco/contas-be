create database contas;

drop table if exists users;

create table users (
	id serial primary key,
	name text not null,
	email text not null unique,
	password text not null
);

drop table if exists categories;

create table categories (
	id serial primary key,
	name text not null
);

drop table if exists accounts;

create table accounts (
	id serial primary key,
	user_id integer references users(id),
	category_id integer references categories(id),
	title text not null,
	post text not null,
	created_at TIMESTAMPTZ DEFAULT Now()
);
