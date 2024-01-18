import React from 'react';
import {Box, Stack, Flex, Grid, Text, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useMaterialStore} from '../store/store';
import JsonTreeVisualization from '../components/UI/JsonTreeVisualization'

const MotionBox = motion(Box);

const FormPreviewBoxTabs = () => {
    const {formData} = useMaterialStore();
    const {materialData} = formData;
    const {materialTextures, materialMetadata, materialType, color, elementType, condition, manifestation} = materialData;

    const headerStyle = {
        fontWeight: 'semibold',
        color: 'slateblue',
        letterSpacing: '.2rem',
        fontFamily: 'Avenir Next',
        lineHeight: '1.35rem',
    };

    const bodyStyle = {
        fontWeight: 'medium',
        color: 'slategrey',
        letterSpacing: '.1rem',
        fontFamily: 'Avenir Next',
        lineHeight: '2rem',
        fontSize: '1.25rem'
    };

    const strippedNames = () => {
        return `${color.replace(/\s*/g, '')}_${elementType.replace(/\s*/g, '')}_${manifestation.replace(/\s*/g, '')}_${condition.replace(/\s*/g, '')}`;
    };
    const formattedData = JSON.stringify(formData, null, 2);


    return (
        <Stack px="2rem" width={'80vw'} ml="10%" maxHeight={'35vh'}>
            <MotionBox
                w="100%"
                maxW="75rem"
                overflow="clip"
                margin="0 auto"
                borderWidth=".1rem"
                px="2.5rem"
                py={"1.5rem"}
                borderRadius="2rem"
                backdropFilter="auto"
                shadow="lg"
                whileHover={{scale: 1.05, backdropFilter: 'blur(10px)'}}
            >
                <Tabs variant="enclosed" colorScheme="purple">
                    <TabList>
                        <Tab>Text</Tab>
                        <Tab>JSON Output</Tab>
                        <Tab>Graphics</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="purple.500"
                        borderRadius="1px"
                    />
                    <TabPanels>
                        <TabPanel>
                            <Flex direction="column" align="center" w="100%" maxH="35vh">
                                <Box>
                                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                        <Box w="100%" p={4}>
                                            {materialType && <Text sx={headerStyle}>Type: {materialType['label']}</Text>}
                                        </Box>
                                        <Box w="100%" p={4}>
                                            {materialTextures && materialTextures.map((texture, index) => (
                                                <Text sx={headerStyle} key={index}>Texture: {texture['label']}</Text>
                                            ))}
                                        </Box>
                                        <Box w="100%" p={4}>
                                            {materialMetadata && materialMetadata.map((metadata, index) => (
                                                <Text sx={headerStyle} key={index}>Metadata: {metadata['label']}</Text>
                                            ))}
                                        </Box>
                                    </Grid>
                                </Box>
                                <Box>
                                    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                                        <Box w="100%" p={4}>
                                            {color && <Text sx={bodyStyle}>Color: {color}</Text>}
                                        </Box>
                                        <Box w="100%" p={4}>
                                            {elementType && <Text sx={bodyStyle}>Element Type: {elementType}</Text>}
                                        </Box>
                                        <Box w="100%" p={4}>
                                            {manifestation && <Text sx={bodyStyle}>Manifestation: {manifestation}</Text>}
                                        </Box>
                                        <Box w="100%" p={4}>
                                            {condition && <Text sx={bodyStyle}>Condition: {condition}</Text>}
                                        </Box>
                                    </Grid>

                                    {/* <Box w="100%" p={4}>
                                        {(color || elementType || manifestation || condition) && <Text sx={headerStyle}>Material Name: {strippedNames()}</Text>}
                                    </Box> */}
                                </Box>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Text whiteSpace="pre-wrap">
                                {formattedData}
                            </Text>
                        </TabPanel>
                        <TabPanel>
                            <JsonTreeVisualization materialData={materialData} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </MotionBox>
        </Stack>
    );
};

export default FormPreviewBoxTabs;
