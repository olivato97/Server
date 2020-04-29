
-- Creazione DataBase
CREATE DATABASE moschetto;

USE moschetto;

-- Tabella Persone
CREATE TABLE Persone (
	intIdPersona INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	strNHomePersona varchar(255) NULL,
	strCognomePersona varchar(255) NULL,
	strUsernamePersona varchar(255) NOT NULL,
	strPasswordPersona varchar(255) NOT NULL,
	strEmailPersona varchar(255) NULL,
	intSesso INT NULL,
	boolAttivo BIT NOT NULL DEFAULT 0,
	boolRegistrazioneConfermata BIT NOT NULL DEFAULT 0,
	boolLoginNoPassword BIT NOT NULL DEFAULT 0,
	dtaDataInserimento datetime NULL DEFAULT CURRENT_TIMESTAMP
);


-- Inserisco delle utenze di prova
INSERT INTO Persone (
	strUsernamePersona
) VALUES (
	'Moschetto'
);
INSERT INTO Persone (
	strUsernamePersona
) VALUES (
	'WhiteFeather'
);
INSERT INTO Persone (
	strUsernamePersona
) VALUES (
	'McKey97'
);


-- Tabella Permessi
CREATE TABLE Permessi (
	intIdPermesso INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	strNomePermesso varchar(255) NULL,
	strCodicePermesso varchar(255) NOT NULL,
	strPaginaCollegata varchar(255) NULL,
	boolAttivo BIT NOT NULL DEFAULT 0,
	dtaDataInserimento datetime NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Profili
CREATE TABLE Profili (
	intIdProfilo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	strNomeProfilo varchar(255) NULL,
	strCodiceProfilo varchar(255) NOT NULL,
	strPaginaCollegata varchar(255) NULL,
	boolAttivo BIT NOT NULL DEFAULT 0,
	dtaDataInserimento datetime NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabella ProfiliPermessi
CREATE TABLE ProfiliPermessi (
	intIdProfilo INT NOT NULL,
	intIdPermesso INT NOT NULL ,
	boolAttivo BIT NOT NULL DEFAULT 0,
	dtaDataInserimento datetime NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PK_ProfiliPermessi PRIMARY KEY (intIdProfilo, intIdPermesso)
);

-- Tabella PersonePermessi
CREATE TABLE PersonePermessi (
	intIdPersona INT NOT NULL,
	intIdPermesso INT NOT NULL,
	boolAttivo BIT NOT NULL DEFAULT 0,
	dtaDataInserimento datetime NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PK_PersonePermessi PRIMARY KEY (intIdPersona, intIdPermesso)
);

-- Tabella PersoneProfili
CREATE TABLE PersoneProfili (
	intIdPersona INT NOT NULL,
	intIdProfilo INT NOT NULL,
	boolAttivo BIT NOT NULL DEFAULT 0,
	dtaDataInserimento datetime NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT PK_PersoneProfili PRIMARY KEY (intIdPersona, intIdProfilo)
);

