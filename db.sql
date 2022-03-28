CREATE DATABASE nest;
USE nest;

CREATE TABLE `user` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL DEFAULT '',
  `last_name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_uk` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `group` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_uk` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `scope` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `group_scope` (
  `group_id` smallint(5) unsigned NOT NULL,
  `scope_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`group_id`, `scope_id`),
  CONSTRAINT `group_scope_group_id_fk` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`),
  CONSTRAINT `group_scope_scope_id_fk` FOREIGN KEY (`scope_id`) REFERENCES `scope`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `group_user` (
  `group_id` smallint(5) unsigned NOT NULL,
  `user_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`group_id`, `user_id`),
  CONSTRAINT `group_user_group_id_fk` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`),
  CONSTRAINT `group_user_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`email`, `first_name`, `last_name`)
VALUES
("nest1@test.com", "nest", "1"),
("nest2@test.com", "nest", "2"),
("nest3@test.com", "nest", "3"),
("nest4@test.com", "nest", "4"),
("nest5@test.com", "nest", "5");

SELECT * FROM user;

INSERT INTO `group` (`name`, `description`)
VALUES
("Nest Admin", "All admin folks"),
("Nest Read Only", "All read only");

SELECT * FROM `group`;

INSERT INTO `scope` (`name`, `description`)
VALUES
("users.read", "Users read only"),
("users.manage", "Users manage");

SELECT * FROM scope;

INSERT INTO `group_scope` (`group_id`, `scope_id`)
VALUES
(1, 1),
(1, 2),
(2, 2);

SELECT group_id, scope_id, g.name AS group_name, scope.name AS scope_name 
FROM group_scope 
JOIN `group` as g 
  ON group_scope.group_id = g.id 
JOIN scope 
  ON group_scope.scope_id = scope.id;

INSERT INTO `group_user` (`group_id`, `user_id`) 
VALUES
(1, 1),
(2, 2);

SELECT group_id, user_id, g.name AS group_name, user.email AS user_email, user.first_name as user_first_name, user.last_name as user_last_name
FROM group_user
JOIN `group` as g
  ON group_user.group_id = g.id
JOIN user
  ON group_user.user_id = user.id;
