import {Button, useColorModeValue} from "@chakra-ui/react";

const SideBarBtn = ({children, func}) => {

    return (

        <Button onClick={func} px={4} variant='outline' size='lg' color={'white'} background={useColorModeValue('whiteAlpha.300', 'whiteAlpha.100')}
            borderRadius={6} borderWidth={2} transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            backdropFilter='auto' backdropBlur='5px'
            _hover={{
                bg: useColorModeValue(), backdropFilter: 'auto', borderColor: 'pink.200',
                backdropBlur: '10px', transform: 'scale(1.125)'
            }}
        >
            {children}
        </Button>
    );

};


export default SideBarBtn