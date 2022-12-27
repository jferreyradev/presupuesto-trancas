import React, { useEffect, useState } from 'react'
import { useResource } from "./useResource";
import axios from 'axios';
import {Input, Button, Select, Container, HStack, TableContainer, Table, Thead, Tfoot, TableCaption, Tr, Td, Th, Tbody } from '@chakra-ui/react';

const DashPresupuesto = () => {
	const [list, setList] = useState([])
	const [cabpre, setCabpre] = useState([])
	const [detpre, setDetpre] = useState([])
	const [iddet, setIddet] = useState()

	useEffect(() => {
		axios.get('http://localhost:3000/api/entity/tipoPresupuesto')
			.then((response) => setList(response.data))
	}, [])

	function cargarCabPresupuesto(id) {
		console.log('cargando')
		axios.get('http://localhost:3000/api/entity/cabPresupuesto?idtipopre=' + id)
			.then((response) => { setCabpre(response.data) })
			.catch(error => setCabpre([]))
	}

	function cargarDetPresupuesto() {
		console.log('cargando')
		if (iddet) {
			axios.get('http://localhost:3000/api/entity/detPresupuesto?idcab=' + iddet)
				.then((response) => { setDetpre(response.data) })
				.catch(error => setDetpre([]))
		}
	}

	return (
		<>
			<Container maxW='max'>
				<HStack>
					<Select placeholder='Seleccione un opcion' onChange={(e) => cargarCabPresupuesto(e.target.value)}>
						{list.map((item) => (
							<option key={item.id} value={item.id}>{item.descripcion}</option>
						))}
					</Select>
					<Select placeholder='Seleccione un opcion' onChange={(e) => setIddet(e.target.value)}>
						{cabpre && cabpre.map((item) => (
							<option key={item.id} value={item.id}>{item.descripcion}</option>
						))}
					</Select>
					<Button onClick={() => cargarDetPresupuesto()} >Cargar</Button>
				</HStack>

				<TableContainer>
					<Table variant='simple' size='sm'>
						<TableCaption>Imperial to metric conversion factors</TableCaption>
						<Thead>
							<Tr>
								<Th>Id</Th>
								<Th>Cuenta</Th>
								<Th>Descripción</Th>
								<Th>Importe</Th>
								<Th>-</Th>
							</Tr>
						</Thead>
						<Tbody>
							{detpre && detpre.map((item) => (
								<Tr key={item.id}>
									<Td>{item.id}</Td>
									<Td>{item.cuenta}</Td>
									<Td>{item.descripcion}</Td>
									{item.hijo===1? <Td> <Input htmlSize={4} width='auto' />{item.monto}</Td>:<Td isNumeric>{item.monto}</Td>}
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);

}

export default DashPresupuesto