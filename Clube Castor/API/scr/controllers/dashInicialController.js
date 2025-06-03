const { json } = require("express");
var dashQuiz = require("../models/dashInicial");


function buscarLeads(req, res) {
  var idUser = req.query.idUsuario;

  dashQuiz.buscarLeads(1).then((resultado) => {
    res.status(200).json(resultado);
  }).catch(error => {
    res.status(404).json(error.sqlMessage);
  });
}

  function buscarInfoGrafic(req, res) {
    dashQuiz.buscarInfoGrafic().then((resultado) => {
      res.status(200).json(resultado);
    }).catch(error => {
      res.status(500).json(error.sqlMessage);
    });
  }

    function buscarHistoricoLogin(req, res) {
    dashQuiz.buscarHistoricoLogin().then((resultado) => {
      res.status(200).json(resultado);
    });
  }

  module.exports = {
    buscarLeads,
    buscarInfoGrafic,
    buscarHistoricoLogin
  };