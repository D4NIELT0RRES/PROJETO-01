/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 17/04/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar um CRUD no banco de dados
const plataformaDAO = require('../../model/DAO/plataforma.js')

//Função para inserir um novo jogo
const inserirPlataforma = async function (plataforma, contentType){
    
    try {
        if(contentType == 'application/json'){

            if(plataforma.nome == undefined ||
               plataforma.nome == ''        ||
               plataforma.nome == null      ||
               plataforma.nome > 50
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Encaminha os dados na nova plataforma para ser inserido no banco de dados
                let resultPlataforma = await plataformaDAO.insertPlataforma(plataforma)

                if(resultPlataforma){
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para atualizar uma plataforma
const atualizarPlataforma = async function (plataforma,id,contentType) {
    
    try {
        if(contentType == 'application/json'){

            if( plataforma.nome == undefined ||
                plataforma.nome == ''        ||
                plataforma.nome == null      ||
                plataforma.nome.length > 50  ||
                id == undefined || id == ''  || id == null || isNaN(id) || id<= 0
             ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
             }else{
                //Validar se o ID existe no BD
                let resultPlataforma = await buscarPlataforma(parseInt(id))
                if(resultPlataforma.status_code == 200){
                    //Adiciona uma tributo id no JSON
                    plataforma.id = parseInt(id)
                    let result = await plataformaDAO.updatePlataforma(plataforma)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM//200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                    }
                }else if(resultPlataforma.status_code == 404){
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

//Função para excluir uma plataforma
const excluirPlataforma = async function (id) {
    
    try {
        if(id == undefined || id == ''  || id == null || isNaN(id) || id<= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let resultPlataforma = await buscarPlataforma(parseInt(id))

            if(resultPlataforma.status_code == 200){
                //Delete
                let result = await plataformaDAO.deletePlataforma(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM//200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else if(resultPlataforma.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND//404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para retornar todas as plataformas
const listarPLataforma = async function () {
    
    try {
        let dadosPlataforma = {}
        //Chama a função para retornar os dados da plataforma
        let resultPlataforma = await plataformaDAO.selectAllPlataforma()
        if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){
            
            if(resultPlataforma.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de plataformas
                dadosPlataforma.status = true
                dadosPlataforma.status_code = 200
                dadosPlataforma.items = resultPlataforma.length
                dadosPlataforma.games = resultPlataforma

                return dadosPlataforma//200
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

//Função para buscar uma plataforma pelo ID
const buscarPlataforma = async function (id) {
    
    try {
        if(id == undefined || id == ''  || id == null || isNaN(id) || id<= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let dadosPlataforma = {}

            //Chama a função para retornar os dados do jogo
            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(parseInt(id))

            if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){
                if(resultPlataforma.length > 0){

                    //Cria um objeto do tipo JSON para retornar a lista de jogos
                    dadosPlataforma.status = true
                    dadosPlataforma.status_code = 200
                    dadosPlataforma.games = resultPlataforma

                    return dadosPlataforma//200
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
    inserirPlataforma,
    atualizarPlataforma,
    excluirPlataforma,
    listarPLataforma,
    buscarPlataforma
}