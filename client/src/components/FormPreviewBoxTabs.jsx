import React from 'react';
import {Box, Spacer, Stack, Flex, Grid, Text, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, useColorModeValue} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useMaterialStore} from '../store/store';
import JsonTreeVisualization from '../components/UI/JsonTreeVisualization'

const MotionBox = motion(Box);

const FormPreviewBoxTabs = () => {
    const {formData} = useMaterialStore();
    const {materialData} = formData;
    const {materialTextures, materialMetadata, materialType, color, elementType, condition, manifestation} = materialData;

    const style1 = {
        fontWeight: 'medium',
        color: 'teal.400',
        letterSpacing: '.2rem',
        fontFamily: 'Avenir Next',
        lineHeight: '1.35rem',
        fontSize: '1rem'
    };

    const style2 = {
        fontWeight: 'medium',
        color: 'grey.400',
        letterSpacing: '.1rem',
        fontFamily: 'Avenir Next',
        lineHeight: '2rem',
        fontSize: '1.25rem'
    };


    const style3 = {
        fontWeight: 'book',
        color: 'teal.400',
        letterSpacing: '.1rem',
        fontFamily: 'Avenir Next',
        lineHeight: '2rem',
        fontSize: '1.25rem',

    };

    const strippedNames = () => {
        return `${color.replace(/\s*/g, '')}_${elementType.replace(/\s*/g, '')}_${manifestation.replace(/\s*/g, '')}_${condition.replace(/\s*/g, '')}`;
    };
    const strippedNames_withspaces = () => {
        return `'${color.replace(/\s*/g, '')} ${elementType.replace(/\s*/g, '')} ${manifestation.replace(/\s*/g, '')} ${condition.replace(/\s*/g, '')}'`;
    };
    const formattedData = JSON.stringify(formData, null, 2);


    return (
        <Stack px="2rem" width={'80vw'} ml="10%" maxHeight={'35vh'}>
            <MotionBox
                w="100%"
                maxW="75rem"
                overflow={'scroll'}
                margin="0 auto"
                borderWidth=".1rem"
                px="2.5rem"
                py={"1.5rem"}
                bg={useColorModeValue('whiteAlpha.300', 'blackAlpha.400')}
                borderColor={useColorModeValue('whiteAlpha.300', 'whiteAlpha.400')}
                borderRadius="2rem"
                backdropFilter="blur(10px)"
                shadow="lg"
                whileHover={{
                    scale: 1.05,
                    backdropFilter: 'blur(20px)'
                }}
                transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            >

                <Tabs variant="enclosed" colorScheme="teal">
                    <TabList color={'purple.400'}>
                        <Tab>Text</Tab>
                        <Tab isDisabled>JSON Output</Tab>
                        <Tab >Graphics</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="teal.600"
                        borderRadius="1px"
                    />
                    <TabPanels>
                        <TabPanel>
                            <Flex direction="column" align="center" w="100%" maxH="35vh" >
                                <Box>
                                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                        <Box w="100%" p={4}>
                                            {materialType && <Text sx={style2}>Type:</Text>}
                                            {materialType && <Text sx={style1}>{materialType['label']}</Text>}
                                            <Spacer py={'1rem'} />
                                            {materialMetadata && <Text sx={style2}>Metadata:</Text>}
                                            {materialMetadata && materialMetadata.map((metadata, index) => (
                                                <Text sx={style1} key={index}>{metadata['label']}</Text>
                                            ))}

                                        </Box>
                                        <Box w="100%" p={4}>
                                            {materialTextures && materialTextures.length > 0 && <Text sx={style2}>Texture Maps:</Text>}
                                            {materialTextures && materialTextures.map((texture, index) => (
                                                <Text sx={style1} key={index}>{texture['label']}</Text>
                                            ))}
                                        </Box>
                                        <Box w="100%" p={4} >
                                            <Grid templateColumns="repeat(1, 2fr)" gap={6}>
                                                <Box w="100%">
                                                    {(color || elementType || manifestation || condition) && <Text sx={style2}>Prompt:</Text>}
                                                </Box>
                                                <Box w="100%">
                                                    {(color || elementType || manifestation || condition) && <Text sx={style3}>{strippedNames_withspaces().toLowerCase()}</Text>}
                                                </Box>
                                            </Grid>

                                        </Box>

                                    </Grid>
                                </Box>

                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Text whiteSpace="pre-wrap">
                                {formattedData}
                            </Text>
                        </TabPanel>
                        <TabPanel >
                            <Flex direction="column" align="center" w="100%" maxH="35vh" >
                                <JsonTreeVisualization materialData={materialData} />
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </MotionBox>
        </Stack>
    );
};

export default FormPreviewBoxTabs;
