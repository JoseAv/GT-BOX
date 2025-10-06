-- Login Encontrar usuario por email

create or replace  function loginUser ( user_mail text)
    returns  json

    as $$
    declare
        data_user json;
    begin
        if (select 1 from users where user_mail = email) is  null  then
            return fn_json_rejected(400,'No Existe el usuario');
        end if;

        select json_build_object('first_name', first_name,
                               'password',password,
                               'user_name', user_name) into data_user from users where user_mail = email;

        return fn_json_success(200,'Creado Exitosamente', data_user);

        EXCEPTION
            WHEN OTHERS THEN
                RETURN fn_json_rejected(400,'Fallo en la db');
    end;
    $$ language plpgsql;


select loginUser('jose@gmail.com');

-- REfresh token

create or replace function fn_refresh_user(user_id int)
    returns json
    as $$
        declare
            info_user json;
    begin

        if(select 1 from users where id = user_id) is null   then
            return fn_json_rejected(400,'Usuario no Existe');
        end if;

        select json_build_object(
    'id',id,
    'first_name', first_name,
    'email', email,
    'user_name', user_name
               ) INTO info_user from users where id = user_id;

    return fn_json_success(200,'creado con existo', info_user);

        EXCEPTION
            WHEN OTHERS THEN
               return fn_json_rejected(400, SQLERRM);
    end;
    $$ language plpgsql;





