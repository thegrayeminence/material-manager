//lib imports
import React, {useEffect} from 'react';
import {Box} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';

//components
import {LandingPageText} from './components';
import './landingPage.css'

function LandingPageBackground() {

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const el = document.body;
            const {top: t, left: l, width: w, height: h} = el.getBoundingClientRect();

            el.style.setProperty('--posX', x - l - w / 2);
            el.style.setProperty('--posY', y - t - h / 2);
        };

        document.body.addEventListener('pointermove', handleMouseMove);

        return () => {
            document.body.removeEventListener('pointermove', handleMouseMove);
        };
    }, []);

    return (

        <Box className="background-animation"
            height={'100vh'} width={'100vw'} margin={0} padding={0} position={'fixed'} top={0} left={0} zIndex={-1}
        >
        </Box>

    );
}



function LandingPage() {

    return (

        <Box
            height={'100vh'} width={'100vw'} margin={0} padding={0} position={'fixed'} top={0} left={0}
        >
            <LandingPageText />
            <LandingPageBackground />

        </Box>

    );
}

export default LandingPage;