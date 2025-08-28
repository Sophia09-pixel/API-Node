const ProductRepository = require("../repositories/product-repository");

class ProductController {
  async getAllProducts(req, res) {
    try {
      const produtos = await ProductRepository.findAll();
      res.status(200).json({
        success: true,
        data: produtos,
        message: "Produtos listados",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "erro ao buscar produtos",
      });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductRepository.findById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Produto não encontrado",
        });
      }

      res.status(200).json({
        success: true,
        data: product,
        message: "Produtos listados",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "erro ao buscar produtos",
        error: error.message
      });
    }
  }

  async createProduct(req, res) {
    try {
      const productData = req.body;
      const newProduct = await ProductRepository.create(productData);

      res.status(201).json({
        success: true,
        data: newProduct,
        message: "Produto criado",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "erro ao criar produtos",
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const productUpdated = await ProductRepository.update(id, productData);

      if (!productUpdated) {
        return res.status(404).json({
          success: false,
          message: "Produto não encontrado",
        });
      }
      res.status(200).json({
        success: true,
        message: "Produto atualizado",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "erro ao atualizar produtos",
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductRepository.delete(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Produto não encontrado",
        });
      }
      res.status(200).json({
        success: true,
        message: "Produto excluido",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "erro ao deletar produtos",
      });
    }
  }
}

module.exports = new ProductController();