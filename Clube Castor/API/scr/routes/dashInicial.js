var express = require("express");
var router = express.Router();

var dataInicialController = require("../controllers/dashInicialController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/buscarLeads/:idUsuario", function (req, res) {
    dataInicialController.buscarLeads(req, res);
})

router.get("/buscarInfoGrafic", function (req, res) {
    dataInicialController.buscarInfoGrafic(req, res);
});

router.get("/buscarHistorico", function (req, res) {
    dataInicialController.buscarHistoricoLogin(req, res);
});

module.exports = router; 