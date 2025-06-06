var express = require("express");
var router = express.Router();

var quizController = require("../controllers/dashQuizController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/insertInfoQuiz", function (req, res) {
    quizController.insertInfoQuiz(req, res);
})

router.get("/buscarQtdAcertos", function (req, res) {
    quizController.buscarInfoGrafic(req, res);
});

router.get("/buscarQtdErros", function (req, res) {
    quizController.buscarInfoGrafic(req, res);
});


router.get("/buscarNumeroJogadores", function (req, res) {
    quizController.buscarInfoGrafic(req, res);
});

router.get("/buscarDadosQuizPorUsuario", function (req, res) {
    quizController.buscarInfoGrafic(req, res);
});

module.exports = router;