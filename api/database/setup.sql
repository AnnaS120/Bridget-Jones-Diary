DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS user_account;

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  
    PRIMARY KEY (post_id)
);

INSERT INTO post (title, category, content)
VALUES ('why I love my family', 'family', 'they care about me the most');


CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

// it can be configured to automatically update to the current time whenever
 the row is modified, using attributes like ON UPDATE CURRENT_TIMESTAMP. 

//what tables do we need
// One where user has to upload their diary entry
// What colms are needed in the diary entry

0. id  - primary key
1. title - VARCHAR(100)
2. category - VARCHAR(50)
3. content - VARCHAR(500)
4. Date - DATE
5. Time - TIME


