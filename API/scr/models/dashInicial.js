var database = require("../database/config");



function buscarLeads(idUsuario) {
    var query = `SELECT u.NOME as Nome, 
(SELECT NOME_CLASSE FROM CLASSES cla INNER JOIN USUARIO_CLASSE cu ON cu.ID_USUARIO = u.IdUSUARIO LIMIT 1) as classe, 
c.NOME as cargo, 
uni.NOME_UNIDADE as unidade,
(SELECT NOME FROM ESPECIALIDADES esp INNER JOIN USUARIO_ESPECIALIDADE eu ON eu.ID_USUARIO = u.IdUsuario LIMIT 1) as especialidade 
FROM USUARIO u
INNER JOIN CARGO c ON u.IDUSUARIO = c.IDCARGO
INNER JOIN UNIDADES uni ON u.IDUSUARIO = uni.IDUNIDADES
WHERE u.IDUSUARIO = ${idUsuario} ;`;


    return database.executar(query);

}

function buscarInfoGrafic() {
    var query = `SELECT DISTINCT c.NOME_CLASSE AS nome, 
       COUNT(uc.ID_USUARIO) AS quantidade
FROM CLASSES c
INNER JOIN USUARIO_CLASSE uc ON c.IDClasses = uc.ID_CLASSE
GROUP BY c.NOME_CLASSE;`;
    return database.executar(query);
}

function buscarHistoricoLogin(){
        var query = `SELECT DISTINCT LOGIN, DT_LOGIN as DataLogin FROM HISTORICO_LOGIN ORDER BY DT_LOGIN DESC;`;
    return database.executar(query);
}




module.exports = {

    buscarLeads,
    buscarInfoGrafic,
    buscarHistoricoLogin

};