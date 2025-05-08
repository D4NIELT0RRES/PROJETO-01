/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 13/02/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar um CRUD no banco de dados
const faixaEtariaDAO = require('../../model/DAO/faixa_etaria.js')

//Função para inserir uma nova faixa etária
const inserirFaixaEtaria = async function (faixaEtaria, contentType) {
    try {
        if(contentType == 'appliation/json'){

            if( faixaEtaria.tipo_de_classificacao == undefined ||
                faixaEtaria.tipo_de_classificacao == '' ||
                faixaEtaria.tipo_de_classificacao == null ||
                faixaEtaria.tipo_de_classificacao.length > 40
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                //Encaminha os dados
                let resultFaixaEtaria = await faixaEtariaDAO.insertFaixaEtaria(faixaEtaria)

                if(resultFaixaEtaria){
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

//Função para atualizar a faixa etária
const atualizarFaixaEtaria = async function (faixaEtaria,id,contentType) {
    
    try {
        if(contentType == 'application/json'){

            if( faixaEtaria.tipo_de_classificacao == undefined ||
                faixaEtaria.tipo_de_classificacao == '' ||
                faixaEtaria.tipo_de_classificacao == null ||
                faixaEtaria.tipo_de_classificacao.length > 40 ||
                id == undefined || id == '' || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS//400
            }else{
                //Validando se o ID existe no Banco de Dados
                let resultFaixaEtaria = await buscarFaixaEtaria(parseInt(id))
                if(resultFaixaEtaria.status_code == 200){

                    //Adiciona um atributo id no JSON
                    faixaEtaria.id = parseInt(id)
                    let result = await faixaEtariaDAO.updateFaixaEtaria(faixaEtaria)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultFaixaEtaria.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND//404
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

//Função para deletar uma faixa etária
const excluirFaixaEtaria = async function (id) {
    try {
        if(id == undefined || id == '' || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let resultFaixaEtaria = await buscarFaixaEtaria(parseInt(id))

            if(resultFaixaEtaria.status_code == 200){

                let result = await faixaEtariaDAO.deleteFaixaEtaria(parseInt(id))

                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM//200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
                }
            }else if(resultFaixaEtaria.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND//404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para listar uma faixa etária
const listarFaixaEtaria = async function () {
    
    try {
        let dadosFaixaEtaria
    } catch (error) {
        
    }
}

//Função para listar uma faixa etária
const buscarFaixaEtaria = async function (id) {
    try {
        if(id == undefined || id == '' || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS//400
        }else{
            let dadosFaixaEtaria = {}

            //Chama a função para retornar os dados da faixa etaria
            let resultFaixaEtaria = await faixaEtariaDAO.selectByIdFaixaEtaria(parseInt(id))

            if(resultFaixaEtaria != false || typeof(resultFaixaEtaria) == 'object'){
                if(resultFaixaEtaria.length > 0){
                    //Cria um objeti do tipo JSON para retornar a lista de faixas etarias
                    dadosFaixaEtaria.status = true
                    dadosFaixaEtaria.status_code = 200
                    dadosFaixaEtaria.games = resultFaixaEtaria

                    return dadosFaixaEtaria//200
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