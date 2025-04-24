/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 10/04/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config')

//Import do DAO para realizar um CRUD no banco de dados
const empresaDAO = require('../../model/DAO/empresa.js')
const { deserializeRawResult } = require('@prisma/client/runtime/library')

//Função para inserir uma nova empresa
const inserirEmpresa = async function (empresa,contentType) {
    
    try{
        if(contentType == 'application/json'){

            if( empresa.nome              == undefined || empresa.nome            == '' || empresa.nome            == null || empresa.nome.length             > 45 ||
                empresa.descricao         == undefined || empresa.descricao       == '' || empresa.descricao       == null || empresa.descricao.length        > 100||
                empresa.tipo_de_empresa   == undefined || empresa.tipo_de_empresa == '' || empresa.tipo_de_empresa == null || empresa.tipo_de_empresa.length  > 45 ||
                empresa.fundador          == undefined || empresa.fundador        == '' || empresa.fundador        == null || empresa.fundador.length         > 45 ||
                empresa.pais_origem       == undefined || empresa.pais_origem     == '' || empresa.pais_origem     == null || empresa.pais_origem.length      > 45 ||
                empresa.foto_capa_empresa == undefined || empresa.foto_capa_empresa.length > 200
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Encaminha os dados na nova empresa para ser inserida do Banco de Dados
                let resultEmpresa = await empresaDAO.insertEmpresa(empresa)

                if(resultEmpresa){
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    }catch(error){

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar uma empresa
const atualizarEmpresa = async function (empresa, id, contentType) {
    
    try{
        if(contentType == 'application/json'){

            if(
                empresa.nome              == undefined || empresa.nome            == '' || empresa.nome            == null || empresa.nome.length             > 45 ||
                empresa.descricao         == undefined || empresa.descricao       == '' || empresa.descricao       == null || empresa.descricao.length        > 100||
                empresa.tipo_de_empresa   == undefined || empresa.tipo_de_empresa == '' || empresa.tipo_de_empresa == null || empresa.tipo_de_empresa.length  > 45 ||
                empresa.fundador          == undefined || empresa.fundador        == '' || empresa.fundador        == null || empresa.fundador.length         > 45 ||
                empresa.pais_origem       == undefined || empresa.pais_origem     == '' || empresa.pais_origem     == null || empresa.pais_origem.length      > 45 ||
                empresa.foto_capa_empresa == undefined || empresa.foto_capa_empresa.length > 200 ||
                id                        == undefined || id == '' || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no Banco de Dados
                let resultEmpresa = await buscarEmpresa(parseInt(id))
                if(resultEmpresa.status_code == 200){
                    
                    //Adiciona um atributo id no JSON
                    empresa.id = parseInt(id)
                    let result = await empresaDAO.updateEmpresa(empresa)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultEmpresa.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para deletar uma empresa
const excluirEmpresa = async function(id) {
    try{
        if(id == ''|| id == undefined || id == null || id == isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }else{
            let resultEmpresa = await buscarEmpresa(parseInt(id))

            if(resultEmpresa.status_code == 200){
                // Código do delete
                let result = await empresaDAO.deleteEmpresa(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }else if(resultEmpresa.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para listar empresas
const listarEmpresa = async function () {
    
    try{
        
        let dadosEmpresa = {}

        //Chama função para retornar os dados da empresa
        let resultEmpresa = await empresaDAO.selectAllEmpresa()
        if(resultEmpresa != false || typeof(resultEmpresa) == 'object'){
            if(resultEmpresa.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de jogos
                dadosEmpresa.status = true
                dadosEmpresa.status_code = 200
                dadosEmpresa.tipo_de_empresa = resultEmpresa.length
                dadosEmpresa.games = resultEmpresa

                return dadosEmpresa //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND//400 
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para buscar uma empresa pelo ID
const buscarEmpresa = async function (id){
    
    try {
         if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let dadosEmpresa = {}

            //Chama a função para retornar os dados da empresa
            let resultEmpresa = await empresaDAO.selectByIdEmpresa(parseInt(id))

            if(resultEmpresa != false || typeof(resultEmpresa) == 'object'){
                if(resultEmpresa.length > 0){

                    //Cria um objeto do tipo JSON para retornar a lista de jogos
                    dadosEmpresa.status = true
                    dadosEmpresa.status_code = 200
                    dadosEmpresa.games = resultEmpresa

                    return dadosEmpresa//200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND//404
                }
            }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }
    } catch(error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

module.exports = {
    inserirEmpresa,
    atualizarEmpresa,
    excluirEmpresa,
    listarEmpresa,
    buscarEmpresa
}