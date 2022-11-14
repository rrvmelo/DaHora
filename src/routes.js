const express = require("express");
const { eAdmin } = require("./middlewares/auth");

const AuthController = require("./controllers/AuthController");
const OccupationController = require("./controllers/OccupationController");
const UserController = require("./controllers/UserController");
const BenefitController = require("./controllers/BenefitController");
const RecordController = require("./controllers/RecordController");
const routes = express.Router();

/*Adicionar o eAdmin*/

routes.post("/auth", AuthController.store);

routes.get("/occupations", OccupationController.index); /*Adicionar o eAdmin*/
routes.post("/occupations", OccupationController.store); /*Adicionar o eAdmin*/
routes.put("/occupations", OccupationController.update); /*Adicionar o eAdmin*/
routes.delete("/occupations", OccupationController.delete);/*Adicionar o eAdmin*/

routes.get("/users", UserController.index); /*Adicionar o eAdmin*/
routes.get("/users/:userId/", UserController.indexs); /*Adicionar o eAdmin*/ 
routes.post("/users", UserController.store); /*Adicionar o eAdmin*/
routes.put("/users", UserController.update); /*Adicionar o eAdmin*/

routes.get("/benefits", BenefitController.index); /*Adicionar o eAdmin*/
routes.post("/benefits", BenefitController.store); /*Adicionar o eAdmin*/
routes.put("/benefits", BenefitController.update); /*Adicionar o eAdmin*/
routes.delete("/benefits", BenefitController.delete); /*Adicionar o eAdmin*/

routes.get("/records", RecordController.index); /*Adicionar o eAdmin*/
routes.post("/records", RecordController.store);

routes.get("/users/:userId/records/", RecordController.indexId); /*Adicionar o eAdmin*/

routes.get("/users/:userId/benefits/", BenefitController.indexId); /*Adicionar o eAdmin*/
routes.post("/users/:userId/benefits/", BenefitController.storeId); /*Adicionar o eAdmin*/
routes.delete("/users/:userId/benefits/", BenefitController.deleteId); /*Adicionar o eAdmin*/


module.exports = routes;
