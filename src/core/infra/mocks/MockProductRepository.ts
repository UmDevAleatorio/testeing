import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class MockProductRepository implements IProductRepository {
  private static instance: MockProductRepository;
  private products: Product[] = [];

  private constructor() {}

  public static getInstance(): MockProductRepository {
    if (!MockProductRepository.instance) {
      MockProductRepository.instance = new MockProductRepository();
    }
    return MockProductRepository.instance;
  }

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter(p => p.id !== id);
  }
  
  public reset(): void {
    this.products = [];
  }
}