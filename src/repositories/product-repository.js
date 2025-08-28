const Product = require("../models/product"); // importando a model do produto

class ProductRepository {
  //Buscar todos
  async findAll() {
    // buscar todos os produtos ativos {active: true} (filtro)
    return await Product.find({ active: true });
  }

  //Busca por id
  async findById(id) {
    return await Product.findById(id);
  }

  //Criar
  async create(productData) {
    //criando uma instancia para persistir os dados do mongo
    const product = new Product(productData);
    return await product.save();
  }

  //Atualizar
  async update(id, productData) {
    return await Product.findByIdAndUpdate(id, productData);
  }

  //delete
  async delete(id){
    //passa o id e muda o active para false
    return await Product.findByIdAndUpdate(id, {active: false})
  }
}

module.exports = new ProductRepository();
