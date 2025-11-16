'use client'
import { SMainIndex } from "./styles";
import { ProductCard } from "../ProductCard";
import betoneiraImg from '@/assets/betoneira.jpeg';
import marteloImg from '@/assets/martelo.jpeg';
import chaveinglesaImg from '@/assets/chaveinglesa.jpeg';
import sacosdecimentoImg from '@/assets/sacosdecimento.jpeg';
import sacodeareiaImg from '@/assets/sacodeareia.jpeg';
import serraeletricaImg from '@/assets/serraeletrica.jpeg';
import carrinhodemaoImg from '@/assets/carrinhodemao.jpeg';
import serracircularImg from '@/assets/serracircular.jpeg';

const productsData = [
    { id: '1', name: 'Betoneira', price: 'R$ 1.799', imageUrl: betoneiraImg },
    { id: '2', name: 'Martelo', price: 'R$ 39', imageUrl: marteloImg },
    { id: '3', name: 'Chave Inglesa', price: 'R$ 59', imageUrl: chaveinglesaImg },
    { id: '4', name: 'Saco de Cimento', price: 'R$ 100', imageUrl: sacosdecimentoImg },
    { id: '5', name: 'Saco de Areia', price: 'R$ 10,99', imageUrl: sacodeareiaImg },
    { id: '6', name: 'Serra Elétrica', price: 'R$ 1.159', imageUrl: serraeletricaImg },
    { id: '7', name: 'Carrinho de Mão', price: 'R$ 349', imageUrl: carrinhodemaoImg },
    { id: '8', name: 'Serra Circular', price: 'R$ 529', imageUrl: serracircularImg },
];

export function MainIndex() {
    return (
        <SMainIndex>
            {productsData.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </SMainIndex>
    )
}