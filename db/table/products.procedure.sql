## Funciones

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
        return fn_json_rejected(400,'error in services');

    end
$$ language plpgsql;

CREATE OR REPLACE function fn_edit_product (
    p_id INT,
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
        is_active = COALESCE(p_is_active, is_active),
        sku = COALESCE(p_sku, sku)
    WHERE id = p_id;

    return fn_json_success(200,'Producto editado con exito',data);

    EXCEPTION
        when others  then
           return fn_json_rejected(400,'error in services');
    END;
$$ LANGUAGE plpgsql;
select * from product;


select  fn_create_product('prueba2', 'prueba2', 200, 'sku-prueba2', null);
select  fn_edit_product(2, 'prueba2', '200', 300, null);
select * from product;

SELECT * FROM product WHERE is_active = true ORDER BY product.date_current desc;
create or replace function fn_get_all_products ()
    returns json
as $$
    declare
        data json;
    begin
        select json_agg(
            json_build_object(
                'name', name,
                'description', description,
                'price', price,
                'id', id,
                'has_variant', has_variant,
                'date_current', date_current::text,
                'sku', sku,
                'is_active', is_active
            )
            order by date_current desc
        )
        into data
        from product
        where is_active = true;

        return fn_json_success(200, 'Extraido los productos Correctamente', data);
    Exception
        when others then
            return fn_json_rejected(400, 'error in services');
    end;
$$ language plpgsql;

select fn_get_all_products();

