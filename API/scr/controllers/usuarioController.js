const { json } = require("express");
var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha
                        });
                                
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var dtNasc = req.body.dtNascServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cep = req.body.cepServer;
    var rua = req.body.ruaServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var classes = req.body.listaClassesServer;
    var especialidades = req.body.listaEspecialidadesServer;
    var unidade = req.body.unidadeServer;
    var cargo = req.body.cargoServer;

    console.log('Unidade: ' + unidade)

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, dtNasc, telefone, email, senha, cep, rua, numero, complemento, bairro, cidade, estado, classes, especialidades, unidade, cargo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }

            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarCargos() {
    usuarioModel.buscarCargos()
        .then(res => {  
            return res;
        }).catch(erro => {
            console.log(erro);
            console.log("houve um erro de busca");
        });
}


function buscarUnidades() {
    usuarioModel.buscarUnidades()
        .then(res => {
            return res;
        }).catch(erro => {
            console.log(erro);
            console.log("houve um erro de busca!");
            return erro;
        });
}

function buscarEspecialidades() {
    usuarioModel.buscarEspecialidades()
        .then(res => {
            return res;
        }).catch(erro => {
            console.log(erro);
            console.log("houve um erro de cadastro!");
            return erro;
        });
}

function buscarClasses() {
    usuarioModel.buscarClasses()
        .then(res => {
            return res;
        }).catch(erro => {
            console.log(erro);
            console.log("houve um erro de cadastro!");
            return erro;
        });
}

module.exports = {
    autenticar,
    buscarCargos,
    cadastrar,
    buscarUnidades,
    buscarEspecialidades,
    buscarClasses
}