# Creacion y edicion de products

create or replace procedure p_create_product (p_name varchar(255), p_description text, p_price int4, p_sku text,p_photo text default null)
as $$
    begin
        insert into product(name,description,price,photo,sku)
        values  (p_name,p_description,p_price,p_photo,p_sku);
    end
$$ language plpgsql;


CREATE OR REPLACE PROCEDURE p_edit_product (
    id_product INT,
    p_name VARCHAR(255) DEFAULT NULL,
    p_description TEXT DEFAULT NULL,
    p_price INT4 DEFAULT NULL,
    p_photo TEXT DEFAULT NULL,
    p_is_active BOOLEAN DEFAULT NULL,
    p_sku TEXT DEFAULT NULL
)
AS $$
BEGIN
    UPDATE product
    SET name = COALESCE(p_name, name),
        description = COALESCE(p_description, description),
        price = COALESCE(p_price, price),
        photo = COALESCE(p_photo, photo),
        is_active = COALESCE(p_is_active, is_active),
        sku = COALESCE(p_sku, sku)
    WHERE id = id_product;
END;
$$ LANGUAGE plpgsql;

call p_create_product('prueba1', 'prueba1',200,'sku-200');
select * from product;
