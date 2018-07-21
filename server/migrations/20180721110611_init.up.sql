CREATE TABLE `snippets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `shortcut` varchar(20) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `clients` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postcode` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `invoices` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `client` int(11) unsigned DEFAULT NULL,
 `number` varchar(10) DEFAULT '',
 `date` date DEFAULT NULL,
 `paid` tinyint(1) DEFAULT '0',
 `customer` varchar(100) DEFAULT NULL,
 `email` varchar(100) DEFAULT NULL,
 `site` varchar(100) DEFAULT NULL,
 `cost` decimal(8,2) DEFAULT '0.00',
 `labour` decimal(8,2) DEFAULT '0.00',
 `airmover` decimal(8,2) DEFAULT '0.00',
 `createdAt` timestamp NULL DEFAULT NULL,
 `updatedAt` timestamp NULL DEFAULT NULL,
 PRIMARY KEY (`id`),
 KEY `client` (`client`),
 CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`client`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `rows` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `invoice` int(11) unsigned DEFAULT NULL,
  `order` int(11) unsigned DEFAULT NULL,
  `type` int(1) unsigned DEFAULT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice` (`invoice`),
  CONSTRAINT `rows_ibfk_1` FOREIGN KEY (`invoice`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
