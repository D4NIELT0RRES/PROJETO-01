/***************************************************************************************
 * OBJETIVO: Model responsável pelo CRUD de dados referente a JOGOS no BANCO DE DADOS.
 * DATA: 10/04/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import da biblioteca do prisma client para executar scripts no BD
const {PrismaClient} = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco da Dados uma nova empresa
const insertEmpresa = async function (empresa) {
    try{

        let sql = `insert into tbl_empresa(
                                            nome,
                                            descricao,
                                            tipo_de_empresa,
                                            fundador,
                                            pais_origem,
                                            foto_capa_empresa
                                          ) values (
                                            '${empresa.nome}',
                                            '${empresa.descricao}',
                                            '${empresa.tipo_de_empresa}',
                                            '${empresa.fundador}',
                                            '${empresa.pais_origem}',
                                            '${empresa.foto_capa_empresa}'
                                          )`
        //Executa o script SQL no BD e aguarda o retorno no BD
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }    
    }catch(error){
        console.log(error)
        return false    
    }
}

//Função para atualizar no Banco de Dados um jogo existente
const updateEmpresa = async function (empresa) {
    
    try{
        let sql = `update tbl_empresa set   nome            = '${empresa.nome}',
                                            descricao       = '${empresa.descricao}',
                                            tipo_de_empresa = '${empresa.tipo_de_empresa}',
                                            fundador        = '${empresa.fundador}',
                                            pais_origem     = '${empresa.pais_origem}',
                                            foto_capa_empresa       = '${empresa.foto_capa_empresa}' 
                                            where id = ${empresa.id}`

        //Executa o script SQL no BD e aguarda o retorno no BD
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

//Função para excluir no Banco de Dados um jogo existente
const deleteEmpresa = async function (id) {
    
    try{
        let idEmpresa = id
        let sql = `delete from tbl_empresa where id=${idEmpresa}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }

    }catch(error){
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de empresas
const selectAllEmpresa = async function(){
    try{
        let sql = `select * from tbl_empresa`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

//Função para buscar no Banco de Dados uma empresa pelo ID
const selectByIdEmpresa = async function(id){
    try{
        let idEmpresa = id
        let sql = `select * from tbl_empresa where id=${idEmpresa}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }else{
            return false
        }
    }catch(error){
        return false
    }
}

module.exports = {
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
    selectAllEmpresa,
    selectByIdEmpresa
}