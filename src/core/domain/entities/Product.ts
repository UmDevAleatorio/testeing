import { Name } from "../value-objects/Name";
import { Photo } from "../value-objects/Photo";
import { Price } from "../value-objects/Price";

export class Product {
    private constructor(
        readonly id: string,
        readonly name: Name,
        readonly price: Price,
        readonly photo: Photo,
        readonly stock: number
    ) { }

    static create(
        id: string,
        name: Name,
        price: Price,
        photo: Photo,
        stock: number
    ): Product {
        if (stock < 0) {
            throw new Error("O estoque não pode ser negativo.");
        }
        return new Product(id, name, price, photo, stock);
    }

    public decreaseStock(quantity: number): Product {
        if (this.stock < quantity) {
            throw new Error(`Estoque insuficiente para o produto '${this.name.value}'.`);
        }
        const newStock = this.stock - quantity;
        return new Product(this.id, this.name, this.price, this.photo, newStock);
    }
}