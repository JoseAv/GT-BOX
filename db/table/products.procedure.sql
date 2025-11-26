## Funciones

create or replace function fn_create_product (p_name varchar(255), p_description text, p_price int4, p_sku text,p_photo text default null)
    returns json
    as $$
    declare
        data json;
    begin
        insert into product(name,description,price,photo,sku)
        values  (p_name,p_description,p_price,p_photo,p_sku);
        return fn_json_success(200,'Producto Creado con exito',data);

        EXCEPTION
        when others  then
        return fn_json_rejected(200,'error in services');

    end
$$ language plpgsql;

CREATE OR REPLACE function fn_edit_product (
    id_product INT,
    p_name VARCHAR(255) DEFAULT NULL,
    p_description TEXT DEFAULT NULL,
    p_price INT4 DEFAULT NULL,
    p_photo TEXT DEFAULT NULL,
    p_is_active BOOLEAN DEFAULT NULL,
    p_sku TEXT DEFAULT NULL
)
    returns json
AS $$
    declare
        data json;
BEGIN
    UPDATE product
    SET name = COALESCE(p_name, name),
        description = COALESCE(p_description, description),
        price = COALESCE(p_price, price),
        photo = COALESCE(p_photo, photo),
        