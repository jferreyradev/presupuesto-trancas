import { useColorMode, Box, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function ThemeToggler() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box textAlign="right" py={4} mr={12}>    
            <IconButton
                size="xl"
                variant="customIconButton"
                aria-label="Color mode icon"
                icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
            />
        </Box >
    );
}