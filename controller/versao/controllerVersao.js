/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 13/04/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config')

//Import do DAO para realizar um CRUD no banco de dados
const versaoDAO = require('../../model/DAO/versao')
const { deserializeRawResult } = require('@prisma/client/runtime/library')

//Função para inserir uma nova versão
const inserirVersao = async function (versao, contentType) {
    
    try {
        if(contentType == 'application/json'){

            if( versao.nome_versao == undefined   || versao.nome_versao   == ''     || versao.nome_versao       == null       || versao.nome_versao.length > 100 ||
                versao.numero_versao == undefined || versao.numero_versao == ''     || versao.numero_versao     == null       || versao.numero_versao.length > 45 ||
                versao.data_versao == undefined   || versao.data_versao   == ''     || versao.data_versao       == null       || versao.data_versao.length > 45 ||
                versao.tamanho  == undefined      || versao.tamanho       == ''     || versao.tamanho           == null       || versao.tamanho.length > 45
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Encaminha os dados na nova empresa para ser inserida do Banco de Dados
                let resultVersao = await versaoDAO.insertVersao(versao)

                if(resultVersao){
                    return MESSAGE.SUCCESS_CREATED_ITEM//201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para atualizar uma versão
const atualizarVersao = async function (versao,id,contentType) {
    
    try {
        if(contentType == 'application/json'){

            if( versao.nome_versao   == undefined   || versao.nome_versao   == ''          || versao.nome_versao       == null       || versao.nome_versao.length   > 100 ||
                versao.numero_versao == undefined   || versao.numero_versao == ''          || versao.numero_versao     == null       || versao.numero_versao.length > 45 ||
                versao.data_versao   == undefined   || versao.data_versao   == ''          || versao.data_versao       == null       || versao.data_versao.length   > 45 ||
                versao.tamanho       == undefined   || versao.tamanho       == ''          || versao.tamanho           == null       || versao.tamanho.length       > 45 ||
                id                   == undefined   || id == '' || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                //Validar se o ID existe no BD
                let resultVersao = await buscarVersao(parseInt(id))
                if(resultVersao.status_code == 200){
    
                    //Adiciona um atributo id no JSON
                    versao.id = parseInt(id)
                    let result = await versaoDAO.updateVersao(versao)
    
                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM//200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                    }
                }else if(resultVersao.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND//404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
        
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500   
    }
}

//Função para excluir uma versão
const excluirVersao = async function (id) {
    
    try {
        if (id == undefined   || id == '' || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let resultVersao = await buscarVersao(parseInt(id))

            if(resultVersao.status_code == 200){
                //Delete
                let result = await versaoDAO.deleteVersao(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM//200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else if(resultVersao.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND//404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para retornar todos os jogos
const listarVersao = async function () {
    try {
        let dadosVersao = {}
        //Chama a função para retornar os dados da versão
        let resultVersao = await versaoDAO.selectAllVersao()
        if(resultVersao != false || typeof(resultVersao) == 'object'){
            if(resultVersao.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de versões
                dadosVersao.status = true
                dadosVersao.status_code = 200
                dadosVersao.items = resultVersao.length
                dadosVersao.games = resultVersao

                return  dadosVersao//200
            }else{
                return MESSAGE.ERROR_NOT_FOUND//400
            }
        }else{
            console.log(typeof(resultVersao))
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Funcão para buscar uma versão pelo ID
const buscarVersao = async function (id) {
    
    try {
        if (id == undefined   || id == '' || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let dadosVersao = {}
            
            //Chama a função para retornar os dados do jogo
            let resultVersao = await versaoDAO.selectByIdVersao(parseInt(id))

            if(resultVersao != false || typeof(resultVersao) == 'object'){
                if(resultVersao.length > 0){
                  
                    //Cria um objeto do tipo JSON para retornar a lista de versões
                    dadosVersao.status = true
                    dadosVersao.status_code = 200
                    dadosVersao.games = resultVersao

                    return dadosVersao//200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND//404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}

module.exports = {
    inserirVersao,
    atualizarVersao,
    excluirVersao,
    listarVersao,
    buscarVersao
}