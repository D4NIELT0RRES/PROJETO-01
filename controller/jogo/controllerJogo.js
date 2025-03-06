/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 13/02/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar um CRUD no banco de dados
const jogoDAO = require('../../model/DAO/jogo.js')

//Função para inserir um novo jogo
const inserirJogo = async function(jogo,contentType){

    try{
        if(contentType == 'application/json'){

            if( jogo.nome            == undefined ||            jogo.nome            == ''  ||            jogo.nome            == null || jogo.nome.length   > 80 ||
                jogo.data_lancamento == undefined ||            jogo.data_lancamento == ''  ||            jogo.data_lancamento == null || jogo.nome.length   > 10 ||
                jogo.versao          == undefined ||            jogo.versao          == ''  ||            jogo.versao          == null || jogo.versao.length > 10 ||
                jogo.tamanho         == undefined ||            jogo.tamanho.length   > 10  ||
                jogo.descricao       == undefined ||
                jogo.foto_capa       == undefined ||            jogo.foto_capa.length > 200 ||
                jogo.link            == undefined ||            jogo.link.length      > 200
            ){
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Encaminha os dados no novo jogo para ser inserido no banco de dados
                let resultJogo = await jogoDAO.insertJogo(jogo)

                if(resultJogo){
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE//415
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
}

//Função para atualizar um jogo
const atualizarJogo = async function(){


}

//Função para excluir um jogo 
const excluirJogo = async function(){


}

//Função para retornar todos os jogos
const listarJogo = async function(){

    try{

        let dadosJogos = {}
        //Chama a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectAllJogo()
        if(resultJogo != false || typeof(resultJogo) == 'object'){
            if(resultJogo.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de jogos
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.items = resultJogo.length
                dadosJogos.games = resultJogo

                return dadosJogos//200
            }else{
                return MESSAGE.ERROR_NOT_FOUND//400
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
        }
    }catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    


}

//Função para buscar um jogo pelo ID
const buscarJogo = async function(idJogo){

    try{

        let jogo = idJogo
        let dadosJogos = {}
        //Chama a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectByIdJogo(jogo)
        if(resultJogo != false || typeof(resultJogo) == 'object'){
            if(resultJogo.length > 0){

                //Cria um objeto do tipo JSON para retornar a lista de jogos
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.items = resultJogo.length
                dadosJogos.games = resultJogo
                dadosJogos.id = jogo

                return dadosJogos//200
            }else{
                return MESSAGE.ERROR_NOT_FOUND//400
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
        }
        
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

module.exports ={
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}