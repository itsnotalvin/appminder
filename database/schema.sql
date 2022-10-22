SELECT 'CREATE DATABASE app_minder' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'app_minder') \gexec

-- The above statement within brackets first tries to connect to the database - and if it fails, it runs the SQL statement to create the database

\c app_minder;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name text,
    last_name text,
    email text,
    hashed_pw text,
    sec_qns text,
    sec_ans text,
    reminder_days integer
);

DROP TABLE IF EXISTS jobs CASCADE;
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users (id) ON DELETE CASCADE,
    job_title text,
    company_name text,
    app_stage text,
    key_date date,
    set_reminder boolean,
    archived boolean,
    completed boolean,
    deleted boolean,
    notes text,
    last_updated TIMESTAMP default CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_modtime BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();