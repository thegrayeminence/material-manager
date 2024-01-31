import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'; // Import useParams from react-router-dom
import {GalleryCard} from './components'
import {loadImagesFromFolder} from '../../config/loadImagesFromFolder'
import {StylishHeader} from '../../components'
import {Box, Image, Grid, SimpleGrid, Stack, Flex, Text} from '@chakra-ui/react';

function GalleryDetailsView() {
    let {name} = useParams(); // gets 'id' param from URL

    const [material, setMaterial] = useState([])
    const folderName = [name]
    useEffect(() => {
        const loadMaterial = async () => {
            const loadedMaterial = [];
            for (let folder of folderName) {
                const images = await loadImagesFromFolder(folder);
                loadedMaterial.push(folder, images)
            }
            setMaterial(loadedMaterial);

        };

        loadMaterial();

    }, []);
    console.log(material[1])

    // const formatting = /[_-]/g
    // const formattedName = name.replace(formatting, ' ')
    // const materialName = material[0].replace(/_/g, ' ')
    // const materialNameFormatted = materialName.charAt(0).toUpperCase() + materialName.slice(1)
    // const image_urls = material[1].map((image) => {
    //     return image.toString()
    // })

    return (
        <Box width='100vw' h='100vh'>
            <Box py='5rem'>
                <StylishHeader sx={{textAlign: 'center'}} pt="10" text={`MATERIAL DETAILS:`} />
            </Box>
            <Box w='90%' h='100%' textAlign={'center'} >
                {/* <Text>{name}</Text> */}
                <Text>{material[1][0]}</Text>
                <GalleryCard key={material[0]} name={material[0]} images={material[1]} isNew={true} />

            </Box >
        </Box>
    )
}

export default GalleryDetailsView