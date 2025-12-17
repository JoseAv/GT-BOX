-- tabla union de variantes

create table union_variant(
    id serial primary key,
    id_attribute int,
    id_variant int,
    id_value int
);

alter table union_variant
ADD constraint fk_variant_attribute
FOREIGN KEY (id_attribute)
references attribute (id);

alter table union_variant
add constraint fk_variant_value
foreign key (id_value)
references attribute_value(id);

alter table union_variant
add constraint fk_variant_product_variant
foreign key (id_variant)
references variant (id);


insert into variant( sku, price, id_product, name, description) values('prueba',200, 3,'prueba variant', 'esta es una descripcion de variante');
alter table variant
add column name varchar(200);


alter table variant
add column description varchar(200);

alter table variant
alter column is_active set DEFAULT true;

