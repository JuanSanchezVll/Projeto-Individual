const { json } = require("express");
var dashQuiz = require("../models/dashInicial");


function buscarLeads(req, res) {
  var idUser = req.query.idUsuario;

  dashQuiz.buscarLeads(idUser).then((resultado) => {
    res.status(200).json(resultado);
  });

  function buscarInfoGrafic(req, res) {
    var cnpj = req.query.cnpj;

    dashQuiz.buscarInfoGrafic(cnpj).then((resultado) => {
      res.status(200).json(resultado);
    });
  }

  module.exports = {
    buscarLeads,
    buscarInfoGrafic
  };

}