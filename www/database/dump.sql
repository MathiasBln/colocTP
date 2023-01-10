CREATE TABLE IF NOT EXISTS colocGroup
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    proprioID INT NOT NULL
);

CREATE TABLE IF NOT EXISTS users
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    coloc_id INT,
    CONSTRAINT FK_coloc 
      FOREIGN KEY (coloc_id) REFERENCES colocGroup (id)
);

CREATE TABLE IF NOT EXISTS expense
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
  	cost INT Not NULL,
    coloc_id INT,
    CONSTRAINT FK_colocID
      FOREIGN KEY (coloc_id) REFERENCES colocGroup (id)
);

-- EXPENSE <-> USER --
create table expense_user_junction
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  expense_id int,
  user_id int,
  CONSTRAINT FK_expense 
      FOREIGN KEY (expense_id) REFERENCES expense (id),
  CONSTRAINT FK_user 
      FOREIGN KEY (user_id) REFERENCES users (id)
);



