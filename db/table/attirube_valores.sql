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