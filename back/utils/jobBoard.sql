-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 22 oct. 2023 à 23:44
-- Version du serveur : 10.6.12-MariaDB-0ubuntu0.22.04.1
-- Version de PHP : 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jobBoard`
--

-- --------------------------------------------------------

--
-- Structure de la table `Advertisements`
--

CREATE TABLE `Advertisements` (
  `AdvertisementID` int(11) NOT NULL,
  `CompanyID` int(11) DEFAULT NULL,
  `JobTitle` varchar(30) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `SkillsRequired` text DEFAULT NULL,
  `SalaryOffered` decimal(10,2) DEFAULT NULL,
  `LanguagesRequired` text DEFAULT NULL,
  `PostedDate` date DEFAULT NULL,
  `ExpirationDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Advertisements`
--

INSERT INTO `Advertisements` (`AdvertisementID`, `CompanyID`, `JobTitle`, `Description`, `SkillsRequired`, `SalaryOffered`, `LanguagesRequired`, `PostedDate`, `ExpirationDate`) VALUES
(1, 1, 'Développeur web en alternance.', 'On recherche quelqu\'un pour faire un site web en HTML, CSS, PHP.', 'HTML, CSS, PHP, JAVASCRIPT.', 2200.00, 'Anglais', '2023-10-10', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Companies`
--

CREATE TABLE `Companies` (
  `CompanyID` int(11) NOT NULL,
  `CompanyName` varchar(30) NOT NULL,
  `EmailAddress` varchar(20) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `AdvertisementCount` int(11) DEFAULT 0,
  `Password` varchar(100) NOT NULL,
  `PasswordConfirm` varchar(100) NOT NULL,
  `Presentation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Companies`
--

INSERT INTO `Companies` (`CompanyID`, `CompanyName`, `EmailAddress`, `Phone`, `AdvertisementCount`, `Password`, `PasswordConfirm`, `Presentation`) VALUES
(1, 'Company Name Test 1', 'test1@gmail.com', '+33 1 23 45 67 89', 0, '', '', ''),
(2, 'Company Name Test 2', 'test2@gmail.com', '+33 1 23 45 67 89', 0, '', '', ''),
(119, 'lol', 'lol@gmail.com', '0123456789', 0, '$2b$10$rHr7DKDBuwdA03E1c0eOXuiPdj4VksQFpq0EiYnEKp6PJw/H1OnL6', '$2b$10$xz0y4S2lbRvrrciPPucy0OPl4vJOSmjkcMYvC1W/Xo9IquYLQE6tu', 'Ceci est une présentation de lol.');

-- --------------------------------------------------------

--
-- Structure de la table `JobApplications`
--

CREATE TABLE `JobApplications` (
  `ApplicationID` int(11) NOT NULL,
  `AdvertisementID` int(11) DEFAULT NULL,
  `ApplicantUserID` int(11) DEFAULT NULL,
  `ApplicationDate` date DEFAULT NULL,
  `Status` enum('Pending','Reviewed','Accepted','Rejected') DEFAULT NULL,
  `Notes` text DEFAULT NULL,
  `EmailsSent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(20) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `Email` varchar(20) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `PasswordConfirm` varchar(100) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Age` int(11) NOT NULL,
  `JobTitle` varchar(30) DEFAULT NULL,
  `JobSeekers` tinyint(1) DEFAULT NULL,
  `Admin` tinyint(1) DEFAULT NULL,
  `Skills` text DEFAULT NULL,
  `DesiredSalary` int(11) DEFAULT NULL,
  `LanguagesSpoken` text DEFAULT NULL,
  `ProfilVisibility` tinyint(1) DEFAULT NULL,
  `ApplicationStatus` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`UserID`, `FirstName`, `LastName`, `Email`, `Password`, `PasswordConfirm`, `Phone`, `Age`, `JobTitle`, `JobSeekers`, `Admin`, `Skills`, `DesiredSalary`, `LanguagesSpoken`, `ProfilVisibility`, `ApplicationStatus`) VALUES
(12, 'Roman', 'Kiziltoprak', 'test@gmail.com', '$2b$10$Aoie9RvAe/mNBflb9EvxhOp8swn6wl7D6mhluDoQ9BOX6Sz8WH7Wq', '$2b$10$rOkMR1CnMjFejuihx8zyiekY/SmMXODa0ST1uSGYmmtWzc//Q4/RK', '0123456789', 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Advertisements`
--
ALTER TABLE `Advertisements`
  ADD PRIMARY KEY (`AdvertisementID`),
  ADD KEY `fk_company` (`CompanyID`);

--
-- Index pour la table `Companies`
--
ALTER TABLE `Companies`
  ADD PRIMARY KEY (`CompanyID`);

--
-- Index pour la table `JobApplications`
--
ALTER TABLE `JobApplications`
  ADD PRIMARY KEY (`ApplicationID`),
  ADD KEY `fk_advertisement` (`AdvertisementID`),
  ADD KEY `fk_applicant` (`ApplicantUserID`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Advertisements`
--
ALTER TABLE `Advertisements`
  MODIFY `AdvertisementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Companies`
--
ALTER TABLE `Companies`
  MODIFY `CompanyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT pour la table `JobApplications`
--
ALTER TABLE `JobApplications`
  MODIFY `ApplicationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Advertisements`
--
ALTER TABLE `Advertisements`
  ADD CONSTRAINT `fk_company` FOREIGN KEY (`CompanyID`) REFERENCES `Companies` (`CompanyID`);

--
-- Contraintes pour la table `JobApplications`
--
ALTER TABLE `JobApplications`
  ADD CONSTRAINT `fk_advertisement` FOREIGN KEY (`AdvertisementID`) REFERENCES `Advertisements` (`AdvertisementID`),
  ADD CONSTRAINT `fk_applicant` FOREIGN KEY (`ApplicantUserID`) REFERENCES `Users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
