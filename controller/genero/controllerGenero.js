/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 17/04/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar um CRUD no banco de dados
const generoDAO = require('../../model/DAO/genero.js')
const { buscarJogo } = require('../jogo/controllerJogo.js')

//Função para inserir um novo genero
const inserirGenero = async function (genero, contentType) {
    try {
        if(contentType == 'application/json'){

            if( genero.tipo_de_categoria == undefined || 
                genero.tipo_de_categoria == '' || 
                genero.tipo_de_categoria == null || 
                genero.tipo_de_categoria.length > 45 
                
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                //Encaminha os dados
                let resultGenero = await generoDAO.insertGenero(genero)

                if(resultGenero){
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                                
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar o genero
const atualizarGenero = async function (genero,id,contentType) {
    
    try {
        
        if(contentType == 'application/json'){

            if( genero.tipo_de_categoria == undefined || 
                genero.tipo_de_categoria == '' || 
                genero.tipo_de_categoria == null || 
                genero.tipo_de_categoria.length > 45 ||
                id == undefined || id == '' || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
               //Validar se o ID existe no Banco de Dados
                let resultGenero = await buscarGenero(parseInt(id))
                if(resultGenero.status_code == 200){
                                   
                    //Adiciona um atributo id no JSON
                    genero.id = parseInt(id)
                    let result = await generoDAO.updateGenero(genero)
               
                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultEmpresa.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                } 
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para deletar um genero
const excluirGenero = async function (id) {
    try {
        if(id == undefined || id == '' || id == null || isNaN(id) || id <= 0){
            
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }else{
            let resultGenero = await buscarGenero(parseInt(id))
    
            if(resultGenero.status_code == 200){
                //delete
                let result = await generoDAO.deleteGenero(parseInt(id))
    
                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM//200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else if(resultGenero.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND//404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para listar um genero
const listarGenero = async function () {
    
    try {
        let dadosGenero = {}

        //Chama função para retornar os dados do genero
        let resultGenero = await generoDAO.selectAllGenero()
        if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de generos
                dadosGenero.status = true
                dadosGenero.status_code = 200
                dadosGenero.tipo_de_categoria = resultGenero.length
                dadosGenero.games = resultGenero

                return dadosGenero //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND//400
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
        }
    } catch (error) {
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função buscar um genero pelo ID
const buscarGenero = async function (id) {
    try {
        if(id == undefined || id == '' || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let dadosGenero = {}

            //Chama a função para retornar os dados do genero
            let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    //Cria um objeto do tipo JSON para retornar a lista de jogos
                    dadosGenero.status = true
                    dadosGenero.status_code = 200
                    dadosGenero.games = resultGenero  

                    return dadosGenero//200
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

module.exports ={
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero
}