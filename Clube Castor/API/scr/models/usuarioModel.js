var database = require("../database/config");

function autenticar(email, senha) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)

 
 

    var query = `SELECT ID as IdUsuario, Nome, Email, Telefone, Dt_Nascimento as DataNascimento, Senha, ID_CARGO as IdCargo,

                        ID_UNIDADE as IdUnidade

                FROM USUARIO

                WHERE Email = ${email} AND Senha = ${senha}`; 

 

    console.log("Executando a instrução SQL: \n" + query);

    var result = database.executar(query);

 

    if(result != null){

        var queryHistorico = `INSERT INTO HISTORICO_LOGIN VALUES ('${email}, NOW()')`;

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

 

        var queryInsertEndereco = `INSERT INTO ENDERECO (CEP, LOGRADOURO, NUMERO, BAIRRO, CIDADE, ESTADO, COMPLEMENTO, ID_USUARIO) VALUES ('${cep}','${rua}','${numero}','${bairro}','${cidade}','${estado}','${complemento}',(select idUsuario from USUARIO order by ID desc limit 1));`

 

        console.log("Executando a instrução SQL: \n" + queryInsertEndereco);

        database.executar(queryInsertEndereco);

 

        var queryInsertClasse = `INSERT INTO USUARIO_CLASSE (ID_CLASSE, ID_USUARIO) VALUES`

 

        for(classe = 0; classe < listaClasses.length; classe++ )

        {

          if(!(classe == listaClasses.length -1)){

            queryInsertClasse += `((select idUsuario from USUARIO order by ID desc limit 1), ${listaClasses[classe]}, NOW()),`;

          }

          queryInsertClasse += `((select idUsuario from USUARIO order by ID desc limit 1), ${listaClasses[classe]}, NOW());`;

        }

 

        console.log("Executando a instrução SQL: \n" + queryInsertClasse);

        database.executar(queryInsertClasse);

 

       

        var queryInsertEspecialidade = `INSERT INTO USUARIO_ESPECIALIDADE (ID_ESPECIALIDADE, ID_USUARIO) VALUES`

 

        for(especialidade = 0; especialidade < listaEspecialidades.length; especialidade++ )
        {

          if(!(especialidade == listaEspecialidades.length -1)){

            queryInsertEspecialidade += `((select idUsuario from USUARIO order by ID desc limit 1), ${listaEspecialidades[especialidade]}, NOW()),`;

          }

          queryInsertEspecialidade += `((select idUsuario from USUARIO order by ID desc limit 1), ${listaEspecialidades[especialidade]}, NOW());`;

        }

 

        console.log("Executando a instrução SQL: \n" + queryInsertEspecialidade);

        database.executar(queryInsertEspecialidade);

    } catch {

        return "Deu ruim"

    }

}

 

module.exports = {

    autenticar,

    cadastrar

};