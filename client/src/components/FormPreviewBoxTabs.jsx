import React from 'react';
import {Box, Stack, Flex, Grid, Text, useBoolean, Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue, useColorMode} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useMaterialStore} from '../store/store';

const MotionBox = motion(Box);

const FormPreviewBoxTabs = () => {
    const {formData} = useMaterialStore();
    const {materialData} = formData;
    const {materialTextures, materialMetadata, materialType, color, elementType, condition, manifestation} = materialData;
    const [previewBoxIsLoading, setPreviewBoxIsLoading] = useBoolean(false);


    const strippedNames = () => {
        return `${color.replace(/\s*/g, '')}_${elementType.replace(/\s*/g, '')}_${manifestation.replace(/\s*/g, '')}_${condition.replace(/\s*/g, '')}`;
    };

    return (
        <Stack px="2rem" width={'80vw'} ml="10%">
            <MotionBox
                w="100%"
                maxW="75rem"
                overflow="clip"
                margin="0 auto"
                borderWidth=".1rem"
                p="2.5rem"
                borderRadius="2rem"
                backdropFilter="auto"
                shadow="lg"
                whileHover={{scale: 1.05, backdropFilter: 'blur(10px)'}}

            >
                <Tabs variant="soft-rounded" colorScheme="purple">
                    <TabList>
                        <Tab>Descriptions</Tab>
                        <Tab>Raw Data</Tab>
                        <Tab>Graphics</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex direction="column" align="center" w="100%" maxH="35vh">
                                <>

                                    {/* <Heading size='lg'sx={bodyStyle}>Material Preview</Heading> */}
                                    <Box>
                                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                            <Box w="100%" p={4}>
                                                {materialType && <Text sx={bodyStyle}> {materialType['label']} </Text>}
                                            </Box>
                                            <Box w="100%" p={4}>
                                                {materialTextures && materialTextures.map((i) => <Text sx={headerStyle} key={i['label']}>{i['label']}</Text>)}
                                            </Box>
                                            <Box w="100%" p={4}>
                                                {materialMetadata && materialMetadata.map((i) => <Text sx={headerStyle} key={i['label']}>{i['label']}</Text>)}
                                            </Box>
                                        </Grid>
                                    </Box>
                                    <Box>
                                        {/* CONDITION: */}
                                        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                                            <Box w="100%" p={4}>
                                                {color && <Text sx={bodyStyle}> Color:</Text>}
                                                {color && <Text sx={headerStyle}>{color}</Text>}
                                            </Box>
                                            <Box w="100%" p={4}>
                                                {elementType && <Text sx={bodyStyle}> Element Type:</Text>}
                                                {elementType && <Text sx={headerStyle}>{elementType}</Text>}
                                            </Box>
                                            <Box w="100%" p={4}>
                                                {manifestation && <Text sx={bodyStyle}> Manifestation:</Text>}
                                                {manifestation && <Text sx={headerStyle}>{manifestation}</Text>}
                                            </Box>
                                            <Box w="100%" p={4}>
                                                {condition && <Text sx={bodyStyle}> Condition:</Text>}
                                                {condition && <Text sx={headerStyle}>{condition}</Text>}
                                            </Box>

                                        </Grid>

                                        <Box w="100%" p={4}>
                                            {(color || elementType || manifestation || condition) && <Text sx={headerStyle}>Material Name:</Text>}
                                            {(color || elementType || manifestation || condition) && <Text sx={bodyStyle}> {strippedNames()}</Text>}
                                        </Box>


                                    </Box>

                                </>

                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            {/* Content for Raw Data */}
                        </TabPanel>
                        <TabPanel>
                            {/* Content for Graphics */}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </MotionBox>
        </Stack>
    );
};

export default FormPreviewBoxTabs;
