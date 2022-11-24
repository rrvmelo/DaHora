const express = require("express");
const { eAdmin } = require("./middlewares/auth");
const { ePass } = require("./middlewares/valid");

const AuthController = require("./controllers/AuthController");
const PassController = require("./controllers/PassController");
const OccupationController = require("./controllers/OccupationController");
const UserController = require("./controllers/UserController");
const BenefitController = require("./controllers/BenefitController");
const RecordController = require("./controllers/RecordController");
const routes = express.Router();

/*Adicionar o eAdmin*/
//Autenticação para uso da aplicação
routes.post("/auth", AuthController.store);
//Função do usuário na empresa
routes.get("/occupations", OccupationController.index);
routes.get("/occupations/:occupationId/", OccupationController.indexs);
routes.post("/occupations", OccupationController.store);
routes.put("/occupations/:occupationId/", OccupationController.update);
routes.delete("/occupations", OccupationController.delete);
//*****Usuários
routes.get("/users", UserController.index);
routes.get("/users/:userId/", UserController.indexs);
routes.post("/users", UserController.store);
routes.put("/users", UserController.update);
//Nova senha com autenticação
routes.post("/forgotpass", PassController.validator);
routes.put("/forgotpass/:userId/", ePass, PassController.update);
//*****Beneficios
routes.get("/benefits", BenefitController.index); //Get Geral
routes.get("/benefits/:benefitId/", BenefitController.indexs); //Get por id do beneficio
routes.get("/benefits/:userId/", BenefitController.indexId); //Get beneficio x usuario
routes.put("/benefits/:benefitId/", BenefitController.update); //Put atualiza beneficio
routes.post("/benefits", BenefitController.store); //Post novo beneficio
routes.post("/benefits", BenefitController.storeId); //Vincula beneficio ao usuario
routes.delete("/benefits", BenefitController.delete); //Delete beneficio
routes.delete("/benefits/:userId/", BenefitController.deleteId); //Delete beneficio x usuario
//*****Registros para calculo de beneficios
routes.get("/records", RecordController.index);
routes.post("/records", RecordController.store); /*Não adicionar o eAdmin*/
//Relação registro x usuários
routes.get("/users/:userId/records/", RecordController.indexId);
//Beneficios x Usuários
routes.get("/users/:userId/benefits/", BenefitController.indexId);
routes.post("/users/:userId/benefits/", BenefitController.storeId);
routes.delete("/users/:userId/benefits/", BenefitController.deleteId);

module.exports = routes;
