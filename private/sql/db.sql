-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Sep 29, 2017 at 09:25 AM
-- Server version: 5.7.19
-- PHP Version: 7.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matcha`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `preferences` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `interests` varchar(255) NOT NULL,
  `photos` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `name`, `first_name`, `age`, `gender`, `preferences`, `bio`, `interests`, `photos`) VALUES
(1, '', 'Gislaine', '', 64, '', '', '', '', ''),
(2, '', 'Christophe', 'Damien', 25, 'M', 'F', 'I\'m a good developer', 'funny dogs', 'N/A'),
(3, '', 'Jeannin', 'Marine', 22, 'F', 'MF', 'I\'m a great journalist :)', 'news', 'N/A'),
(4, '', 'Robert', 'Ophélie', 23, 'F', 'M', 'je bosse à Renault', 'handball', 'N/A');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
