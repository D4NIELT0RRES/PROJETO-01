/***************************************************************************************
 * OBJETIVO: Model responsável pelo CRUD de dados referente a JOGOS no BANCO DE DADOS.
 * DATA: 17/04/2025
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

//Função para inserir no Banco de dados uma nova plataforma
const insertPlataforma = async function (plataforma) {
    
    try {
        
        let sql = `insert into tbl_plataforma(nome) value ('${plataforma.nome}')`

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
const updatePlataforma = async function (plataforma) {
    
    try {
        let sql = `update tbl_plataforma set   nome = '${plataforma.nome}'`

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

//Função para excluir no Banco de Dados uma plataforma existente
const deletePlataforma = async function (id) {
    
    try {
        let idPlataforma = id
        let sql = `delete from tbl_plataforma where id=${idPlataforma}`

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

const selectAllPlataforma = async function () {
    
    try {
        //Script SQL para retornar os dados BD
        let sql = `select * from tbl_plataforma`

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

//Função para buscar no Banco de Dados uma plataforma pelo ID
const selectByIdPlataforma = async function (id) {
    
    try {
        let idPlataforma = id
        let sql = `select * from tbl_plataforma where id=${idPlataforma}`

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

module.exports ={
    insertPlataforma,
    updatePlataforma,
    deletePlataforma,
    selectAllPlataforma,
    selectByIdPlataforma
}