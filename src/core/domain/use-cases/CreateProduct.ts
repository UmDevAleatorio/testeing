import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/IProductRepository";
import { Name, Price, Photo } from "../value-objects";

export class CreateProduct {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(params: { name: string; price: number; photoUrl: string; stock: number; }): Promise<Product> {
        const { name, price, photoUrl, stock } = params;

        const product = Product.create(
            Math.random().toString(36).substring(7),
            Name.create(name),
            Price.create(price),
            Photo.create(photoUrl),
            stock
        );

        await this.productRepository.save(product);
        return product;
    }
}