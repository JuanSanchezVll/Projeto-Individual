var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha) 
    
    // var instrucaoSqlMembro = `
    //     SELECT ID as IdUsuario, nome, date(dtNasc) as dtNasc, telefone, email, senha 
    //     FROM membro 
    //     WHERE email = '${email}' AND senha = '${senha}';
    // `;

    var query = `SELECT ID as IdUsuario, Nome, Email, Telefone, Dt_Nascimento as DataNascimento, Senha, ID_CARGO as IdCargo, 
                        ID_UNIDADE as IdUnidade 
                FROM USUARIO
                WHERE Email = ${email} AND Senha = ${senha}`;

    console.log("Executando a instrução SQL: \n" + query);
    return database.executar(query);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
async function cadastrar(nome, dtNasc, telefone, email, senha, cep, rua, numero, complemento, bairro, cidade, estado, listaClasses, listaEspecialidades, unidade, cargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    try {

        var instrucaoSqlMembro = `
        INSERT INTO USUARIO (nome, email, telefone, Dt_nascimento, senha, id_cargo, id_unidade) VALUES ('${nome}', '${email}', '${telefone}', '${dtNasc}', '${senha}', ${idCargo}, ${idUnidade});
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSqlMembro);
        await database.executar(instrucaoSqlMembro);

        var queryEndereco = `INSERT INTO ENDERECO (CEP, LOGRADOURO, NUMERO, BAIRRO, CIDADE, ESTADO, COMPLEMENTO, ID_USUARIO) VALUES ('${cep}','${rua}','${numero}','${bairro}','${cidade}','${estado}','${complemento}',(select ID from USUARIO order by ID desc limit 1));`

        console.log("Executando a instrução SQL: \n" + queryEndereco);
        await database.executar(queryEndereco);

        var queryInsertClasse = `INSERT INTO USUARIO_CLASSE (ID_CLASSE, ID_USUARIO) VALUES`

        for(classe = 0; classe < listaClasses.length; classe++ )
        {
          if(!(classe == listaClasses.length -1)){
            queryInsertClasse += `((select idMembro from membro order by idMembro desc limit 1), ${listaClasses[classe]}),`;
          }
          queryInsertClasse += `((select idMembro from membro order by idMembro desc limit 1), ${listaClasses[classe]});`;
        }

        console.log("Executando a instrução SQL: \n" + queryInsertClasse);
        await database.executar(queryInsertClasse);

        
        var queryInsertEspecialidade = `INSERT INTO USUARIO_ESPECIALIDADE (ID_ESPECIALIDADE, ID_USUARIO) VALUES`

        for(classe = 0; classe < listaClasses.length; classe++ )
        {
          if(!(classe == listaClasses.length -1)){
            queryInsertClasse += `((select idMembro from membro order by idMembro desc limit 1), ${listaClasses[classe]}, NOW()),`;
          }
          queryInsertClasse += `((select idMembro from membro order by idMembro desc limit 1), ${listaClasses[classe]}, NOW());`;
        }

        console.log("Executando a instrução SQL: \n" + queryInsertEspecialidade);
        await database.executar(queryInsertEspecialidade);

        var instrucaoSqlEspecialidadeMembro = `INSERT INTO especialidadeMembro (fkMembro,fkEspecialidade) VALUES`

        for (var especialidadeAtual = 0; especialidadeAtual < listaEspecialidades.length; especialidadeAtual += 1) {

            if (especialidadeAtual == listaEspecialidades.length - 1) {
                instrucaoSqlEspecialidadeMembro += `
                ((select idMembro from membro order by idMembro desc limit 1), (select idEspecialidade from especialidade where nome = "${listaEspecialidades[especialidadeAtual]}"));
                `
            } else {
                instrucaoSqlEspecialidadeMembro += `
                ((select idMembro from membro order by idMembro desc limit 1), (select idEspecialidade from especialidade where nome = "${listaEspecialidades[especialidadeAtual]}")),
                `
            }
        }
        await database.executar(instrucaoSqlEspecialidadeMembro);

        console.log("Executando a instrução SQL: \n" + instrucaoSqlEspecialidadeMembro);

        var instrucaoSqlUnidadeMembro = `
    INSERT INTO unidadeMembro (fkMembro, fkUnidade, conselheiro, conselheiroAssociado) VALUES
    (   (select idMembro from membro order by idMembro desc limit 1), 
        (select idUnidade from unidade where nome = '${unidade}'),
        (select idMembro 
            from membro as membro
            join unidadeMembro as UMembro
                on UMembro.fkMembro = membro.Idmembro
            join unidade as unidade
                on UMembro.fkUnidade = unidade.idUnidade
            join cargoMembro as CMembro
                on CMembro.fkMembro = membro.idMembro
            join cargo as cargo
                on CMembro.fkCargo = cargo.idCargo
            where unidade.nome = '${unidade}' 
                and
            cargo.nome = 'Conselheiro'),
        (select idMembro 
            from membro as membro
            join unidadeMembro as UMembro
                on UMembro.fkMembro = membro.Idmembro
            join unidade as unidade
                on UMembro.fkUnidade = unidade.idUnidade
            join cargoMembro as CMembro
                on CMembro.fkMembro = membro.idMembro
            join cargo as cargo
                on CMembro.fkCargo = cargo.idCargo
            where unidade.nome = '${unidade}'
                and
            cargo.nome = 'Conselheiro Associado')
                );`

        return await database.executar(instrucaoSqlUnidadeMembro);
    } catch {
        return "Deu ruim"
    }
}

function buscarEndereco(idMembro) {
    var instrucaoSqlEndereco = `
        select concat(rua, ', ', numero, ', ', complemento, '-', bairro, '. CEP: ', cep, '. ', cidade, '/', estado) as endereco from endereco
        join membro
            on idMembro = fkMembro
        where idMembro = ${idMembro};`

    return database.executar(instrucaoSqlEndereco)
}

function buscarClasses(idMembro) {
    var instrucaoSqlClasse = `
    select classe.nome as nome from classe 
        join classeMembro as CMembro
            on classe.idClasse = CMembro.fkClasse
        join membro
            on membro.idMembro = CMembro.fkMembro
        where membro.IdMembro = '${idMembro}'`

        return database.executar(instrucaoSqlClasse)
}

function buscarEspecialidades(idMembro) {
    var instrucaoSqlEspecialidades = `
    select esp.nome as especialidade
    from especialidade as esp
    join especialidadeMembro as espMem
        on esp.idEspecialidade = espMem.fkEspecialidade
    join membro
        on membro.idMembro = espMem.fkMembro
    where idMembro = ${idMembro}`

    return database.executar(instrucaoSqlEspecialidades)
}

function buscarUnidade(idMembro) {
    var instrucaoSqlUnidade = `
    select unidade.nome from unidade 
        join unidadeMembro as UMembro
            on unidade.idUnidade = Umembro.fkUnidade
        join membro
            on membro.idMembro = UMembro.fkMembro
        where membro.idMembro = ${idMembro}`

    return database.executar(instrucaoSqlUnidade)
}

function buscarCargo(idMembro) {
    instrucaoSqlCargo = `
    select cargo.nome from cargo
        join cargoMembro as CMembro
            on cargo.Idcargo = CMembro.fkCargo
        join membro
            on membro.idMembro = CMembro.fkMembro
        where membro.idMembro = ${idMembro}`

    return database.executar(instrucaoSqlCargo)
}

function buscarQtdEspecialidades(idMembro) {
    var instrucaoSqlQtdEspecialidade = `select count(idEspecialidade) as qtdEspecialidades, month(dtRealizacao) as mes from membro 
    join EspecialidadeMembro as espMembro
        on membro.idMembro = espMembro.fkMembro
    join especialidade as esp
        on esp.idEspecialidade = fkEspecialidade 
    where idMembro = ${idMembro} and year(dtRealizacao) = 2024 group by month(dtRealizacao) order by mes;`

    return database.executar(instrucaoSqlQtdEspecialidade)
}

function buscarIntervalo(idMembro) {
    var instrucaoSqlIntervalo = `
                WITH Diferencas AS (
                    SELECT idMembro, DATEDIFF( dtRealizacao, LAG(dtRealizacao) OVER (PARTITION BY idMembro ORDER BY dtRealizacao)) AS diferencaDias
                    FROM 
                    membro
                    join EspecialidadeMembro as espMem
                    on membro.idMembro = espMem.fkMembro
                )
                SELECT 
                    idMembro,
                    AVG(diferencaDias) AS intervaloMedio
                FROM 
                    Diferencas
                WHERE 
                    diferencaDias IS NOT NULL
                AND 
                    idMembro = ${idMembro}
                GROUP BY 
                    idMembro;`

    return database.executar(instrucaoSqlIntervalo)
}

function buscarSequencia(idMembro) {
    var instrucaoSqlSequencia = `
        SELECT 
            membro.idMembro,
            especialidade,
            dtRealizacao,
            diferencas.diferencaDias
        FROM 
            (SELECT 
                espMem.fkMembro AS idMembro,
                espMem.dtRealizacao as dtRealizacao,
                e.nome as especialidade,
                DATEDIFF(espMem.dtRealizacao, LAG(espMem.dtRealizacao) OVER (PARTITION BY espMem.fkMembro ORDER BY espMem.dtRealizacao)) AS diferencaDias
            FROM 
                EspecialidadeMembro AS espMem
            JOIN 
                especialidade AS e ON espMem.fkEspecialidade = e.idEspecialidade
            ) AS diferencas
        JOIN 
            membro ON membro.idMembro = diferencas.idMembro
        WHERE 
            diferencas.idMembro = 1
            AND diferencas.diferencaDias < 30
        ORDER BY 
            diferencas.dtRealizacao;`

    database.executar(instrucaoSqlSequencia)

}

module.exports = {
    autenticar,
    cadastrar,
    buscarEndereco,
    buscarClasses,
    buscarEspecialidades,
    buscarUnidade,
    buscarCargo,
    buscarQtdEspecialidades,
    buscarIntervalo,
    buscarSequencia
};
