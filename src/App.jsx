import { useState } from 'react'
import { ChakraProvider, Divider, HStack, Flex, Box, Spacer, Heading, ButtonGroup, Button, Container } from '@chakra-ui/react'
import LoginSimple from './components/LoginSimple'
import Main from './pages/Main'
import ThemeToggler from './components/ThemeToggler'
import DashPresupuesto from './components/DashPresupuesto'

import { Routes, Route, Outlet, Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'


function Layout() {
  return (
    <>

      <Divider />
      <Flex minWidth='max-content' alignItems='center' gap='2' m='2'>
        <Box p='2'>

        </Box>

        <HStack spacing='24px'>

          <Breadcrumb spacing='8px' separator='-'>

            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to='/'>
                <Heading size='md'>Home</Heading>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to='/about'>
                <Heading size='md'>About</Heading>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to='/dashboard'>
                <Heading size='md'>Dash</Heading>
              </BreadcrumbLink>
            </BreadcrumbItem>

          </Breadcrumb>

        </HStack>

        <Spacer />
        <ButtonGroup gap='2'>
          <Button >Sign Up</Button>
          <Button >Log in</Button>
        </ButtonGroup>
      </Flex>

      <Divider />

      <Outlet />

    </>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}


function App() {
  return (
    <ChakraProvider>
      <HStack alignItems="center" justifyContent="space-around">
        <Heading size='md'>Presupuesto Trancas App</Heading>
        <ThemeToggler />
      </HStack>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<DashPresupuesto />} />
        </Route>
      </Routes>
      { //<LoginSimple title="Presupuesto App - Municipalidad de Trancas" />
      }
    </ChakraProvider>
  )
}

export default App
