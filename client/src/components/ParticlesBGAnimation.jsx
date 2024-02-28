// import {useCallback, useEffect, useState} from "react";
// import Particles, {initParticlesEngine} from "@tsparticles/react";
// // import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// // import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import {loadSlim} from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// // import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
// import {particlesConfig1, particlesConfig2, particlesConfig3, particlesConfig4, particlesConfig5, particlesConfig6, particlesConfig7} from "../config/particlesConfig.jsx";
// import {Box} from "@chakra-ui/react";
// import {useColorModeValue} from "@chakra-ui/react";


// const ParticlesBGAnimation = ({bg, links, particles}) => {
//     const [init, setInit] = useState(false);

//     // Use the hook to determine color values
//     const particlesColor3 = useColorModeValue("#4361ee", "#00b4d8");
//     const linksColor3 = useColorModeValue("#4361ee", "#00b4d8");
//     const bgColor3 = useColorModeValue("#caf0f8", "#03045e");
//     const bgColor7 = useColorModeValue("#3f37c9", "#1a1854");
//     const linksColor7 = useColorModeValue("random", "random");
//     const particlesColor7 = useColorModeValue("random", "random");
//     // Generate the configuration with the dynamic color
//     const particlesOptions3 = particlesConfig3(particlesColor3, linksColor3, bgColor3);
//     const particlesOptions7 = particlesConfig7(bgColor7, linksColor7, particlesColor7);

//     // this should be run only once per application lifetime
//     useEffect(() => {
//         initParticlesEngine(async (engine) => {
//             //await loadAll(engine);
//             //await loadFull(engine);
//             await loadSlim(engine);
//             //await loadBasic(engine);
//         }).then(() => {
//             setInit(true);
//         });
//     }, []);

//     const particlesLoaded = (container) => {
//         console.log(container);
//     };

//     return (
//         <Box>
//             {init && <Particles
//                 id="tsparticles"
//                 particlesLoaded={particlesLoaded}
//                 options={particlesOptions7}
//             />
//             }
//         </Box>
//     )
//         ;
// };

// export default ParticlesBGAnimation;