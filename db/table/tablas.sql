create table users (
    id serial primary key,
    first_name varchar(100) not null,
    second_name varchar(100),
    first_last_name varchar(100) not null,
    create_date timestamp  default now() not null,
    password text not null,
    user_name varchar(300) not null unique,
    email text unique not null,
    date_of_birth timestamp ,
    is_active  boolean default true not null
);
