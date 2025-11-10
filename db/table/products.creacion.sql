create table product (
    id serial primary key,
    date_current date default now() not null,
    name varchar(255) not null,
    description text not null,
    price int4 not null,
    category int,
    photo text,
    is_active boolean default true,
    has_variant boolean default false);

create table variant(
    id serial primary key ,
    sku varchar(100) unique,
    price int4 not null,
    photo text,
    is_active boolean default true,
    id_product int
);

alter table variant
alter column id_product set not null;

create table union_values_variant(
    id_value int,
    id_variant int,
    primary key (id_variant,id_value)
);

create table attribute(
    id serial primary key ,
    name varchar(255) not null UNIQUE
);

create table attribute_value(
    id serial primary key ,
    name varchar(255) not null,
    id_attribute int not null,
    unique(id_attribute, name)
);

alter table union_values_variant
add constraint fk_variant_values foreign key (id_value)
references  attribute_value (id);

alter table union_values_variant
add constraint fk_variant_union_variant foreign key (id_variant)
references  variant (id);

alter table attribute_value
add constraint  fk_attribute_value_in_attribute foreign key (id_attribute)
references  attribute(id);

alter table variant
add constraint  fk_products_in_variant foreign key (id_product)
references  product(id);