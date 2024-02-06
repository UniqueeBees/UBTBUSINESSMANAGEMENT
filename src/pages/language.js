import React, { useEffect, useRef } from "react"
import {
  VStack, HStack,
  FormControl,
  Input,
  Center, Icon, ArrowRightIcon, Button, Heading, Box, Badge, BadgeText
} from "@gluestack-ui/themed"
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { getLanguage, getLanguageLabel } from "../common/apiCalls";
import { storeObjectData, storageKeyTypes, getObjectData } from '../common/localStorage'
import { navigationRoutes } from '../common/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../slices/languageSlice'
import { setPage } from '../slices/initialPageSlice'
import { styles } from '../assets/styles/theme'
import { MoveRight } from 'lucide-react-native';

function Language(props) {
  const dispatch = useDispatch()
  const languageState = useSelector((state) => state.language)
  const companyId = useSelector((state) => state.company.company.id)
  const hasLogin = useSelector((state) => state.login.loginState)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (languageState.language) {

        if (companyId === -1) {
          dispatch(setPage(navigationRoutes.company))
        }
        else {
          if (hasLogin) {
            dispatch(setPage(navigationRoutes.navigationTab))
          }
          else {
            dispatch(setPage(navigationRoutes.login))
          }

        }

      }
    }
  }, [languageState.language])


  const [languageData, setData] = React.useState()

  const fetchInfo = async () => {
    const response = await getLanguage();
    setData(response.languages)

  }

  const SetLanguage = async (code) => {

    const response = await getLanguageLabel(code);

    const data = { code: code, translations: response.translations }

    storeObjectData(storageKeyTypes.language, data)
    dispatch(setLanguage(data));

  }
  React.useEffect(() => {
    fetchInfo();
  }, []);
  //#F0FFFF
  {/* <HStack mb="$1" alignItems="center" height={60} backgroundColor="$white" borderRadius={30}  textAlign="left">
          <Text style={{width:"80%",textAlign:"left",fontSize:16}} >{item.name}</Text><Icon id={item.code} size="md"   
         on as={MoveRight} m="$2" w="$4" h="$4" style={{cursor: 'pointer'}}  />
         </HStack> */}

  return (
    <VStack height="100%" bgColor="$white">
     <VStack style={styles.langugeHeadingContainer} alignItems="center" >
      <Text style={styles.langugeHeading}>Choose Language</Text>
      </VStack>
      <VStack space="md" width="100%" pb={15} pl={65} pr={68} pt="$0" mt="40px" >
    
      
        <VStack space="4xl" mt={32} pb="$1" pl="$1" pr="$1">
          <FlatList
          showsVerticalScrollIndicator={false}
            data={languageData}
            renderItem={({ item }) =>
              <TouchableOpacity  onPress={() => { SetLanguage(item.code) }} underlayColor="white">

                <HStack pt={15} space="md" mt="$1" pr={10}  style={[styles.boxShadow,styles.listBadge, {height:80,alignContent:"center"}] }>
                  <Badge size="md" height={30} m="$2" variant="solid" borderRadius="$xl" action="muted" bgColor="$white" >

                    <Text style={[styles.textMedium13,{ width: "92%", textAlign: "left"}]} >{item.name}</Text><Icon id={item.code} size="xl"
                      on as={MoveRight}  w="$10" h="$4" style={{ cursor: 'pointer',fontWeight:"bold"}} />

                  </Badge>
                </HStack>


              </TouchableOpacity >
            }
          />
        </VStack>
      </VStack>

    </VStack>



  )
}
export default Language;
