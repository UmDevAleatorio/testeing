'use client'

import { useState, FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'
import styled from 'styled-components'
import { colors } from '@/styles/colors'
import Link from 'next/link'

const SRegisterPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px); // Altura da tela menos Header e Footer
  background-color: ${colors.mediumGray};
`

const SRegisterForm = styled.form`
  background-color: ${colors.white};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;

  h1 {
    font-size: 2rem;
    color: ${colors.primaryDark};
    margin-bottom: 1.5rem;
  }
`

const SInputGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${colors.primaryDark};
  }

  input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid ${colors.lightGray};
    border-radius: 8px;
  }
`

const SButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
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
`

const SLoginLink = styled.p`
  margin-top: 1.5rem;
  color: ${colors.primaryDark};

  a {
    color: ${colors.primaryDark};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signUp } = useAuth()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!name || !email || !password) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    // 4. Chama a função de cadastro do AuthContext
    await signUp({ name, email, password })
  }

  return (
    <SRegisterPage>
      <SRegisterForm onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>
        <SInputGroup>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            required
          />
        </SInputGroup>
        <SInputGroup>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            required
          />
        </SInputGroup>
        <SInputGroup>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crie uma senha forte"
            required
          />
        </SInputGroup>
        <SButton type="submit">Cadastrar</SButton>

        <SLoginLink>
          Já tem uma conta? <Link href="/login">Faça login</Link>
        </SLoginLink>
      </SRegisterForm>
    </SRegisterPage>
  )
}