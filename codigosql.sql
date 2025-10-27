CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    tem_privilegios_de_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE Sala (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE Microcontrolador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sala_id INT NOT NULL,
    status ENUM('livre', 'ocupado', 'manutencao') DEFAULT 'livre',
    FOREIGN KEY (sala_id) REFERENCES Sala(id)
);

CREATE TABLE Agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    sala_id INT NOT NULL,
    horario_inicio DATETIME NOT NULL,
    horario_fim DATETIME NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (sala_id) REFERENCES Sala(id)
);