import express from "express"
import ProductManager from "./components/ProductManager.js"

const app = express();
app.use(express.urlencoded({extended : true}));

const productos = new ProductManager("./productos.txt");

app.get("/products", async (req, res) => {
    const limit = parseInt(req.query.limit);
    if(!limit) return res.send(await productos.readProducts())

    const allProducts = await productos.readProducts()
    const productLimit = allProducts.slice(0, limit)
    res.send(productLimit)
});

app.get("/products/:id", async (req, res) => {
    const productId = parseInt(req.params.id);
    const product = await productos.getProductsById(productId);
    res.send(product)
  });

const port = 8080;
const server = app.listen(port, ()=>{
    console.log(`Express por local host ${server.address().port}`)
})

server.on("error", (error) => console.log(`Error del servidor ${error}`))