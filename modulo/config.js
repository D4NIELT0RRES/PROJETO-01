/**************************************************************************
 * OBJETIVO: Arquivo de padronização de mensagem e status code para projeto
 * DATA: 20/02/2025
 * AUTOR: DANIEL TORRES
 * VERSÃO: 1.0
 *************************************************************************/

/**********************MENSAGENS DE ERRO***********************/

const ERROR_REQUIRED_FIELDS = {status: false, status_code:400, message:'Exixstem campos obrigatórios que não foram preenchidos ou ultrapassaram a quantidade de caracteres. A requisição não pode ser realizada'}
const ERROR_INTERNAL_SERVER = {status: false, status_code:500, message:'Não foi possível processar a requisição pois ocorreram erros internos no servidor'}


/**********************MENSAGENS DE SUCESSO***********************/

const SUCCESS_CREATED_ITEM = {status: true, status_code:201, message:'Item criado com sucesso'}





module.exports = {
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER,
    SUCCESS_CREATED_ITEM
}
