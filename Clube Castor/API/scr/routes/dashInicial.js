var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/dashInicialController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/buscarLeads", function (req, res) {
    usuarioController.buscarLeads(req, res);
})

router.get("/buscarInfoGrafic", function (req, res) {
    usuarioController.buscarInfoGrafic(req, res);
});

module.exports = router; 