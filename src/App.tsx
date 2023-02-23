import { useState } from 'react'
import React from 'react';
import './App.css'

interface FormData {
  email: string
  firstName: string
  lastName: string
  language: string
}

function isEmailValid(email: string, regex: RegExp) {
  return regex.test(email)
}

function calculateProgress(fields: { [key: string]: { value: string, weight: number, regex?: RegExp } }) {
  const progress = Object.values(fields)
    .reduce((total, { value, weight, regex }) => {
      if (value) {
        if (regex && !isEmailValid(value, regex)) {
          return total
        }
        return total + weight
      }
      return total
    }, 0)

  return progress
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    language: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormData({ email: '', firstName: '', lastName: '', language: '' })
  }

  const fields = {
    email: { value: formData.email, weight: 25, regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ },
    firstName: { value: formData.firstName, weight: 25 },
    lastName: { value: formData.lastName, weight: 25 },
    language: { value: formData.language, weight: 25 }
  }

  const progress = calculateProgress(fields)

  return (
    <div>
      <h1>Cadastro</h1>
      <div className='bar-container'>
        <div className='bar-progress' style={{ width: `${progress}%` }}></div>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <p>E-mail</p>
        <input type='text' name='email' onChange={handleInputChange} value={formData.email} />
        <p>Nome</p>
        <input type='text' name='firstName' onChange={handleInputChange} value={formData.firstName} />
        <p>Sobrenome</p>
        <input type='text' name='lastName' onChange={handleInputChange} value={formData.lastName} />
        <p>Linguagem</p>
        <select name="language" onChange={handleInputChange} value={formData.language}>
          <option value="java">Java</option>
          <option value="ruby">Ruby</option>
          <option value="python">Python</option>
          <option value="php">PHP</option>
        </select>
        <button disabled={progress !== 100}>Enviar!</button>
      </form>
    </div>
  )
}

export default App