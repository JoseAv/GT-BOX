
create or replace function sp_create_user (
    sp_first_name varchar(100),
    sp_second_name varchar(100),
    sp_first_last_name varchar(100),
    sp_password text,
    sp_user_name varchar(300),
    sp_email text,
    sp_date_of_birth date
)

    returns
as $$
    begin

         insert into users as u
    (first_name, second_name, first_last_name, password, user_name, email, date_of_birth)
    values(
    sp_first_name,
    sp_second_name | null ,
    sp_first_last_name ,
    sp_password ,
    sp_user_name ,
    sp_email ,
    sp_date_of_birth
          );
    end;

    $$ language plpgsql;





create or replace function fn_json_success(code int, message varchar(400), data json)
returns json
as $$
        begin
            return json_build_object(
                   'success', true,
                   'message', message,
                   'http_code', coalesce(code, 200),
                   'time', now(),
                   'data', data
                   );
        end;
    $$ language plpgsql;


create or replace  function fn_json_rejected(code int, message varchar(400))
returns json
as $$
    begin
        return json_build_object(
               'success', false,
               'message', message,
               'http_code', coalesce(code, 400),
               'time', now()
               );
    end;
    $$ language plpgsql;


-- comprobacion de edad
create or replace function age_comprobate(fn_age date)
returns boolean
as $$
    declare
        comprobate boolean;
    begin
    select (date_part('year', age(fn_age)) >=18) into comprobate;
    return comprobate;
    end;
    $$ language plpgsql;

-- fuctions


create or replace function sp_create_user (
    sp_first_name varchar(100),
    sp_second_name varchar(100),
    sp_first_last_name varchar(100),
    sp_password text,
    sp_user_name varchar(300),
    sp_email text,
    sp_date_of_birth date
)

    returns json
as $$
    declare
        id_user int;
        data_json json;

    begin
    if not (select age_comprobate(sp_date_of_birth)) then
        return fn_json_rejected(400,'Age is low');
    end if;

         insert into users
    (first_name, second_name, first_last_name, password, user_name, email, date_of_birth)
    values(
    sp_first_name,
    nullif(sp_second_name, '') ,
    sp_first_last_name ,
    sp_password ,
    sp_user_name ,
    sp_email ,
    sp_date_of_birth
          ) returning id into id_user;

    select  json_build_object(
            'id',id_user
            ) into data_json;

    return  fn_json_success(200, 'Success Create User',data_json );

    EXCEPTION
        WHEN unique_violation then
            return fn_json_rejected(409,'Email already exist');

        when others then
            return  fn_json_rejected(400, 'can not use DB');
    end;
    $$language plpgsql;

    insert into users
    (first_name, second_name, first_last_name, password, user_name, email, date_of_birth)
    values(
           'Jose',
           'Manuel',
           'Arana',
           'Velasquez',
           'jose123',
           'jose@gmail.com',
           '1999/03/09'
          );