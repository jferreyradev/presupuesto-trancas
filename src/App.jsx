import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import LoginSimple from './components/LoginSimple'
import Main from './pages/Main'
import ThemeToggler from './components/ThemeToggler'
import DashPresupuesto from './components/DashPresupuesto'

function App() {
  return (
    <ChakraProvider>      
        <ThemeToggler />
        { //<LoginSimple title="Presupuesto App - Municipalidad de Trancas" />
        }
        <DashPresupuesto />
    </ChakraProvider>
  )
}

export default App
