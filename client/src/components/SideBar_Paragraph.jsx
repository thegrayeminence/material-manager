import React from 'react'

export default function SideBar_Paragraph() {
    return (
        <>

            <Center>
                <MotionText color={useColorModeValue(colorThemeValues.light.textHeader, colorThemeValues.dark.textHeader)} sx={headerStyle} textAlign={'center'} >
                    Overview: <br />
                </MotionText>
            </Center >

            <Spacer py={'1.5rem'} />
            <Container
            >
                <MotionText sx={bodyStyle} color={useColorModeValue(colorThemeValues.light.textMain, colorThemeValues.dark.textMain)} >
                    TextureForge is a web-app designed to simplify the process of creating texture maps for game development, 3D renders,
                    and VFX projects, streamlining typical workflows for managing PBR<sup style="font-size: smaller;">1</sup> materials by offering a straightforward, free way to
                    generate them directly within the browser.
                    <br />
                    <span style="font-size: smaller;">1: <i>Physically Based Realism refers to a computer graphics technique/philosophy that has become the industry-standard for
                        creating photorealistic 3D renders and game engines.</i></span>
                    <br />
                    <br />
                    The site employs a practical, intuitive interface that leverages Stable Diffusion (an open-source generative AI model) to create the images,
                    ensuring that users can quickly get the materials they need with a minimum level of input and without having to compromise on quality or spend time
                    (and money) using proprietary software.
                    <br />
                    <br />
                    To use the service, a user can simply input a description matching the material they want (via the site's 'Forge' page), click submit, and wait
                    for their prompt to be processed.
                    <br />
                    Under the hood, TextureForge will take the user's description, translate it into a prompt optimally
                    formatted for Stable Diffusion, and send it to SD for evaluation<sup style="font-size: smaller;">2</sup>. After the textures load, they can
                    then be previewed directly in the browser, downloaded using filenames structured for easy management,
                    and imported into the user's 3D program of choice.
                    <br />
                    <span style="font-size: smaller;">2: <i>To be specific, this process takes place in two stages—first via a text-to-image model for the base color of the material,
                        and next via an image-to-image model for the rest.</i></span>
                    <br />
                    <br />
                    As a platform, TextureForge was designed in the name of efficiency, accessibility, and elasticity, aiming to provide digital artists and game developers
                    with a user-friendly, handy time-saver to generate and manage their materials. <br />
                    It was built for projects at various stages of development, but especially those where it makes sense to prioritize speed,
                    resource management, and lower-fidelity renders over photorealistic lighting and maximum resolution.
                    <br />
                    <br />
                </MotionText>
                <Divider
                    textAlign={'center'} borderWidth={'.2rem'} w={'100%'}
                    mx='auto'
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('teal.400', 'facebook.600')}


                />
            </Container>

            <Spacer py={'2.5rem'} />

        </>
    )
}

export default SideBar_Paragraph
