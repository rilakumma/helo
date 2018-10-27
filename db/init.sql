create table users (
    id serial primary key,
    auth0_id text,
    name text,
    picture text
);
create table posts(
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id integer references users(id)
);