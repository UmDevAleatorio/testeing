'use client'
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { SProductCard } from "./styles";
import addIcon from '@/assets/add.svg'; 

type ProductCardProps = {
    product: {
        id: string;
        name: string;
        price: string;
        imageUrl: StaticImageData;
    }
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <SProductCard>
            <figure>
                <Image src={product.imageUrl} alt={product.name} width={180} height={180} />
                <figcaption>
                    <span>{product.price}</span>
                    <button title="Adicionar ao carrinho">
                        {/* MUDANÇA AQUI: Usando a variável correta */}
                        <Image src={addIcon} alt="Adicionar ao Carrinho" width={40} height={40} />
                    </button>
                </figcaption>
            </figure>
            <Link href={`/produtos/${product.id}`}>Ver detalhes</Link>
        </SProductCard>
    )
}