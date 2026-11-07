DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS user_account;

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR (100) NOT NULL,
    content VARCHAR (2000) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  
    PRIMARY KEY (post_id)
);




-- CREATE TABLE user_account (
--     user_id INT GENERATED ALWAYS AS IDENTITY,
--     username VARCHAR(30) UNIQUE NOT NULL,
--     password CHAR(60) NOT NULL,
--     PRIMARY KEY (user_id)
-- );



