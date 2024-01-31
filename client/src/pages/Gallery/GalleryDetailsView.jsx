import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'; // Import useParams from react-router-dom
import {GalleryCard} from './components'
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder'
import {StylishHeader} from '../../components'
import {Box, Image, Grid, SimpleGrid, Stack, Flex, Text} from '@chakra-ui/react';

function GalleryDetailsView() {
    let {name} = useParams(); // gets 'id' param from URL

    const [material, setMaterial] = useState([])

    useEffect(() => {
        const loadMaterial = async () => {
            const loadedMaterial = [];
            const images = await loadImagesFromFolder(name);
            loadedMaterial.push(images)

            setMaterial(loadedMaterial);

        };
        loadMaterial();

    }, []);
    // const formatting = /[_-]/g
    // const formattedName = name.replace(formatting, ' ')


    return (
        <Box width='100vw' h='100vh'>
            <Box py='5rem'>
                <StylishHeader sx={{textAlign: 'center'}} pt="10" text={`MATERIAL DETAILS:`} />
            </Box>
            <Box w='90%' h='100%' textAlign={'center'} >
                <Text>{material[0]}</Text>


            </Box >
        </Box>
    )
}

export default GalleryDetailsView