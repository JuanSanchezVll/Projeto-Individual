var database = require("../database/config");



function insertInfoQuiz(qtd_acertos, qtd_erros, idUsuario) {

    var query = `INSERT INTO DADOS_QUIZ VALUES (${qtd_acertos}, ${qtd_erros}, NOW(), ${idUsuario});`;

    database.executar(query);

}



function buscarQtdAcertos(idUsuario) {

    var query = `SELECT SUM(QTD_ACERTOS) as Total FROM DADOS_QUIZ WHERE ID_USUARIO = ${idUsuario};`;

    return database.executar(query);

}



function buscarQtdErros(idUsuario) {

    var query = `SELECT SUM(QTD_ERROS) as Total FROM DADOS_QUIZ WHERE ID_USUARIO = ${idUsuario};`;

    return database.executar(query);

}



function buscarNumeroJogadores() {

    var query = `SELECT COUNT(*) FROM DADOS_QUIZ WHERE ID_USUARIO DISTINCT;`;

    return database.executar(query);

}



function buscarDadosQuizPorUsuario(idUsuario) {

    var query = `SELECT QTD_ACERTOS as acertos, QTD_ERROS as erros, DATA_INCLUSAO as data FROM DADOS_QUIZ WHERE ID_USUARIO = ${idUsuario};`;

    return database.executar(query);

}



module.exports = {

    insertInfoQuiz,

    buscarQtdAcertos,

    buscarQtdErros,

    buscarNumeroJogadores,

    buscarDadosQuizPorUsuario

};