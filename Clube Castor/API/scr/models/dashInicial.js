var database = require("../database/config");



function buscarLeads(idUsuario) {



    var query = `SELECT u.NOME, (SELECT NOME_CLASSE FROM CLASSES cla WHERE cla.ID_USUARIO = u.ID) as listaClasses, c.NOME as cargo, uni.NOME_UNIDADE as unidade,

(SELECT NOME FROM ESPECIALIDADES esp WHERE esp.ID_USUARIO = u.ID) as listaEspecialidades FROM USUARIO u

INNER JOIN CARGOS c ON u.ID = c.ID_CARGO

INNER JOIN UNIDADE uni ON u.ID = uni.ID_UNIDADE

WHERE u.ID = ${idUsuario} ;`;


    return database.executar(query);

}

function buscarInfoGrafic() {
    var query = `SELECT NOME_CLASSE as nome, COUNT(uc.ID_USUARIO) as quantidade FROM CLASSES c INNER JOIN USUARIO_CLASSE uc ON c.ID = uc.ID_CLASSE;`;
    return database.executar(query);
}




module.exports = {

    buscarLeads,
    buscarInfoGrafic

};