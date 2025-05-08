/***************************************************************************************
 * OBJETIVO: Model responsável pelo CRUD de dados referente a JOGOS no BANCO DE DADOS.
 * DATA: 13/02/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//TRY-CATCH - usado para nao derrubar a api depois de subir ela, e usando o console.log ela guia o lugar do erro (Sempre usar Try-Catch)

//quando for script que nao retorna dados (insert,update e delete) -> executeRawUnsafe
//quando for script que tem algum retorno (return) - queryRawUnsafe

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados uma nova faixa etaria
const insertFaixaEtaria = async function (faixa_etaria) {
    
    try {
        let sql = `insert into tbl_faixa_etaria(
                                                   tipo_de_classificacao
                                                )values (
                                                    '${faixa_etaria.tipo_de_classificacao}
                                                )`

        //Executa o script SQL no BD e aguarda o retorno no BD
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para atualizar no Banco de Dados um jogo existente
const updateFaixaEtaria = async function (faixa_etaria) {
    
    try {
        let sql = `update tbl_jogo set tipo_de_classificacao = ${faixa_etaria.tipo_de_classificacao}`

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
const deleteFaixaEtaria = async function (id) {
    
    try {
        let id_faixa_etaria = id
        let sql = `delete from tbl_faixa_etaria where id=${id_faixa_etaria}`

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

//Função para retornar do Banco de dados uma lista de jogos
const selectAllFaixaEtaria = async function () {
    
    try {
        //Script SQL para retornar os dados do BD
        let sql = `select * from tbl_faixa_etaria`

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

//Função para buscar no Banco de Dados um jogo pelo ID
const selectByIdFaixaEtaria = async function (id) {
    
    try {
        let id_faixa_etaria = id
        let sql = `select * from tbl_faixa_etaria where id=${id_faixa_etaria}`

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
    insertFaixaEtaria,
    updateFaixaEtaria,
    deleteFaixaEtaria,
    selectAllFaixaEtaria,
    selectByIdFaixaEtaria
}