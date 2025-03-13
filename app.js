/*************************************************************************************************
 * OBJETIVO: API referente ao projeto de controle de jogos
 * DATA: 13/02/2025
 * AUTOR: DANIEL TORRES
 * VERSÃO: 1.0
 *================================================================================================ 
 * 
 * 
 * OBSERVAÇÃO:
 * 
 * ****************** Para configurar e instalar a API, precisamos das seguites bibliotecas:
 *                      -> express          npm install express --save
 *                      -> cors             npm install cors --save
 *                      -> body-parser      npm install body-parser --save
 * 
 * ****************** Para configurar e Instalar o acesso remoto ao Banco de Dados precisamos:
 *                      -> prisma          npm install prisma --save (conexão com o BD)
 *                      -> prisma/client   npm install @prisma/client --save (Executa scrips no BD)
 * 
 * 
 * ******************* Após a instalação do prisma e do prisma/client, devemos:
 * 
 *                     npx prisma init (Inicializar o prisma no projeto)
 * 
 * ******************* Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
 * 
 *                     npx prisma migrate dev                   
 * 
 *************************************************************************************************/

 //Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Importe das controles para realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js')

//Estabelecendo o formato de dados que deverá chegar no body da aquisição (POST ou PUT)
const bodyParserJson = bodyParser.json()

 //Cria o objeto app para criar a API
const app = express()

//Configuração do cors   
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

    app.use(cors())
    next()
})

/**************************************************************************************************/

//EndPoint para inserir um jogo no banco de dados
app.post('/V1/controle-jogos/jogo', cors(), bodyParserJson, async function (request, response) {
    
    //Recebe o content-type para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    //Recebe o conteúdo do BODY da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a Controller inserir no banco de dados
    let resultJogo = await controllerJogo.inserirJogo(dadosBody,contentType)


    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors(), async function (request, response) {

    //Chama a função para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint para retornar um jogo pelo ID
app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
    
    let idJogo = request.params.id
    let resultJogo = await controllerJogo.buscarJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)

})

//EndPoint para deletar um jogo pelo ID
app.delete('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
    
    let idJogo = request.params.id
    let resultJogo = await controllerJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJson, async function (request, response){

    //Recebe o content-type para válidar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    //Recebe o ID do jogo
    let idJogo = request.params.id
    //Recebe os dados do Jogo encaminhado no BODY da requisição
    let dadosBody = request.body
    
    //Encaminhando os dados do body da requisição para a Controller inserir no banco de dados
    let resultJogo = await controllerJogo.atualizarJogo(dadosBody,idJogo,contentType)
    
    response.status(resultJogo.status_code)
    response.json(resultJogo)
})


app.listen('8080', function(){
    console.log('API aguardando Requisições...')
})