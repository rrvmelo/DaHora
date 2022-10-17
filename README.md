### DaHora
Projeto Integrador III


Instalar todas as dependencias indicada pelo package.json
### npm install 


Com o Banco de dados MySql instalado verifique ou altere as configurações de acesso do banco em 
### src/config/database.js


Após atualizar as informações, crie o banco através do projedo com o comando
### npx sequelize db:create


Posteriormente crie as tabelas através do comando
### npx sequelize db:migrate


Para rodar o projeto execute
### npm start
