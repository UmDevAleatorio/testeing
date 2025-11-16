'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { colors } from '@/styles/colors'
import { makeProductUseCases } from '@/core/factories/makeProductUseCases'
import { Product } from '@/core/domain/entities/Product'

const SAdminPage = styled.div`
  padding: 2rem 3rem;
  background-color: ${colors.mediumGray};
  min-height: calc(100vh - 120px); // Altura da tela menos Header e Footer
`

const SAdminHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: ${colors.primaryDark};
  }

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    background-color: ${colors.primaryDark};
    color: ${colors.white};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #3a4a6e;
    }
  }
`

const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden; /* Para o border-radius funcionar nas bordas da tabela */

  th,
  td {
    padding: 1rem 1.5rem;
    text-align: left;
    border-bottom: 1px solid ${colors.lightGray};
  }

  thead {
    background-color: ${colors.lightGray};

    th {
      color: ${colors.primaryDark};
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  tbody {
    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;

    button {
      padding: 0.5rem;
      font-size: 0.8rem;
      border: 1px solid ${colors.lightGray};
      border-radius: 6px;
      cursor: pointer;
      background-color: ${colors.white};

      &:hover {
        background-color: ${colors.lightGray};
      }
    }

    .delete-button {
      color: #ef4444; // Vermelho para o botão de excluir
      border-color: #ef4444;
      &:hover {
        background-color: #fef2f2; // Fundo vermelho claro no hover
      }
    }
  }
`

export default function AdminProdutosPage() {
  const [products, setProducts] = useState<Product[]>([])

  const { findAllProducts } = makeProductUseCases()

  const loadProducts = async () => {
    try {
      const fetchedProducts = await findAllProducts.execute()
      setProducts(fetchedProducts)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
      alert('Não foi possível carregar os produtos.')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <SAdminPage>
      <SAdminHeader>
        <h1>Gerenciar Produtos</h1>
        <button>Adicionar Produto</button>
      </SAdminHeader>

      <STable>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* 5. Faz um loop na lista de produtos e exibe na tabela */}
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name.value}</td>
              <td>{product.price.formatted}</td>
              <td>{product.stock}</td>
              <td className="actions">
                <button>Editar</button>
                <button className="delete-button">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </STable>
    </SAdminPage>
  )
}