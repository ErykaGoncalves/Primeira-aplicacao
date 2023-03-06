const { request, response, json } = require("express");
const { randomUUID } = require("crypto")
const fs = require("fs")

const express = require("express");
const { writeFile } = require("fs");

const app = express();

app.use(express.json())

let products = []

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        products = JSON.parse(data)
    }
})
/**
 * Post => inserir
 * Get => Buscar
 * Put => alterar
 * Delete => Deletar 
 */

/**
 * body => sempre que eu quiser enviar dados para minha aplicação
 * params => /product/531434145435
 * query => /product?id=531434145435value=531434145435
 */

app.post("/products", (request, response) => {
    //nome e preço
    const { name, price } = request.body

    const product = {

        name,
        price,
        id: randomUUID(),

    }
    products.push(product)

    createProductFile()

    return response.json(product)


    console.log(body)
})

app.get("/products", (request, response) => {
    return response.json(products)
})

app.get("/products/:id", (request, response) => {
    const { id } = request.params
    const product = products.find(product => product.id === id)
    return response.json(product)
})

app.put("/products/:id", (request, response) => {
    const { id } = request.params
    const { name, price } = request.body

    const productIndex = products.findIndex((product) => product.id === id)
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }

    createProductFile()

    return response.json({ message: "produto alterado com sucesso" })
})

app.delete("/products/:id", (request, response) => {
    const { id } = request.params

    const productIndex = products.findIndex((product) => product.id === id)

    products.splice(productIndex, 1)

    createProductFile()

    return response.json({ message: "produto excluído com sucesso" })

})

function createProductFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Produto inserido")
        }
    })
}

app.listen(4002, () => console.log("Servidor rodando no servidor 4002"))
