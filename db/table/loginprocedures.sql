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






