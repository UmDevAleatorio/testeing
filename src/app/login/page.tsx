'use client'

import { useState, FormEvent } from 'react'
import { useAuth } from '@/context/AuthContext'
import styled from 'styled-components'
import { colors } from '@/styles/colors'
import Link from 'next/link'

const SLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px); // Altura da tela menos Header e Footer
  background-color: ${colors.mediumGray};
`

const SLoginForm = styled.form`
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
    background-color: #3a4a6e; // Um tom um pouco mais claro de 'primaryDark'
  }
`

const SRegisterLink = styled.p`
  margin-top: 1.5rem;
  color: ${colors.primaryDark};

  a {
    color: ${colors.primaryDark}; // Pode ser uma cor de "link"
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { signIn } = useAuth()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault() // Impede o recarregamento da página

    if (!email || !password) {
      alert('Por favor, preencha o email e a senha.')
      return
    }

    await signIn({ email, password })
  }

  return (
    <SLoginPage>
      <SLoginForm onSubmit={handleSubmit}>
        <h1>Login</h1>
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
            placeholder="Sua senha"
            required
          />
        </SInputGroup>
        <SButton type="submit">Entrar</SButton>

        <SRegisterLink>
          Não tem uma conta? <Link href="/register">Cadastre-se</Link>
        </SRegisterLink>
      </SLoginForm>
    </SLoginPage>
  )
}