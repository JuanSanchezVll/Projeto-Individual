const { json } = require("express");
var dashQuiz = require("../models/dashQuiz");


function insertInfoQuiz(req, res) {
  var cnpj = req.query.cnpj;

  dashQuiz.insertInfoQuiz(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}


function buscarQtdAcertos(req, res) {
  var cnpj = req.query.cnpj;

  dashQuiz.buscarQtdAcertos(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}


function buscarQtdErros(req, res) {
  var cnpj = req.query.cnpj;

  dashQuiz.buscarQtdErros(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}


function buscarNumeroJogadores(req, res) {
  var cnpj = req.query.cnpj;

  dashQuiz.buscarNumeroJogadores(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarDadosQuizPorUsuario(req, res) {
  var cnpj = req.query.cnpj;

  dashQuiz.buscarDadosQuizPorUsuario(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  insertInfoQuiz,
  buscarQtdAcertos,
  buscarQtdErros,
  buscarNumeroJogadores,
  buscarDadosQuizPorUsuario
};
