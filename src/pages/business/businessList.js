import { React, useState, useEffect } from "react"
import { View } from 'react-native';
import {
  Button, VStack, ButtonText,
  Text, FlatList, Box, HStack, Badge, BadgeText, Icon, MailIcon, PhoneIcon, AddIcon,
  EditIcon
} from "@gluestack-ui/themed";
import { Input, InputField, InputSlot, InputIcon } from "@gluestack-ui/themed";
import { styles } from '../../assets/styles/theme'
import { TrashIcon, SlidersHorizontal } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BusinessDetails from "./businessDetails";
import BusinessCreate from "./businessCreate";
import { useSelector, useDispatch } from 'react-redux';
import { getBusinessListItems } from '../../slices/businessSlice';
import PageHeader from "../pageHeader";
 
import { sortObjectArray } from '../../common/utility';
import BusinessFilterSort from "./businessFilterSort";

function BusinessList(props) {
  const businessListItems = useSelector((state) => state.business.businessList);
  const taskLanguageDTO = useSelector((state) => state.language.taskLanguageDTO)
  const commonLanguageDTO = useSelector((state) => state.language.commonLanguageDTO)
  const token = useSelector((state) => state.login.token)
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filterOptions, setFilterOptions] = useState({});
  const [listItems, setListItems] = useState(businessListItems);
  const [showActionsheet, setShowActionsheet] = useState(false)
  useEffect(() => {
    dispatch(getBusinessListItems(token))
  }, [token])

  useEffect(() => {
    setListItems(businessListItems)
  }, [businessListItems.length])
  useEffect(() => {
    searchItems(search, true);
  }, [filterOptions])
  const handleActionClose = () => setShowActionsheet(!showActionsheet)
  const applyFilterOnItem = (item, searchValue, hasSearch, filterParams) => {

    let searchResult = true;
    let filterResult = false;
    if (hasSearch) {
      const itemData = `${item.name.toUpperCase()}`;
      const searchData = searchValue.toUpperCase();

      searchResult = itemData.indexOf(searchData) >= 0;
    }
    if (filterParams.length > 0) {
      filterResult = filterParams.every(field => {
        if (item[field] === filterOptions[field]) {
          return false // "break"
        }
        return true // must return true if doesn't break
      });
    }
    
    return (searchResult && !filterResult);
  }

  const searchItems = (searchValue, fromFilter) => {
    if (fromFilter) {
      searchValue = search
    }
    let filterParams = [];
    const hasType = filterOptions.businessType ? true : false;
    const hasCity = filterOptions.city ? true : false;
    const hasCountry = filterOptions.country ? true : false;
    const hasSearch = searchValue ? true : false;
    if (hasType) {
      filterParams.push('type')
    }
    if (hasCity) {
      filterParams.push('city')
    }
    if (hasCountry) {
      filterParams.push('country')
    }

    let newBusinessListItems = (!hasSearch && !hasType && !hasCity && !hasCountry) ? businessListItems : businessListItems.filter(item => {
      return applyFilterOnItem(item, searchValue, hasSearch, filterParams)

    });

    let sortedListItem = []
    if (filterOptions.sortOption) {
      if (filterOptions.sortOption === 1) {
        sortedListItem = [...newBusinessListItems].sort(sortObjectArray('createDate', true))

      }
      else if (filterOptions.sortOption === 2) {
        sortedListItem = [...newBusinessListItems].sort(sortObjectArray('name', false, (a) => a.toUpperCase()))
      }
      else if (filterOptions.sortOption === 3) {
        sortedListItem = [...newBusinessListItems].sort(sortObjectArray('name', true, (a) => a.toUpperCase()))
      }
    }
    else {
      // sortedListItem = [...newBusinessListItems].sort(sortByDate);
      sortedListItem = [...newBusinessListItems].sort(sortObjectArray('createDate', true))

    }


    setListItems(sortedListItem);
    setSearch(searchValue);

  }
  const handleFilterOptions = () => {
    handleActionClose();
  }
  const filterAction = (filterOptions) => {
    setFilterOptions(filterOptions)
    handleActionClose()
  }
  function createList() {
    const shadowStyle = {
      shadowOpacity: 1
    }
    return (
      <VStack bgColor="$white">
       <PageHeader   heading="BUSINESSES" showNotifi={true}></PageHeader> 
        
      <FlatList  showsVerticalScrollIndicator={false}
        data={businessListItems}
        renderItem={({ item }) =>
        
         <Box style={[styles.listContentItem,styles.boxShadow]}   m="$2" p="$2" pl="$5">
          <View  > 
          <VStack>
            <HStack   justifyContent="space-between"> 
              <HStack justifyContent="right" space="lg"  width="80%" > 
              <VStack>
              <Text  numberOfLines={1} ellipsizeMode="tail" style={styles.listHeadingMedium} >{item.name}</Text>  
              <Text style={styles.listSubDescription} >{item.country}</Text> 
              </VStack>
             
              </HStack> 
              <HStack justifyContent="right" space="lg"  width="20%" > 
              <Icon as={TrashIcon} m="$1" w="$3" h="$3" />
              <Icon as={EditIcon} m="$1" w="$4" h="$4" />
              </HStack>
            </HStack>
            <HStack> 
              <HStack justifyContent="flex-start">
              {item.email?<Icon as={MailIcon} m="$1" w="$3" h="$3" ml="$0" />:""}<BadgeText  style={[{textTransform: 'capitalize',paddingTop:0},styles.listSubHeading]}>{item.email}</BadgeText>
              </HStack>
              <HStack justifyContent="left">
              {item.phone?<Icon as={PhoneIcon} m="$1" w="$3" h="$3" ml={item.email?"$3":"$0"}/>:""}<BadgeText style={[{textTransform: 'capitalize',paddingTop:0},styles.listSubHeading]}>{item.phone}</BadgeText>
              </HStack>
            </HStack>
          </VStack>
          </View>
        </Box>
      
        }
      />    
       
        <Button 
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        
        style={styles.shortButton }
      <VStack style={styles.tabPageContent}>
        <BusinessFilterSort show={showActionsheet}
          handleFilterOptions={handleFilterOptions}
          taskLanguageDTO={taskLanguageDTO}
          commonLanguageDTO={commonLanguageDTO}
          filterAction={filterAction}
          token={token} />
        <VStack width="100%" mx="3" style={styles.pageHeader} >

          <Text style={[styles.pageTitle, { textAlign: "center" }]} >BUSINESSES</Text>
          <Input size="lg" borderRadius="$2xl" >
            <InputField
              placeholder={taskLanguageDTO.taskSearchPlaceholder}
              value={search}
              onChangeText={value => searchItems(value)}
            />
            <InputSlot pr='$3' onPress={() => handleFilterOptions(true)}>
              <InputIcon as={SlidersHorizontal} size="lg" />
            </InputSlot>
          </Input>

        </VStack>

        <FlatList showsVerticalScrollIndicator={false}
          data={listItems}
          renderItem={({ item }) =>

            <Box style={[styles.listContentItem, styles.boxShadow]} m="$2" p="$2" pl="$5">
              <View  >
                <VStack>
                  <HStack justifyContent="space-between">
                    <HStack justifyContent="right" space="lg" width="80%" >
                      <VStack>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeadingMedium} >{item.name}</Text>
                        <Text style={styles.listSubDescription} >{item.city}</Text>
                      </VStack>

                    </HStack>
                    <HStack justifyContent="right" space="lg" width="20%" >
                      <Icon as={TrashIcon} m="$1" w="$3" h="$3" />
                      <Icon as={EditIcon} m="$1" w="$4" h="$4" />
                    </HStack>
                  </HStack>
                  <HStack>
                    <HStack justifyContent="flex-start">
                      {item.email ? <Icon as={MailIcon} m="$1" w="$3" h="$3" ml="$0" /> : ""}<BadgeText style={[{ textTransform: 'capitalize', paddingTop: 0 }, styles.listSubHeading]}>{item.email}</BadgeText>
                    </HStack>
                    <HStack justifyContent="left">
                      {item.phone ? <Icon as={PhoneIcon} m="$1" w="$3" h="$3" ml={item.email ? "$3" : "$0"} /> : ""}<BadgeText style={[{ textTransform: 'capitalize', paddingTop: 0 }, styles.listSubHeading]}>{item.phone}</BadgeText>
                    </HStack>
                  </HStack>
                </VStack>
              </View>
            </Box>

          }
        />

        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}

          style={styles.shortButton}

          onPress={() => navigation.navigate("businessDetails")}

        >
          <ButtonText ><Icon color="$white" as={AddIcon} m="$2" w="$4" h="$4" /></ButtonText>
        </Button>
      </VStack>


    )
  }
  return (

    <View  >
      {businessListItems.length === 0 ? <BusinessCreate /> : createList()}
    </View>
  )
}

export default BusinessList;