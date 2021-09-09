const errorHandler = require('../../exceptions/ErrorHandler');

class ProductsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
    this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
    this.putProductByIdHandler = this.putProductByIdHandler.bind(this);
    this.deleteProductByIdHandler = this.deleteProductByIdHandler.bind(this);
  }

  async postProductHandler(request, h) {
    try {
      this.validator.validatePostProductPayload(request.payload);
      const { name, price, qty } = request.payload;

      const productId = await this.service.addProduct({ name, price, qty });

      const response = h.response({
        status: 'success',
        message: 'Product berhasil ditambahkan',
        data: {
          productId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getProductsHandler(h) {
    try {
      const products = await this.service.getProducts();

      return {
        status: 'success',
        data: {
          products,
        },
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getProductByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const product = await this.service.getProductById(id);

      return {
        status: 'success',
        data: {
          product,
        },
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async putProductByIdHandler(request, h) {
    try {
      this.validator.validatePutProductPayload(request.payload);

      const { id } = request.params;
      await this.service.editProductById(id, request.payload);

      return {
        status: 'success',
        message: 'Product berhasil diperbarui',
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async deleteProductByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this.service.deleteProductById(id);

      return {
        status: 'success',
        message: 'Product berhasil dihapus',
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = ProductsHandler;
