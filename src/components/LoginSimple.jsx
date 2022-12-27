import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue, InputGroup, InputRightElement, CircularProgress
} from '@chakra-ui/react';
import { useState } from 'react';

import { userLogin } from '../utils/mockapi';
import ErrorMessage from '../components/ErrorMessage';

export default function LoginSimple({ title }) {

    const [show, setShow] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => setShow(!show)

    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        try {
            console.log(email, password)
            const res = await userLogin({ email, password });
            console.log(res)
            setIsLoggedIn(true);
            setIsLoading(false);
        } catch (error) {
            setError('Invalid username or password');
            setIsLoading(false);
            setEmail('');
            setPassword('');
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'xl'}>{title}</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Acceda con su usuario y contraseña
                    </Text>
                </Stack>
                {isLoggedIn ? (
                    <Box textAlign="center">
                        <Text>{email} Ingreso existoso!</Text>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            onClick={() => setIsLoggedIn(false)}
                        >
                            Salir
                        </Button>
                    </Box>
                ) : (
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" onChange={event => setEmail(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input type={show ? 'text' : 'password'} onChange={event => setPassword(event.currentTarget.value)} />
                                    <InputRightElement width='4.5rem'>
                                        <Button size='xs' onClick={handleClick}>
                                            {show ? 'Ocultar' : 'Mostrar'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Recuérdame</Checkbox>
                                    <Link color={'blue.400'}>¿Olvido su contraseña?</Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{ bg: 'blue.500', }} onClick={(e) => handleSubmit(e)}>
                                    {isLoading ? (
                                        <CircularProgress
                                            isIndeterminate
                                            size="24px"
                                            color="teal"
                                        />
                                    ) : (
                                        'Acceder'
                                    )}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                )}
            </Stack>
        </Flex>
    );
}
