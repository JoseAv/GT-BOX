
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

-- POST
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

-- GET one user

create or replace function fn_get_all_users()
returns json
    as $$
    declare
        data_user json;
    begin

    select json_object_agg(
            user_name,
           json_build_object(
           'id',id,
           'first_name',first_name,
           'second_name',second_name,
           'user_name',user_name,
           'email',email,
           'date_of_birth', date_of_birth,
           'is_active', is_active
           )
           ) into data_user from users;

        return fn_json_success(code:=200,message := 'Get User success', data := data_user);

    EXCEPTION
        WHEN others then
            return  fn_json_rejected(400, message := 'ERROR IN DATA BASE FN_USERS');
        end
    $$ language plpgsql;


select fn_get_all_users()

-- PATCH Update User

select * from users;

create or replace function fn_update_user(
    f_id int ,
    f_first_name varchar(100) default null,
    f_second_name varchar(100) default null,
    f_first_last_name varchar(100) default null,
    f_password text default null,
    f_user_name varchar(300) default null,
    f_email text default null,
    f_date_of_birth date default null,
    f_is_active boolean default null
)
    returns json
as $$
    declare
        date_user json;
    begin
    if(select 1 from users where id = f_id) is null then
             return fn_json_rejected(406, 'USER NOT EXIST');

    end if;

    if  ( f_date_of_birth)  IS NOT NULL then
         if(select age_comprobate(f_date_of_birth)) is not true then
             return fn_json_rejected(406, 'No cumple la mayoria de edad');
         end if;
    END IF;

    update users
    set first_name= coalesce(f_first_name, first_name),
        second_name= coalesce(f_second_name,second_name),
        first_last_name= coalesce(f_first_last_name, first_last_name),
        password= coalesce(f_password, password),
        user_name= coalesce(f_user_name, user_name),
        email= coalesce(f_email,email),
        date_of_birth= coalesce(f_date_of_birth, date_of_birth),
        is_active= coalesce(f_is_active, is_active)
        where id = f_id;

    return fn_json_success(201,'COMPLETE UPDATE', date_user);

    EXCEPTION
    when unique_violation then
        return fn_json_rejected(409, 'ALREADY EXIST DATA');
    when others  then
        return fn_json_rejected(409, 'ERROR IN UPDATE USER');
    end;

    $$ language plpgsql;


select * from users;
select fn_update_user(3)