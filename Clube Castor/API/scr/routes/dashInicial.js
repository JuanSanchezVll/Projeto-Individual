var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/buscarLeads", function (req, res) {
    usuarioController.buscarLeads(req, res);
})

router.post("/buscarInfoGrafic", function (req, res) {
    usuarioController.buscarInfoGrafic(req, res);
});

module.exports = router;