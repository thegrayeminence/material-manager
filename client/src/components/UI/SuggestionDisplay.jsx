
import { HStack, Box } from "@chakra-ui/react";

export default function SuggestionDisplay ({ inputValue, suggestions }) {
    // Ensure suggestions is always an array
    const suggestionList = Array.isArray(suggestions) ? suggestions : [];

    const isVisible = suggestionList.length > 0 && !suggestionList.includes(inputValue);

    return (
        <HStack 
            height="1.5rem" // Reserve enough space for up to three suggestions
            mt=".1rem"
            color="gray.500"
            maxW = "80%"
            visibility={isVisible ? "visible" : "hidden"} // Control visibility
            opacity={isVisible ? .6 : 0}
            justifyContent={"flex-start"} // Control alignment
            flexWrap="no-wrap"
            overflow={"hidden"}
        >
            {isVisible && suggestionList.map((suggestion, index) => (
                <Box key={index}>
                    {suggestion}
                </Box>
            ))}
        </HStack>
    );
};