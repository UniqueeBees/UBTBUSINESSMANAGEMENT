import React,{useEffect} from "react";
import { VStack, Center,Heading } from '@gluestack-ui/themed';
function Header(props){
    return(
        <VStack space='xl'>
          <Heading  lineHeight='$md'>
            {props.title}
          </Heading>
          </VStack>
    );
}
export default Header;