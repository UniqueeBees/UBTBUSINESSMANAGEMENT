import React from "react";
import { VStack,Heading } from '@gluestack-ui/themed';
function Header(props){
    return(
        <VStack space='xl'>
          <Heading color="$textDark500" lineHeight='$md'>
            {props.title}
          </Heading>
          </VStack>
    );
}
export default Header;