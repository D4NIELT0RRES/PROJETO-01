/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do JOGO.
 * DATA: 10/04/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config')

//Import do DAO para realizar um CRUD no banco de dados
const EmpresaDAO = require('../../model/DAO/empresa.js')
const { deserializeRawResult } = require('@prisma/client/runtime/library')

//Função para inserir uma nova empresa
const inserirEmpresa = async function (empresa,contentType) {
    
    try{
        if(contentType == 'application/json'){

            // if( empresa.nome  == undefined || empresa.nome == '' || empresa.nome == null || empresa.nome.length > 

            // )
        }
    }catch(error){

    }
}