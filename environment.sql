CREATE TABLE `pe-environment`.characters
(
    id           int(11)      NOT NULL AUTO_INCREMENT,
    name         varchar(50)  NOT NULL,
    playerid     varchar(255) NOT NULL,
    phone_number varchar(255) DEFAULT '',
    PRIMARY KEY (id)
)
    ENGINE = INNODB,
    AUTO_INCREMENT = 2,
    CHARACTER SET utf8mb4,
    COLLATE utf8mb4_general_ci;

CREATE TABLE `pe-environment`.user
(
    id         int(11)      NOT NULL AUTO_INCREMENT,
    identifier varchar(255) NOT NULL,
    username   varchar(255) NOT NULL,
    PRIMARY KEY (id)
)
    ENGINE = INNODB,
    AUTO_INCREMENT = 2,
    AVG_ROW_LENGTH = 16384,
    CHARACTER SET utf8mb4,
    COLLATE utf8mb4_general_ci;