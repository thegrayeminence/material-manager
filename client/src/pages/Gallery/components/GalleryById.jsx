import React from 'react';
import {useParams} from 'react-router-dom';
import {Box, Heading, Spacer, useColorModeValue} from '@chakra-ui/react';
import TextureDisplayById from '../components/TextureDisplayById'
import {PreviewBackgroundAnimation} from '../../Preview/components'
import '../../LandingPage/landingPage.scss';

function GradientBackground() {
    return (
        <Box className="background-animation"
            height={'100vh'}
            width={'100vw'}
            position={'absolute'}
            top={0} left={0}
            zIndex={0}
            opacity={useColorModeValue('.2', '.2')}
            backgroundBlendMode={useColorModeValue('luminosity', 'overlay')}
        >
        </Box>
    )
}

function GalleryById() {
    const {id} = useParams();

    return (
        <Box width='100vw' h='100%' position={'relative'} opacity={'99.9%'}
            // opacity={'99.9%'}
            // backgroundBlendMode={'difference'}
            bg={useColorModeValue('gray.400', 'gray.800')}

        >

            <Box
                // bg={useColorModeValue('gray.400', 'gray.800')}
                spacing={0} overflow={'hidden'}
                maxW='90vw' mx='auto'

            >
                <Spacer h={'60px'} />
                <TextureDisplayById materialId={id} />
            </Box>
            <Box width={'100vw'} height={'100%'} margin={0} padding={0} position={'fixed'} top={0} left={0}
                zIndex={-2}>
                <PreviewBackgroundAnimation />
                <GradientBackground />
            </Box>
            <Spacer h='60px' />
        </Box>
    );
}

export default GalleryById;