--Funcion para crear o editar variabtes

create or replace function fn_acction_variant(
    variant jsonb,
    attributes jsonb
)
    returns jsonb
as $$
    declare
        data jsonb;
        f_id_variant int;
    begin

    if variant is null or attributes is null then
        raise  EXCEPTION   'Miss attributes or values';
    end if;

    if (variant->>'id') is not null then
        update variant
        set is_active = false
        where id = (variant->>'id')::int;
    end if;

    -- null::variant es el esquema de mi objeto convierte a null a una tabla variant que es lo que le indica a record a que convertir
    insert into variant(sku, price, photo, id_product, name, description)
         select sku, price, photo, id_product, name, description  from jsonb_populate_record(null::variant,variant) returning id into f_id_variant;

    insert into union_variant(id_attribute, id_variant, id_value)
        select (elem->>'id_attribute')::int, f_id_variant, (elem->>'id_value')::int from jsonb_array_elements(attributes) as elem ;


    return fn_json_success(200, 'Create Variant Exitosamente', data := data);
    EXCEPTION
        when others then
            RETURN fn_json_rejected(500, SQLSTATE || ': ' || SQLERRM);

    end;

    $$ language plpgsql;
