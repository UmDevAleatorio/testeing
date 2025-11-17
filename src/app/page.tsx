'use client'

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/core/domain/entities/Product";
import { makeProductUseCases } from "@/core/factories/makeProductUseCases";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const productUseCases = makeProductUseCases(); 
      const allProducts = await productUseCases.findAllProducts.execute();
      setProducts(allProducts);
    }
    fetchProducts();
  }, []);
  
  return (

    <main className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[calc(100vh-8rem)]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}