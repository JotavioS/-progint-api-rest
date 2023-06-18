CREATE TABLE `funcionarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) NOT NULL,
  `sobrenome` varchar(250) NOT NULL,
  `salario` decimal(10,2) NOT NULL,
  `data_nascimento` date NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `funcionario_projeto` (
  `projeto_id` int(11) NOT NULL,
  `funcionario_id` int(11) NOT NULL,
  PRIMARY KEY (`projeto_id`,`funcionario_id`)
);

CREATE TABLE `projetos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_termino` date DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `responsavel` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `funcionario_projeto`
  ADD CONSTRAINT `fk_empregado` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_projeto` FOREIGN KEY (`projeto_id`) REFERENCES `projetos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `projetos`
  ADD CONSTRAINT `fk_responsavel` FOREIGN KEY (`responsavel`) REFERENCES `funcionarios` (`id`) ON DELETE SET NULL;