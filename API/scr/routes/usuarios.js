var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/cargos", function (res) {
    usuarioController.buscarCargos(res);
});

router.get("/unidades", function (res) {
    usuarioController.buscarUnidades(req, res);
});

router.get("/especialidades", function (res) {
    usuarioController.buscarEspecialidades(res);
});

router.get("/classes", function (res) {
    usuarioController.buscarClasses(res);
});

module.exports = router;