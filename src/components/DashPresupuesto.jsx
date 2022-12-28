import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Select, Container, HStack, TableContainer, Table, Thead, TableCaption, Tr, Td, Th, Tbody } from '@chakra-ui/react';

import { IconButton, useEditableControls, ButtonGroup, } from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

import {
	NumberInput,
	NumberInputField
} from '@chakra-ui/react'

function EditableControls() {
	const {
		isEditing,
		getSubmitButtonProps,
		getCancelButtonProps,
		getEditButtonProps,
	} = useEditableControls()

	return isEditing ? (
		<ButtonGroup size='xs'>
			<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
			<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
		</ButtonGroup>
	) : (
		<IconButton size='xs' m={2} icon={<EditIcon />} {...getEditButtonProps()} />
	)
}


const DashPresupuesto = () => {
	const [list, setList] = useState([])
	const [cabpre, setCabpre] = useState([])
	const [detpre, setDetpre] = useState([])
	const [iddet, setIddet] = useState()
	const [cambios, setCambios] = useState()
	const [valores, setValores] = useState()

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

	function actualizarDetPresupuesto(obj) {
		console.log('actualizando')
		axios.put('http://localhost:3000/api/entity/detPresupuesto', obj)			
			.catch(error => console.log("error"))
	}

	const handleBlur = (e, id) => {
		e.preventDefault()
		if (e.target.value) {
			setCambios({ id, monto: e.target.value })
		}
	}

	const handleFocus = (e, id) => {
		e.preventDefault()
		e.target.select()
		if (e.target.value) {
			setValores({ id, monto: e.target.value })
		}
		if (cambios && e.target.value !== cambios.monto) {
			if (valores.id !== cambios.id || valores.monto !== cambios.monto) {
				console.log(cambios)
				actualizarDetPresupuesto(cambios)
				setCambios(null)
			}
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
									{item.hijo === 1 ? <Td >
										{/* Here is the custom input */}
										<NumberInput defaultValue={String(item.monto)} precision={2} step={0.2} >
											<NumberInputField textAlign="right"
												onFocus={(e) => handleFocus(e, item.id)}
												onBlur={(e) => handleBlur(e, item.id)}
											/>
										</NumberInput >
									</Td> : null}
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}

export default DashPresupuesto