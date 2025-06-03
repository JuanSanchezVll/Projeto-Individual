-- CREATE DATABASE clube_Castor;

USE clube_castor;

SHOW DATABASES;

-- DROP database clube_castor;

-- MANUTENCAO

CREATE TABLE UNIDADE (
idUnidade INT PRIMARY KEY AUTO_INCREMENT,
NOME_UNIDADE VARCHAR(50),
QTD_MEMBROS INT,
GENERO VARCHAR(15)
);

INSERT INTO UNIDADE (NOME_UNIDADE, QTD_MEMBROS, GENERO) VALUES
('Leões', 8, 'M'),
('Guepardos', 8, 'M'),
('Panteras', 8, 'F'),
('Onças', 8, 'F');

DESCRIBE UNIDADE;

SELECT * FROM UNIDADE;

CREATE TABLE CARGO (
idCargo INT PRIMARY KEY AUTO_INCREMENT,
NOME VARCHAR(50),
AFAZERES VARCHAR(200)
);

INSERT INTO CARGO (NOME, AFAZERES) VALUES
('Diretor', 'Ser um exemplo e inspiração, insentivar os membros do Clube, manter a organização e Exercer uma boa comunicação | Ser responsavel Oficial'),
('Diretor Associado', 'Ser um exemplo e inspiração, insentivar os membros do Clube, manter a organização e Exercer uma boa comunicação'),
('Secretario', 'Adminstrar os documentos, solicitações, agendas e frequencia dos membros do Clube'),
('Tesoureiro', 'Administrar e Organizar as entradas e saídas do dinheiro do Clube'),
('Conselheiro', 'Liderar, Incentivar e cuidar da Unidade'),
('Conselheiro Associado', 'Apoio, Incentivar e cuidar da Unidade'),
('Instrutor', 'Ensinar e acompanhar os cadernos de classe e especialidades'),

('Capitão - Unidade', 'Ser um exemplo e inspiração, insentivar os membros da Unidade, manter a organização e Exercer uma boa comunicação'),
('Secretario - Unidade', 'Adminstrar os documentos, solicitações, agendas e frequencia dos membros da Unidade'),
('Tesoureiro - Unidade', 'Administrar e Organizar as entradas e saídas do dinheiro da Unidade'),
('Capelão - Unidade', 'Manter e incentivar o cuidado com a parte espiritual da Unidade');

SELECT * FROM CARGO;

-- USUARIO 

CREATE TABLE USUARIO (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
NOME VARCHAR(50),
EMAIL VARCHAR(100),
TELEFONE VARCHAR(11),
DT_NASCIMENTO DATE,
SENHA VARCHAR(15),
ID_CARGO INT,
ID_UNIDADE INT not NULL,
constraint fkcargo foreign key (ID_CARGO) 
references CARGO (idCargos),
constraint fkunidade foreign key (ID_UNIDADE) 
references UNIDADE (idUnidades)
);

SELECT * FROM USUARIO;
DROP TABLE USUARIO;


INSERT INTO USUARIO (NOME, EMAIL, TELEFONE, DT_NASCIMENTO, SENHA, ID_CARGO, ID_UNIDADE ) VALUES 
('Isabella Roxo', 'roxinho@gmail.com','11940028922', '2004-08-31','rouxinol@Me',2,3),
('Weslley Santos', 'wesley@gmail.com','11940028922', '2004-08-31','Senha@123',8,1),
('Maria Santos', 'mari@gmail.com','11940028922', '2004-08-31','Senha@123',5, NULL),
('Cintia Lima', 'luz@gmail.com','11940028922', '2004-08-31','Senha@123',1, NULL),
('Gevanildo Lima', 'jevas@gmail.com','11940028922', '2004-08-31','Senha@123',2, NULL),
('Lucas Cavalcante', 'luka@gmail.com','11940028922', '2004-08-31','Senha@123',2,2),
('Sara Mattos', 'sara@gmail.com','11940028922', '2004-08-31','Senha@123',3,4);


-- SELECT ID as IdUsuario, Nome, Email, Telefone, Dt_Nascimento as DataNascimento, Senha, ID_CARGO as IdCargo, ID_UNIDADE as IdUnidade 
-- FROM USUARIO
-- WHERE Email = ${email} AND Senha = ${senha};

CREATE TABLE ENDERECO (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
CEP VARCHAR(8),
LOGRADOURO VARCHAR(50),
NUMERO VARCHAR(10),
BAIRRO VARCHAR(8),
CIDADE VARCHAR(50),
ESTADO VARCHAR(8),
COMPLEMENTO VARCHAR(8) NULL,
ID_USUARIO INT,
FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(idUsuario)
);

DROP TABLE ENDERECO;

 -- INSERT INTO ENDERECO (CEP, LOGRADOURO, NUMERO, BAIRRO, CIDADE, ESTADO, COMPLEMENTO, ID_USUARIO) VALUES ('${cep}','${rua}','${numero}','${bairro}','${cidade}','${estado}','${}',${});
INSERT INTO ENDERECO (CEP, LOGRADOURO, NUMERO, BAIRRO, CIDADE, ESTADO, COMPLEMENTO, ID_USUARIO) VALUES
('06333890','Rua Jacarezinho', '2020','Cohab V', 'Carapicuíba', 'SP', null, 1),
('06333890','Rua Jacarezinho', '2020','Cohab V', 'Carapicuíba', 'SP', null, 2),
('06333890','Rua Jacarezinho', '200','Cohab V', 'Carapicuíba', 'SP', null, 3),
('06333890','Rua Jacarezinho', '2020','Cohab V', 'Carapicuíba', 'SP', null, 4),
('06333890','Rua Jacarezinho', '220','Cohab II', 'Carapicuíba', 'SP', null, 5),
('06333890','Rua Jacarezinho', '202','Cohab V', 'Carapicuíba', 'SP', null, 6),
('06333890','Rua Jacarezinho', '232','Cohab IV', 'Carapicuíba', 'SP', null, 7);

-- TABELAS AUXILIARES

CREATE TABLE CLASSES (
idClasses INT PRIMARY KEY AUTO_INCREMENT,
NOME_CLASSE VARCHAR(50)
);

INSERT INTO CLASSES (NOME_CLASSE) VALUES
('Amigo'),
('Companheiro'),
('Pesquisador'),
('Pioneiro'),
('Excursionista'),
('Guia'); 

SELECT * FROM CLASSES;

CREATE TABLE ESPECIALIDADES (
idEspecialidades INT PRIMARY KEY AUTO_INCREMENT,
NOME VARCHAR(100),
TIPO VARCHAR(100)
);

INSERT INTO ESPECIALIDADES (NOME, TIPO) VALUES
('Observação de aves', 'Natureza'),
('Árvores', 'Natureza'),
('Astronomia', 'Natureza'),
('Ecologia', 'Natureza'),
('Geologia', 'Natureza'),
('Acampamento', 'Atividades ao ar livre'),
('Orientação', 'Atividades ao ar livre'),
('Nós e amarras', 'Atividades ao ar livre'),
('Sobrevivência na selva', 'Atividades ao ar livre'),
('Caminhadas', 'Atividades ao ar livre'),
('Pintura em tecido', 'Artes e habilidades manuais'),
('Marcenaria', 'Artes e habilidades manuais'),
('Costura', 'Artes e habilidades manuais'),
('Cerâmica', 'Artes e habilidades manuais'),
('Artesanato com recicláveis', 'Artes e habilidades manuais'),
('Robótica', 'Ciência e tecnologia'),
('Programação', 'Ciência e tecnologia'),
('Eletricidade', 'Ciência e tecnologia'),
('Fotografia', 'Ciência e tecnologia'),
('Primeiros socorros', 'Saúde e serviço'),
('Voluntariado comunitário', 'Saúde e serviço'),
('Cuidados com idosos', 'Saúde e serviço'),
('Primeiros socorros', 'Saúde e serviço');

SELECT * FROM ESPECIALIDADES;

-- RELACIONAIS

CREATE TABLE USUARIO_CLASSE (
ID_CLASSE INT,
FOREIGN KEY (ID_CLASSE) REFERENCES CLASSES(idClasses),
ID_USUARIO INT,
FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(idUsuario),
DT_INCLUSAO DATE
);

INSERT INTO USUARIO_CLASSE (ID_CLASSE, ID_USUARIO, DT_INCLUSAO) VALUES
(1,1, NOW()),
(1,2, NOW()),
(1,3, NOW()),
(1,4, NOW()),
(1,5, NOW()),
(1,7, NOW()),
(2,1, NOW()),
(3,1, NOW()),
(4,3, NOW()),
(5,4, NOW()),
(6,1, NOW()),
(7,7, NOW());

SELECT * FROM USUARIO_CLASSE;


CREATE TABLE USUARIO_ESPECIALIDADE (
ID_ESPECIALIDADE INT,
ID_USUARIO INT,
DT_INCLUSAO DATE
);

INSERT INTO USUARIO_ESPECIALIDADE (ID_ESPECIALIDADE, ID_USUARIO, DT_INCLUSAO) VALUES
(1,1, NOW()),
(1,2, NOW()),
(1,3, NOW()),
(1,4, NOW()),
(1,5, NOW()),
(1,7, NOW()),
(2,1, NOW()),
(3,1, NOW()),
(4,3, NOW()),
(5,4, NOW()),
(6,1, NOW()),
(7,7, NOW());

-- MODELAGEM QUIZ

CREATE TABLE DADOS_QUIZ (
ID INT PRIMARY KEY AUTO_INCREMENT,
QT_ACERTOS INT,
QTD_ERROS INT,	
DATA_INCLUSAO DATE,
ID_USUARIO INT,
CONSTRAINT Fk_Usuario_quiz FOREIGN KEY (ID) REFERENCES USUARIO (IDUSUARIO)
);


SELECT COUNT(*) as Total FROM DADOS_QUIZ ;


CREATE TABLE HISTORICO_LOGIN (
ID INT PRIMARY KEY AUTO_INCREMENT,
LOGIN VARCHAR(20),
DT_LOGIN DATE
);

SELECT * FROM HISTORICO_LOGIN; 


-- CREATE TABLE QUIZ (
-- ID INT PRIMARY KEY AUTO_INCREMENT,
-- QT_ACERTOS INT,
-- DATA_INCLUSAO DATE,
-- ID_USUARIO INT FOREIGN KEY
-- )

-- CREATE TABLE QUESTOES_QUIZ (
-- ID INT PRIMARY KEY AUTO_INCREMENT,
-- PERGUNTAS VARCHAR(200)
-- ),