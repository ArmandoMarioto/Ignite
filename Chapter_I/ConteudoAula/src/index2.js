const express = require('express');

const app = express();

app.use(express.json());
/**
 * Utilizando os métodos HTTP 
 * GET - Buscar uma informação dentro do servidor
 * POST - Inserir uma informção no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informoção especifica
 * DELETE - Deletar uma informação do servidor
 * 
 * 
 * Tipos de parâmentros
 * 
 * Route Params => Identificar um recurso editar/deletar/buscar
 * Query Params => Paginação / Filtro
 * Body Params => Os Objetos inserção/ alteração(JSON)
 */
app.get("/courses",(request,response)=>{
    const query = request.query;
    console.log(query);
    return response.json(['Curso 1', 'Curso 2', 'Curso 3'])
});
app.post("/courses",(request, response)=>{
    const body = request.body;
    console.log(body);
    return response.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4']);
});
app.put("/courses/:id",(request,response) =>{
    const {id} = request.params;
    console.log(id);
    return response.json(['Curso 6', 'Curso 2', 'Curso 3', 'Curso 4']);

});

app.patch("/courses/:id",(request , response) =>{
    return response.json(['Curso 6', 'Curso 7', 'Curso 3', 'Curso 4']);

});

app.delete("/courses/:id",(request , response) =>{
    return response.json(['Curso 1', 'Curso 4'])

});
//localhost:3333
app.listen(3333);