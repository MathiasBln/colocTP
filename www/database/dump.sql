CREATE TABLE IF NOT EXISTS users
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS expense
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
  	cost INT Not NULL
);

CREATE TABLE IF NOT EXISTS colocGroup
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);

-- COLOC <-> USER --
create table coloc_user_junction
(
  coloc_id int,
  user_id int,
  CONSTRAINT coloc_user_pk PRIMARY KEY (coloc_id, user_id),
  CONSTRAINT FK_coloc 
      FOREIGN KEY (coloc_id) REFERENCES colocGroup (id),
  CONSTRAINT FK_user 
      FOREIGN KEY (user_id) REFERENCES users (id)
);

-- EXPENSE <-> USER --
create table expense_user_junction
(
  expense_id int,
  user_id int,
  CONSTRAINT expese_user_pk PRIMARY KEY (expense_id, user_id),
  CONSTRAINT FK_expense 
      FOREIGN KEY (expense_id) REFERENCES expense (id),
  CONSTRAINT FK_user 
      FOREIGN KEY (user_id) REFERENCES users (id)
);



ALTER TABLE posts ADD CONSTRAINT posts_user_id_foreign FOREIGN KEY(`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
