const connect	= require('../../model/database');

connect.connect();

connect.query("DROP TABLE IF EXISTS users;");

connect.query("CREATE TABLE `users` ( \
  `id` int(11) NOT NULL AUTO_INCREMENT, \
  `mail` varchar(255) NOT NULL, \
  `login` varchar(255) DEFAULT NULL, \
  `password` varchar(255) NOT NULL, \
  `name` varchar(255) DEFAULT NULL, \
  `first_name` varchar(255) NOT NULL, \
  `age` int(11) DEFAULT NULL, \
  `gender` varchar(255) NOT NULL, \
  `preferences` varchar(255) NOT NULL, \
  `bio` varchar(255) NOT NULL, \
  `interests` varchar(255) NOT NULL, \
  `photos` longtext DEFAULT NULL, \
  PRIMARY KEY (`id`) \
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;");



connect.query("INSERT INTO `users` (`id`, `mail`, `login`, `password`, `name`, `first_name`, `age`, `gender`, `preferences`, `bio`, `interests`, `photos`) VALUES \
(1, 'ogre181@hotmail.com', 'Dam', 'lol', 'Christophe', 'Damien', 25, 'M', 'F', 'I m a good developer', 'funny dogs', 'N/A'), \
(2, 'mjeannin@student.42.fr', 'Marine', 'lol', 'Jeannin', 'Marine', 22, 'F', 'MF', 'I m a great journalist :)', 'news', 'N/A'), \
(3, 'hmassonn@student.42.fr', 'Roberto Carlos', 'lol', 'Robert', 'Ophélie', 23, 'F', 'M', 'je bosse à Renault', 'handball', 'N/A');");

connect.end();
