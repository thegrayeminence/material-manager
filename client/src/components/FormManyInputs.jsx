//lib imports
import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Code,
  FormErrorMessage,
  Button,
  HStack,
  useBoolean,
} from "@chakra-ui/react";
//component imports
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { groupedOptions, colorOptions } from "../config/formInputData";
import { useForm, Controller } from "react-hook-form";

//functions
const mappedColorOptions = colorOptions.map((option) => ({
  ...option,
  colorScheme: option.value,
}));

export default function ShaderInfoForm() {

  const { register, control, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useBoolean(false);

  const submit = async (data) => {
    setLoading.on();
    setTimeout(() => {
      setLoading.off();
      alert(JSON.stringify(data, null, 2));
    }, 1200);
  };

  return (
    <Container as="form" mb={12} onSubmit={handleSubmit(submit)}>
      <FormControl p={4}>
        <FormLabel>
          Single Select Colors and Flavours <Code>size="sm"</Code>
        </FormLabel>
        <Select
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
          size="sm"
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Select Colors and Flavours <Code>size="md" (default)</Code>
        </FormLabel>
        <Select
          isMulti
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Select Colors and Flavours <Code>size="lg"</Code>
        </FormLabel>
        <Select
          isMulti
          name="colors"
          classNamePrefix="chakra-react-select"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
          size="lg"
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Select with <Code>useBasicStyles</Code>
        </FormLabel>
        <Select
          useBasicStyles
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>Async Select</FormLabel>
        <AsyncSelect
          isMulti
          name="colors"
          options={[...groupedOptions, ...groupedOptions]}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
          size="md"
          loadOptions={(inputValue, callback) => {
            setTimeout(() => {
              const values = colorOptions.filter((i) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
              );
              callback(values);
            }, 3000);
          }}
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Select Colors and Flavours (With global <Code>colorScheme</Code>)
        </FormLabel>
        <Select
          isMulti
          name="colors"
          colorScheme="purple"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Select Colors and Flavours (With <Code>colorScheme</Code> in each
          option)
        </FormLabel>
        <Select
          isMulti
          name="colors"
          options={mappedColorOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>Select with creatable options</FormLabel>
        <CreatableSelect
          isMulti
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
        />
      </FormControl>

      <FormControl p={4} isDisabled>
        <FormLabel>
          Disabled select from the <Code>FormControl</Code>
        </FormLabel>
        <Select
          isMulti
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Disabled select from the <Code>Select</Code> element itself
        </FormLabel>
        <Select
          isDisabled
          isMulti
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
        />
      </FormControl>

      <FormControl p={4} isInvalid>
        <FormLabel>
          Invalid select from the <Code>FormControl</Code>
        </FormLabel>
        <Select
          isMulti
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
        />
        <FormErrorMessage>
          This error message shows because of an invalid FormControl
        </FormErrorMessage>
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Invalid select from the <Code>Select</Code> element itself
        </FormLabel>
        <Select
          isInvalid
          isMulti
          name="colors"
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
        />
        <FormErrorMessage>
          You can't see this error message because the isInvalid prop is set on
          the select element instead of the form control
        </FormErrorMessage>
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Single Select with <Code>selectedOptionStyle="check"</Code>
        </FormLabel>
        <Select
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
          selectedOptionStyle="check"
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Multi Select with <Code>selectedOptionStyle="check"</Code>
        </FormLabel>
        <Select
          isMulti
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
          selectedOptionStyle="check"
          hideSelectedOptions={false}
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Single Select with <Code>selectedOptionColorScheme="green"</Code>
        </FormLabel>
        <Select
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
          selectedOptionColorScheme="green"
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Multi Select with <Code>selectedOptionColorScheme="green"</Code>
        </FormLabel>
        <Select
          isMulti
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
          selectedOptionColorScheme="green"
          hideSelectedOptions={false}
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Single Select with <Code>variant="filled"</Code>
        </FormLabel>
        <Select
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
          variant="filled"
        />
      </FormControl>

      <FormControl p={4}>
        <FormLabel>
          Single Select with <Code>variant="flushed"</Code>
        </FormLabel>
        <Select
          options={groupedOptions}
          placeholder="Select some colors..."
          closeMenuOnSelect={false}
          variant="flushed"
        />
      </FormControl>

      <HStack spacing={4}>
        <Button
          isLoading={isLoading}
          type="button"
          colorScheme="blue"
          w="full"
          onClick={() => reset(defaultValues)}
        >
          Reset
        </Button>

        <Button
          isLoading={isLoading}
          type="submit"
          colorScheme="green"
          w="full"
        >
          Submit
        </Button>
      </HStack>
    </Container>

  );
};

