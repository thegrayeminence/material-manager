// Here we have used react-icons package for the icons
import {
    MdOutlinePersonPin,
    MdPermDeviceInformation,
    MdOutlineFlashlightOn,
    MdAccountTree
} from "react-icons/md"

export const featuresText = [
    {
        heading: "Learn with flashcards",
        content:
            "The main part of the learning process is using flashcards, you see a question, then you answer it.",
        icon: MdOutlineFlashlightOn
    },
    {
        heading: "Never forget",
        content: `With our latest SRS algorithm, you will never forget what you've learned. The more you remember something, the less often the system will ask you to review it.`,
        icon: MdOutlinePersonPin
    },
    {
        heading: "Tiny bits of information",
        content:
            "Instead of showing you a wall of text that will take you a long time to read and then that you quickly forget, we show you tiny bits of information every day.",
        icon: MdPermDeviceInformation
    },
    {
        heading: "Community",
        content: `Keep your learning streak going, see stats of what you've learned and share it with others via your public profile. You can also join our private discord server!`,
        icon: MdAccountTree
    }
];