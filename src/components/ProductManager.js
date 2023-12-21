import {promises as fs, readFile} from "fs"



export default class ProductManager{
    constructor(patch){
        this.patch = patch
        this.products = []
    }


    idGenerator() {
        let id = 0;
        if (this.products.length === 0) {
            id = 1;
        } else {
            id = this.products[this.products.length - 1].id + 1;
        };
        return id;
    };
    
    validateField(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Por favor, completa los campos.");
        return false;
        
        } else {
          return true;
        };

    };

    duplicateCode(code){
        if (this.products.find((product) => product.code === code) !== undefined) {
        console.error("Este producto ya existe")
        return false;
      
      } else {
        return true;
      };
      };

    addProduct = async (product) => {
    const {title, description, price, thumbnail, code, stock} = product 
    this.validateField(title, description, price, thumbnail, code, stock) && this.duplicateCode(code)
        let newProduct = {
            id: this.idGenerator(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct)

        console.log(newProduct)

       
       await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return(JSON.parse(respuesta))
    }

    getProducts = async () => {

        let respuesta2 = await this.readProducts()
        return respuesta2
    }
    


    getProductsById = async (id) => {

        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)){
            console.log("Not found")
        } else {
       return respuesta3.find(product => product.id === id)
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productfilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productfilter))
        console.log("Producto eliminado")
    }

    updateProducts = async ({id, ...producto}) => {

        let productOld = await this.readProducts()

        let productsModified = [{id, ...producto}, ...productOld]

        await fs.writeFile(this.patch, JSON.stringify(productsModified))

        console.log("Producto actualizado")

    }

    
}

//const productos = new ProductManager("./productos.txt");



//PRODUCTOS
const producto1 = {
    title: "Pan",
    description: "Bimbo",
    price: 100,
    thumbnail: "sinimagen",
    code: "abc123",
    stock: 10,
}

const producto2 = {
    title: "Leche",
    description: "Conaprole",
    price: 300,
    thumbnail: "sinimagen",
    code: "abc456",
    stock: 15,
}
//productos.addProduct(producto1)
//productos.addProduct(producto2)


const producto3 = {
    title: "Jamón",
    description: "Doña Coca",
    //price: 50,
    thumbnail: "sinimagen",
    code: "abc789",
    stock: 5,
}

//VALIDACION, completar campos
//productos.addProduct(producto3)
//--------------------------------



//CODIGO DUPLICADO
const producto4 = {
    title: "Mayonesa",
    description: "uruguaya",
    price: 20,
    thumbnail: "sinimagen",
    code: "123",
    stock: 25
}

const producto5 = {
    title: "Pancho",
    description: "La Dolfina",
    price: 30,
    thumbnail: "sinimagen",
    code: "123",
    stock: 15
}

//productos.addProduct(producto4)
//productos.addProduct(producto5)
//---------------------------------


//VER TODOS LOS PRODUCTOS
//console.log(await productos.getProducts())
//-----------------------

//TRAER PRODUCTO POR SU ID
//productos.getProductsById(1)
//------------------------

//ELIMINAR PRODUCTO POR SU ID
//productos.deleteProductsById(2)
//---------------------------


//ACTUALIZAR PRODUCTO
/*productos.updateProducts({
    title: "Pan",
    description: "Bimbo",
    price: 100,
    thumbnail: "sinimagen",
    code: "abc123",
    stock: 10,
}
)*/
//-------------------------------------

