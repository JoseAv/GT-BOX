create or replace function fn_create_atributte_value(j_attribute jsonb, j_values jsonb)
    returns json
as $$
    declare
        att_id int;
        data json;
    begin
        insert into attribute(name)
        values (j_attribute ->> 'name')
        returning id into att_id;

        if att_id is null  then
            RAISE EXCEPTION 'Failed to create attribute';
        end if;

        INSERT INTO attribute_value (name, id_attribute)
        SELECT
          elem->>'name',
          att_id
        FROM jsonb_array_elements(j_values) AS elem;
        return fn_json_success(200,'Completada la creacion', data := data);

        EXCEPTION
            when others then
                return fn_json_rejected(500, SQLERRM);
    end;
    $$ language plpgsql;


create or replace  function  fn_edit_atributte_value(j_attribute jsonb, j_values jsonb)
returns  json
as $$
        declare
            data json;
        begin
            if j_attribute is not null then
                update attribute
                set name = coalesce(j_attribute ->> 'name', name)
                where id = (j_attribute ->> 'id_attribute')::int;
            end if;

            if j_values is not null then
            update attribute_value as av
                set name = coalesce(elem->> 'name', name)
                from jsonb_array_elements(j_values) as elem
                where av.id = (elem->>'id')::int;
            end if;

    return  fn_json_success(200,'Editado con exito',data := data);

    EXCEPTION
        when others then
            return fn_json_rejected(500,SQLERRM);
        end;

    $$ language plpgsql;




select fn_create_atributte_value((SELECT jsonb_build_object('name', 'Prueba1')),(SELECT jsonb_build_array((SELECT jsonb_build_object('name', 'Prueba1')))));


select fn_edit_atributte_value((select jsonb_build_object('name','prueba edit1', 'id_attribute',3)),(SELECT jsonb_build_array((SELECT jsonb_build_object('name', 'Values 1 Edit', 'id',2)))));

select * from attribute;

select * from attribute_value;


-- Funciones para obtener datos

create or replace function get_all_attributes()
    returns json
    as $$
        declare
            j_attribute json;
        begin

            select json_agg(jsonb_build_object('id',id,'name',name) ) into j_attribute from attribute ;
            return fn_json_success(200,'Obtenido con exito', j_attribute);

            EXCEPTION
                when others then
                    return  fn_json_rejected(500, 'Internal ERROR');
        end;
    $$ language plpgsql;

CREATE OR REPLACE FUNCTION get_one_attributes_and_values(a_id int)
RETURNS json
AS $$
DECLARE
    j_attribute jsonb;
    j_values jsonb;
    j_data jsonb;
BEGIN
    IF a_id IS NULL THEN
        RAISE EXCEPTION 'ID is required';
    END IF;

    SELECT jsonb_build_object('id', id, 'name', name)
    INTO j_attribute
    FROM attribute
    WHERE id = a_id;

    IF j_attribute IS NULL THEN
        RAISE EXCEPTION 'Attribute with ID % not found', a_id;
    END IF;

    SELECT COALESCE(jsonb_agg(jsonb_build_object('id', id, 'name', name)), '[]'::jsonb)
    INTO j_values
    FROM attribute_value
    WHERE id_attribute = a_id;

    j_data := jsonb_build_object('attribute', j_attribute, 'values', j_values);

    RETURN fn_json_success(200, 'Success', j_data::json);

EXCEPTION
    WHEN OTHERS THEN
        RETURN fn_json_rejected(500, SQLERRM::text);
END;
$$ LANGUAGE plpgsql;


select  get_all_attributes();
select * from attribute;
select get_one_attributes_and_values(3);