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

