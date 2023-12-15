import express, { response } from "express"
import ProductManager from "./components/ProductManager.js"

const app = express();
app.use(express.urlencoded({extended : true}));

const productos = new ProductManager("./productos.txt");
const readProducts = productos.readProducts();

app.get("/products", async (request, response) => {
    let limit = parseInt(request.query.limit);
    if(!limit) return response.send(await readProducts)

    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    response.send(productLimit)
});

app.get("/products/:id", async (request, response) => {
    let pid = parseInt(request.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === pid)
    response.send(productById)
});

const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`Express por local host ${server.address().port}`)
})

server.on("error", (error) => console.log(`Error del servidor ${error}`))