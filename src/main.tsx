import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { cmm, theme } from './theme';
import Header from './components/Header';
import Content from './Content';
import DotsBackground from './components/DotsBackground';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme} colorModeManager={cmm}>
            <Header />
            <Content />
            <DotsBackground />
        </ChakraProvider>
    </React.StrictMode>
);
