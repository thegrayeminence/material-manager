import {Input, FormControl, FormHelperText, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Icon} from "@chakra-ui/react";
import {FiFile} from "react-icons/fi";
import {useController} from "react-hook-form";
import {useRef} from "react";

export default function FileUpload({name, placeholder, acceptedFileTypes, control, title, description, isRequired = false}) {



    const inputRef = useRef();
    const {
        field: {ref, onChange, value, ...inputProps},
        fieldState: {invalid, isTouched, isDirty},
    } = useController({
        name,
        control,
        rules: {required: isRequired},
    });

    return (
        <>

            <FormControl p={4} isInvalid={invalid} isRequired={isRequired}>
                <FormLabel>{title}</FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none">
                        <Icon as={FiFile} />
                    </InputLeftElement>
                    <Input
                        type="file"
                        multiple
                        sx={{
                            "::file-selector-button": {
                                height: 10,
                                padding: 0,
                                mr: 4,
                                background: "none",
                                border: "none",
                                fontWeight: "bold",
                            },
                        }}
                    />
                </InputGroup>
                <FormHelperText>{description}</FormHelperText>
            </FormControl>

            <FormControl p={4} isInvalid={invalid} >
                <FormLabel htmlFor="writeUpFile">Load Metadata</FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none">
                        <Icon as={FiFile} />
                    </InputLeftElement>
                    <input type='file'
                        onChange={(e) => onChange(e.target.files[0])}
                        accept={acceptedFileTypes}
                        name='{name}'
                        ref={inputRef}
                        {...inputProps}
                        style={{display: 'none'}} />
                    <Input
                        placeholder={placeholder || "Your file ..."}
                        onClick={() => inputRef.current.click()}
                        // onChange={(e) => {}}
                        readOnly={true}
                        value={value && value.name || ''}
                    />
                </InputGroup>
                <FormErrorMessage>
                    {invalid}
                </FormErrorMessage>
                <FormHelperText>Attach optional metadata files</FormHelperText>

            </FormControl>
        </>
    );
}

FileUpload.defaultProps = {
    acceptedFileTypes: '',
    allowMultipleFiles: true,
};

