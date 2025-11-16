'use client'

import { useState, FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { makeProductUseCases } from '@/core/factories/makeProductUseCases'
import { CreateProduct } from '@/core/domain/use-cases/CreateProduct'

type ProductFormProps = {
  open: boolean 
  onOpenChange: (open: boolean) => void
  onSaveSuccess: () => void 
}

export function ProductForm({
  open,
  onOpenChange,
  onSaveSuccess,
}: ProductFormProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  const { createProduct } = makeProductUseCases()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      if (!name || !price || !stock || !photoUrl) {
        alert('Por favor, preencha todos os campos.')
        return
      }

      await createProduct.execute({
        name,
        price: parseFloat(price),
        stock: parseInt(stock), 
        photoUrl,
      })

      alert('Produto salvo com sucesso!')
      onSaveSuccess() 
      onOpenChange(false) 
      
      setName('')
      setPrice('')
      setStock('')
      setPhotoUrl('')

    } catch (error: any) {
      alert(`Erro ao salvar produto: ${error.message}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo produto.
          </DialogDescription>
        </DialogHeader>

        <form id="product-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Preço (R$)
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Estoque
            </Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photoUrl" className="text-right">
              URL da Foto
            </Label>
            <Input
              id="photoUrl"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="col-span-3"
            />
          </div>
        </form>

        <DialogFooter>
          <Button type="submit" form="product-form">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}