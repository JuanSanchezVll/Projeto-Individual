var database = require("../database/config");

function autenticar(email, senha) {

  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)




  var query = `SELECT IdUsuario, Nome, Email, Telefone, Dt_Nascimento as DataNascimento, Senha, IdCargo, IdUnidades
               FROM USUARIO
               WHERE Email = '${email}' AND Senha = '${senha}'`;



  console.log("Executando a instrução SQL: \n" + query);

  var result = database.executar(query);



  if ( result != null && result.length > 0) {

    var queryHistorico = `INSERT INTO HISTORICO_LOGIN (LOGIN, DT_LOGIN) VALUES ('${email}', NOW())`;

    database.executar(queryHistorico);

  }



  return result;

}



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql

async function cadastrar(nome, dtNasc, telefone, email, senha, cep, rua, numero, complemento, bairro, cidade, estado, listaClasses, listaEspecialidades, idUnidade, idCargo) {

  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);



  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores

  //  e na ordem de inserção dos dados.

  try {



    var queryInsertUsuario = `

        INSERT INTO USUARIO (nome, email, telefone, Dt_nascimento, senha, id_cargo, id_unidade) VALUES ('${nome}', '${email}', '${telefone}', '${dtNasc}', '${senha}', ${idCargo}, ${idUnidade});

        `;



    console.log("Executando a instrução SQL: \n" + queryInsertUsuario);

    database.executar(queryInsertUsuario);



    var queryInsertEndereco = `INSERT INTO ENDERECO (CEP, LOGRADOURO, NUMERO, BAIRRO, CIDADE, ESTADO, COMPLEMENTO, ID_USUARIO) VALUES ('${cep}','${rua}','${numero}','${bairro}','${cidade}','${estado}','${complemento}',(select idUsuario from USUARIO order by idUsuario desc limit 1));`



    console.log("Executando a instrução SQL: \n" + queryInsertEndereco);

    database.executar(queryInsertEndereco);



    var queryInsertClasse = `INSERT INTO USUARIO_CLASSE (ID_CLASSE, ID_USUARIO, DT_INCLUSAO) VALUES`



    for (classe = 0; classe < listaClasses.length; classe++) {

      if (!(classe == listaClasses.length - 1)) {

        queryInsertClasse += `(${listaClasses[classe++]}, (select idUsuario from USUARIO order by idUsuario desc limit 1), NOW()),`;

      }

      queryInsertClasse += `(${listaClasses[classe++]}, (select idUsuario from USUARIO order by idUsuario desc limit 1), NOW());`;

    }



    console.log("Executando a instrução SQL: \n" + queryInsertClasse);

    database.executar(queryInsertClasse);





    var queryInsertEspecialidade = `INSERT INTO USUARIO_ESPECIALIDADE (ID_ESPECIALIDADE, ID_USUARIO, DT_INCLUSAO) VALUES`



    for (especialidade = 0; especialidade < listaEspecialidades.length; especialidade++) {

      if (!(especialidade == listaEspecialidades.length - 1)) {

        queryInsertEspecialidade += `(${listaEspecialidades[especialidade++]}, (select idUsuario from USUARIO order by idUsuario desc limit 1), NOW()),`;

      }

      queryInsertEspecialidade += `(${listaEspecialidades[especialidade++]},(select idUsuario from USUARIO order by idUsuario desc limit 1), NOW());`;

    }



    console.log("Executando a instrução SQL: \n" + queryInsertEspecialidade);

    database.executar(queryInsertEspecialidade);

  } catch {

    return "Deu ruim"

  }

}

function buscarCargos() {
  debugger;
  var query = `SELECT IDCARGO as Id, NOME, AFAZERES FROM CARGO`;
  return database.executar(query);
}


function buscarUnidades() {
  var query = `SELECT idUnidades as Id, NOME_UNIDADE as Nome, QTD_MEMBROS, GENERO FROM UNIDADES`;
  return database.executar(query);
}

function buscarEspecialidades() {
  var query = `SELECT IDespecialidades as Id, NOME, TIPO FROM ESPECIALIDADES`;
  return database.executar(query);
}

function buscarClasses() {
  var query = `SELECT IDClasses as Id, NOME_CLASSE FROM CLASSES`;
  return database.executar(query);
}

module.exports = {
  autenticar,
  buscarCargos,
  cadastrar,
  buscarUnidades,
  buscarEspecialidades,
  buscarClasses
};