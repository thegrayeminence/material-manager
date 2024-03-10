import React from 'react';
import {Box, Spacer, Stack, Flex, Grid, GridItem, Text, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, useColorModeValue, Container, VStack} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useMaterialStore} from '../../../store/store';
import '@fontsource/poppins';
import '@fontsource/inter';

const MotionBox = motion(Box);

const FormPreviewBoxTabs = () => {
    const {formData} = useMaterialStore();
    const {materialData} = formData;
    const {materialTextures, materialMetadata, materialType, color, elementType, condition, manifestation} = materialData;

    const style1 = {
        fontWeight: '500',
        color: useColorModeValue('royalblue', 'indigo'),
        letterSpacing: '.2rem',
        fontFamily: 'Avenir Next, sans-serif',
        lineHeight: '1.35rem',
        fontSize: ['.9rem', '.95rem', '1rem', '1.05rem', '1.15rem']
    };

    const style2 = {
        fontWeight: '600',
        color: useColorModeValue('twitter.300', 'purple.400'),
        letterSpacing: '.1rem',
        fontFamily: 'Avenir Next, sans-serif',
        lineHeight: '2rem',
        fontSize: ['1rem', '1.05rem', '1.1rem', '1.15rem', '1.3rem']
    };


    const style3 = {
        fontWeight: '600',
        color: useColorModeValue('cyan', 'magenta'),
        letterSpacing: '.15rem',
        fontFamily: 'Poppins, sans-serif',
        lineHeight: '2rem',
        fontSize: ['1.25rem', '1.3rem', '1.35rem', '1.4rem', '1.5rem']

    };

    const strippedNames = () => {
        return `${color.replace(/\s*/g, '')}_${elementType.replace(/\s*/g, '')}_${manifestation.replace(/\s*/g, '')}_${condition.replace(/\s*/g, '')}`;
    };
    const strippedNames_withspaces = () => {
        return `'${color.replace(/\s*/g, '')} ${elementType.replace(/\s*/g, '')} ${manifestation.replace(/\s*/g, '')} ${condition.replace(/\s*/g, '')}'`;
    };
    const formattedData = JSON.stringify(formData, null, 2);


    return (
        <Stack w='full' mx='auto'>
            <MotionBox
                w="100%"
                position="relative"
                whiteSpace={'pre-wrap'}
                overflow={'scroll'}
                margin="0 auto"
                borderWidth=".1rem"
                px="2.5rem"
                py={"1.5rem"}
                bg={useColorModeValue('whiteAlpha.200', 'blackAlpha.400')}
                borderColor={useColorModeValue('twitter.400', 'purple.400')}
                borderRadius="2rem"
                backdropFilter="blur(10px)"
                shadow="lg"
                whileHover={{
                    scale: 1.05,
                    backdropFilter: 'blur(20px)'
                }}
                transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            >

                <Tabs variant="enclosed"
                    colorScheme={useColorModeValue('twitter', 'purple')}


                >
                    <TabList
                        color={useColorModeValue('twitter.400', 'purple.300')}
                    >
                        <Tab fontFamily={'Avenir'} fontWeight={'800'}>Tips</Tab>
                        <Tab fontFamily={'Avenir'} fontWeight={'800'}>Prompt</Tab>

                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg={useColorModeValue('twitter.400', 'purple.300')}
                        borderRadius="1px"
                    />
                    <TabPanels>

                        {/* TIPS */}
                        <TabPanel>
                            <Container
                                // zIndex={-1}
                                maxW={'99%'}
                                h='auto'
                                borderRadius={'xl'}
                                boxShadow={'xl'}
                                borderStyle={'solid'}
                                borderWidth={'.15rem'}
                                borderColor={useColorModeValue('whiteAlpha.100', 'whiteAlpha.300')}

                                p={{base: '2', sm: '4', md: '6', lg: '8', xl: '10'}}
                            // bg={useColorModeValue('gray.100', 'gray.700')}
                            >
                                {/* TEXT FOR COMPONENT TIPS:
                                User Tips:
For optimal prompt semantics, use the two suffixes to broadly define your material (‘type’ for the category of the surface and ‘manifestation’ for the object it will be applied to)  and each prefixes as modifiers to narrow down those selections (e.g. type ‘stone’ can be narrowed down to ‘slate stone’ and manifestation ‘tiles’ to ‘tiles mossy’)

Prompt P1=material type
prefix=type modifier; suffix=type
“oak wood”

Instructions=“categorize your material and describe the properties of its surface, as in  ‘oak wood’ or ‘steel metal’ or ‘grass ground’”

Prompt P2=material manifestation
prefix=manifestation modifier; manifestation 
“varnished flooring”

Instructions=“describe the properties of the object upon whose surface the material will be applied (as in ‘varnished flooring’ as a valid manifestation of ‘oak wood’“)
                                
                                
                                */}


                                <Text fontSize={'1.25rem'} fontWeight={'600'} color={useColorModeValue('cyan.400', 'pink.400')} letterSpacing={'.1rem'} fontFamily={'Avenir'} lineHeight={'2rem'}>Tips for Optimal Results:
                                </Text>
                                <Spacer py={'.25rem'} />
                                <Text fontSize={'1rem'} fontWeight={'500'} color={useColorModeValue('twitter.200', 'purple.300')} letterSpacing={'.1rem'} fontFamily={'Avenir Next'} lineHeight={'2rem'}>The wording and structure of your text prompt will be the biggest factor in deciding the visual features of the images generated by Stable Diffusion.
                                    <br /><br />For optimal results, try using the suffixes to broadly describe your material
                                    (‘type’ to classify the material itself and ‘manifestation’ to define the object it will be applied to)
                                    and the prefixes as modifiers to narrow down those descriptions. For example, a material of type ‘stone’ and manifestation 'tiles' could be narrowed down to 'slate stone mossy tiles'.
                                </Text>
                                <Spacer py={'1rem'} />
                                {/* <Text fontSize={'1.25rem'} fontWeight={'medium'} color={useColorModeValue('teal.300', 'facebook.300')} letterSpacing={'.1rem'} fontFamily={'Avenir Next'} lineHeight={'2rem'}>Part1: Material Type. Prefix1 (type-modifier, adj.) + Suffix1 (type, noun)
                                </Text> */}
                                {/* <Text fontSize={'1rem'} fontWeight={'medium'} color={useColorModeValue('teal.300', 'facebook.300')} letterSpacing={'.1rem'} fontFamily={'Avenir Next'} lineHeight={'2rem'}>Instructions: “categorize your material and describe the properties of its surface, as in  ‘oak wood’ or ‘steel metal’ or ‘grass ground’”
                                </Text>
                                <Spacer py={'1rem'} />
                                <Text fontSize={'1.25rem'} fontWeight={'medium'} color={useColorModeValue('teal.300', 'facebook.300')} letterSpacing={'.1rem'} fontFamily={'Avenir Next'} lineHeight={'2rem'}>Part2: Material Manifestation. Prefix2 (manifestation-modifier, adj.) + Suffix2 (manifestation, noun)
                                </Text>
                                <Text fontSize={'1rem'} fontWeight={'medium'} color={useColorModeValue('teal.300', 'facebook.300')} letterSpacing={'.1rem'} fontFamily={'Avenir Next'} lineHeight={'2rem'}>Instructions: “describe the properties of the object upon whose surface the material will be applied (as in ‘varnished flooring’ as a valid manifestation of ‘oak wood’“)
                                </Text> */}

                            </Container>
                        </TabPanel>

                        {/* PROMPT */}
                        <TabPanel>
                            <Flex direction="column" align="center" w="100%" maxH="35vh" textAlign={'center'} >
                                <Box>
                                    <Grid templateColumns="repeat(3, 1fr)" gap={8}>
                                        <GridItem colSpan={3}>
                                            <Box w="100%" p={4} >
                                                <VStack>
                                                    <Box w="100%">
                                                        {(color || elementType || manifestation || condition) && <Text sx={style3}>Prompt:</Text>}
                                                    </Box>
                                                    <Box w="100%">
                                                        {(color || elementType || manifestation || condition) && <Text sx={style3}>{strippedNames_withspaces().toLowerCase()}</Text>}
                                                    </Box>
                                                </VStack>

                                            </Box>
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <Box w="100%" p={4}>
                                                {materialType && <Text sx={style2}>Type:</Text>}
                                                {materialType && <Text sx={style1}>{materialType['label']}</Text>}
                                                <Spacer py={'1rem'} />
                                                {materialMetadata && <Text sx={style2}>Metadata:</Text>}
                                                {materialMetadata && materialMetadata.map((metadata, index) => (
                                                    <Text sx={style1} key={index}>{metadata['label']}</Text>
                                                ))}

                                            </Box>
                                        </GridItem>
                                        <GridItem colSpan={2}>
                                            <Box w="100%" p={4}>
                                                {materialTextures && materialTextures.length > 0 && <Text sx={style2}>Texture Maps:</Text>}
                                                {materialTextures && materialTextures.map((texture, index) => (
                                                    <Text sx={style1} key={index}>{texture['label']}</Text>
                                                ))}
                                            </Box>
                                        </GridItem>


                                    </Grid>
                                </Box>

                            </Flex>
                        </TabPanel>

                        {/* <TabPanel >
                            <Flex direction="column" align="center" w="100%" maxH="35vh" >
                                {<JsonTreeVisualization materialData={materialData} /> }
                            </Flex>
                        </TabPanel> */}
                    </TabPanels>
                </Tabs>
            </MotionBox>
        </Stack>
    );
};

export default FormPreviewBoxTabs;
