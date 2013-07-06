# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.29)
# Database: invoicer
# Generation Time: 2013-07-06 06:59:47 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table clients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postcode` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;

INSERT INTO `clients` (`id`, `name`, `address`, `city`, `postcode`)
VALUES
	(20,'George Czabania','15 Arthur Street','Rotorua','3010');

/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table invoices
# ------------------------------------------------------------

DROP TABLE IF EXISTS `invoices`;

CREATE TABLE `invoices` (
  `id` int(11) unsigned NOT NULL,
  `clientId` int(11) unsigned DEFAULT NULL,
  `date` date DEFAULT NULL,
  `customer` varchar(100) DEFAULT NULL,
  `site` varchar(100) DEFAULT '',
  `cost` float DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clientId` (`clientId`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;

INSERT INTO `invoices` (`id`, `clientId`, `date`, `customer`, `site`, `cost`, `paid`)
VALUES
	(7300,20,'2013-02-02','George Czabania','15 Arthur Street',200,0);

/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table rows
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rows`;

CREATE TABLE `rows` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL DEFAULT '',
  `number` int(11) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table snippets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `snippets`;

CREATE TABLE `snippets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table tables
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tables`;

CREATE TABLE `tables` (
  `invoiceId` int(11) unsigned NOT NULL,
  `rowId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`invoiceId`,`rowId`),
  KEY `rowId` (`rowId`),
  CONSTRAINT `tables_ibfk_2` FOREIGN KEY (`rowId`) REFERENCES `rows` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tables_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
