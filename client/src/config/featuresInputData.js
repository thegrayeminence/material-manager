// Here we have used react-icons package for the icons
import {
    MdOutlinePersonPin,
    MdPermDeviceInformation,
    MdOutlineFlashlightOn,
    MdAccountTree
} from "react-icons/md"

import {FaFileArchive} from "react-icons/fa";
import {MdOutlineGridView, MdOutlineViewInAr, MdOutlinePreview} from "react-icons/md";
import {LuBrainCog, LuGalleryHorizontalEnd} from "react-icons/lu";


export const featuresText = [
    {
        heading: "Generate Texture Maps",
        content:
            "Generate texture maps for your 3D projects and PBR materials, using text-to-image and image-to-image AI models with Stable Diffusion. ",
        icon: LuBrainCog
    },
    {
        heading: "Live Previews of Materials",
        content: `Preview the generated texture maps and PBR materials in the browser to see how they look in real-time.`,
        icon: MdOutlineViewInAr
    },
    {
        heading: "Community Materials Gallery",
        content:
            "Browse through a gallery of materials generated by other users and download them for your projects.",
        icon: MdOutlineGridView
    },
    {
        heading: "Optimized Downloads",
        content: `Download the generated texture maps using filenames and folder structure optimized for your workflow.`,
        icon: FaFileArchive
    }
];