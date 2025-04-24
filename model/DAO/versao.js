/***************************************************************************************
 * OBJETIVO: Model responsável pelo CRUD de dados referente a JOGOS no BANCO DE DADOS.
 * DATA: 13/04/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import da bibioteca do prisma client para exeturar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados uma nova empresa
const insertVersao = async function (versao) {
    
    try {
        
        let sql = `insert into tbl_versao(
                                          nome_versao,
                                          numero_versao,
                                          data_versao,
                                          tamanho
                                          ) values (
                                           '${versao.nome_versao}',
                                           '${versao.numero_versao}',
                                           '${versao.data_versao}',
                                           '${versao.tamanho}'
                                           )`
        //Executa o script SQL no BD e aguarda o retorno no BD
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

//Função para atualizar no Bando de Dados um jogo existente
const updateVersao = async function (versao) {
    
    try {
        let sql = `update tbl_versao set  nome_versao   =    '${versao.nome_versao}',
                                          numero_versao =    '${versao.numero_versao}',
                                          data_versao   =    '${versao.data_versao}',
                                          tamanho       =    '${versao.tamanho}'`
        //Executa o script SQL no BD e aguarda o retorno no BD
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para excluir no Banco de Dados um jogo existente
const deleteVersao = async function (id) {
    
    try {
        let idVersao = id
        let sql = `delete from tbl_versao where id = ${idVersao}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de versões
const selectAllVersao = async function () {
    
    try {
        //Script do SQL para retornar os dados do BD
        let sql = `select * from tbl_versao`

        //Executa o script SQL e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    } catch (error) {
        
        return false
    }
}

//Função para buscar no Bando de Dados um jogo pelo ID
const selectByIdVersao = async function (id) {
    
    try {
        let idVersao = id
        let sql = `select * from tbl_versao where id=${idVersao}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertVersao,
    updateVersao,
    deleteVersao,
    selectAllVersao,
    selectByIdVersao
}