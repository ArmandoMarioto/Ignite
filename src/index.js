/**
 * Conhecendo os requisitos da aplicação
 * Cadastro de conta
 * Validando CPF existente
 * Listando extrato
 * Validando a conta
 * Middlewares
 * Criando depósito na conta
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

    const customer = customers.find(customer => customer.cpf === cpf);
    if(!customer){
        return response.status(400).json({error: "Customer not found"});
    }

    request.customers = customer;
    return next();

}

function getBalance(statement){
    const balance = statement.reduce((acc,operation)=>{
        if(operation.type === 'credit'){
            return acc + operation.amount;
        }else{
            return acc - operation.amount;
        }
    }, 0)

    return balance;
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
});


app.post("/deposit",verifyIfExistsAcccountCPF,(request , response)=>{
    const { description , amount} = request.body;
    const {customers} = request;
    console.log(customers);
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    };

    customers.statement.push(statementOperation);

    return response.status(201).send();
});

app.post("/withdraw",verifyIfExistsAcccountCPF,(request,response)=>{
    const { amount } = request.body;
    const {customers} = request;
    const balance = getBalance(customers.statement);

    if(balance < amount){
        return response.status(400).json({error: "Insufficient funds!"})
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit",
    };

    customers.statement.push(statementOperation);
    return response.status(201).send();

});




//localhost:3333
app.listen(3333);