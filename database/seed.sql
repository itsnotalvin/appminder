-- TRUNCATE will delete table - similar to DELETE function except it's faster as it removes space allocation immediately too
-- 'restart identity' will restart the primary key serialisation order instead of using 'continue identity' which is the default
-- 'cascade' will ensure that the tables get truncated even if there are foreign key references present
-- To plug in below value, after navigating into project folder, first comment out the 'jobs' table commands; run psql app_minder < database/seed.sql
-- Then, comment out 'users' table commands; run psql app_minder < database/seed.sql

TRUNCATE users restart identity cascade;
INSERT INTO users(first_name,last_name,email,hashed_pw,sec_qns,sec_ans,reminder_days) VALUES
('Sid','Singh','sid@sid.com','sid','qns','ans',3),
('Alvin','Boi','alvin@alvin.com','alvin','qns','ans',4),
('Sam','Hey There','sam@sam.com','sam','qns','ans',2),
('test', 'test', 'test@email.com', 'password', 'qns', 'ans',3),
('Lucy','Hellloo','lucy@lucy.com','lucy','qns','ans',1)

TRUNCATE jobs restart identity cascade;
INSERT INTO jobs(user_id,job_title,company_name,app_stage,key_date,set_reminder,archived,completed,deleted,notes) VALUES
(1,'Software Kid','YOLO','Applied','2022-11-20',true,false,false,false,'I have no idea what I am doing'),
(4,'UX Kid','Narnia','Interviewing','2022-11-10',true,false,false,false,'I have no idea what I am doing'),
(2,'Test Engineer','Hello 1..2.. Testing','Draft','2022-10-24',false,false,false,false,'Why TEST'),
(2,'Product Owner','Products and Schtuff','Awaiting','2022-11-29',true,false,false,false,'Wow I could think of another role while writing seed file - how impressive'),
(3,'Senior Architect','Neverwhere','Applied','2022-11-24',true,false,false,false,'2 + 2 is 7 lol I hope the interviewers dont read this'),
(1,'Football Player','Barcelona','Applied','2022-11-30',true,false,false,false,'Do people apply for these on Seek?');


UPDATE users
SET hashed_pw = '$2b$10$O4aGfJCTTvX1RlpxCt8nheXbi3cMXhPqHixADxU2qXalr3xwqxABa'
