/**
 * Conhecendo os requisitos da aplicação
 * Cadastro de conta
 * Validando CPF existente
 * Listando extrato
 * Validando a conta
 * Middlewares
 */

const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();
//mid para receber Json
app.use(express.json());

//Middlewares

function verifyIfExistsAcccountCPF(request,response,next){

    const {cpf} = request.headers;

    const custemer = customers.find(custemer => custemer.cpf === cpf);
    if(!custemer){
        return response.status(400).json({error: "Customer not found"});
    }

    request.customers = custemer;
    return next();

}



const customers = [];
/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
 */
app.post("/account",(request,response) =>{
    const {cpf, name} = request.body;
    const customerAlreadyExists = customers.some((customer) =>
    customer.cpf === cpf
    );

    if (customerAlreadyExists){
        return response.status(400).json({error:
             "Customer already exists!"});
    }
    customers.push({
        cpf,
        name,
        id : uuidv4(),
        statement: []
    })

    return response.status(201).send();
});

//app.use(verifyIfExistsAcccountCPF);
//Todas as rotas abaixo , vão passar antes nesse Middlewares



//rota de pegar um statement de um usuario pelo cpf
app.get("/statement",verifyIfExistsAcccountCPF,(request,response) =>{
    const {customers} = request;
    return response.json(customers.statement);
})




//localhost:3333
app.listen(3333);