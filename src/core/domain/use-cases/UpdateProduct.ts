import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/IProductRepository";
import { Name, Price, Photo } from "../value-objects";

export class UpdateProduct {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(params: { id: string; name?: string; price?: number; stock?: number; }): Promise<Product> {
        const { id, name, price, stock } = params;

        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct) {
            throw new Error("Produto não encontrado.");
        }

        const updatedName = name ? Name.create(name) : existingProduct.name;
        const updatedPrice = price !== undefined ? Price.create(price) : existingProduct.price;
        const updatedStock = stock !== undefined ? stock : existingProduct.stock;

        const updatedProduct = Product.create(
            existingProduct.id,
            updatedName,
            updatedPrice,
            existingProduct.photo, 
            updatedStock
        );
        
        await this.productRepository.update(updatedProduct);
        return updatedProduct;
    }
}