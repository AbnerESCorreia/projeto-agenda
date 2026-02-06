-- Criar o banco de dados do projeto
CREATE DATABASE minha_agenda;

-- Avisar ao MySQL que vamos usar esse banco
USE minha_agenda;

-- Criar a tabela com os campos que você pediu
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    horario_evento TIME NOT NULL,
    descricao TEXT
);