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
      <VStack space="md" width="100%" pb={15} alignItems="center" mt="40px"  >
        <VStack space="1xl" mt={40.62} pl={48} pr={40} >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={languageData}
            renderItem={({ item }) =>

              <TouchableOpacity onPress={() => { SetLanguage(item.code) }} underlayColor="white">
                <Box ml="$3" mr="$3" mb="$1" mt="$2" pl="$4" pt="$4"  style={[styles.boxShadow, styles.listBadge,{ height: 55,width:300 }]}  bgColor="$white" >
                  <HStack>
                    <Text style={[styles.textMedium13, { fontFamily:"Neue-Haas-Grotesk-Display-Pro-75-Bold",width: "85%", textAlign: "left" }]} >{item.name}</Text><Icon id={item.code} size="xl"
                      on as={MoveRight} style={{ cursor: 'pointer',fontWeight: "bold" }} />
                  </HStack>
                </Box>



              </TouchableOpacity >
            }
          />
        </VStack>
      </VStack>

    </VStack>



  )
}
export default Language;
