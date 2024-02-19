import { React, useState, useEffect, memo } from "react"
import { View } from 'react-native';
import {
  Button, VStack, ButtonText, FlatList, Icon,  AddIcon,
} from "@gluestack-ui/themed";
import { VirtualizedList, SafeAreaView, Keyboard } from "react-native";
import { Input, InputField, InputSlot, InputIcon } from "@gluestack-ui/themed";
import { styles } from '../../assets/styles/theme'
import { SlidersHorizontal } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BusinessDetails from "./businessDetails";
import BusinessListItem from "./businessListItem";
import BusinessCreate from "./businessCreate";
import { useSelector, useDispatch } from 'react-redux';
import { getBusinessListItems } from '../../slices/businessSlice';
import PageHeader from "../pageHeader";
import { Dimensions } from 'react-native';
import { sortObjectArray } from '../../common/utility';
import BusinessFilterSort from "./businessFilterSort";

function BusinessList(props) {
  const businessListItems = useSelector((state) => state.business.businessList);
  const businessLanguageDTO = useSelector((state) => state.language.businessLanguageDTO)
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
        if (item[field] !== filterOptions[field]) {
          return false // "break"
        }
        return true // must return true if doesn't break
      });

      return (searchResult && filterResult);
    }

   return searchResult;
  }

  const searchItems = (searchValue, fromFilter) => {
    if (fromFilter) {
      searchValue = search
    }
    let filterParams = [];
    const hasType = filterOptions.type ? true : false;
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
    //const flatListRef = useRef()
    const shadowStyle = {
      shadowOpacity: 1
    }
    return (
      <VStack bgColor="$white">
        <PageHeader heading="BUSINESSES" showNotifi={true}></PageHeader>



        <VStack style={styles.tabPageContent} style={{height: Dimensions.get('window').height - 210}}>
          <BusinessFilterSort show={showActionsheet}
            handleFilterOptions={handleFilterOptions}
            businessLanguageDTO={businessLanguageDTO}
            commonLanguageDTO={commonLanguageDTO}
            filterAction={filterAction}
            token={token} />
         
            <Input size="lg" borderRadius="$2xl"  >
              <InputField
                placeholder={businessLanguageDTO.businessSearchPlaceholder}
                value={search}
                onChangeText={value => searchItems(value)}
              />
              
           
              <InputSlot pr='$3' onPress={() => {
                Keyboard.dismiss()
                handleFilterOptions(true)
              }}>
                <InputIcon as={SlidersHorizontal} size="lg" />
              </InputSlot>
            </Input>
           


          {1 > 2 &&  <FlatList showsVerticalScrollIndicator={false}
            data={listItems}
            renderItem={({ item }) =>

              <BusinessListItem item={item} />

            }
          />
          }
          <BusinessListComp listItems={listItems} />
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
        
      </VStack >


    )
  }

  return (

    <View  >
      {businessListItems.length === 0 ? <BusinessCreate /> : createList()}
    </View>
  )
}
const BusinessListComp = memo(function BusinessListComponent(props) {
  const listItems = props.listItems;
  const getItem = (_data, index) => ({
    ...listItems[index]
  });
  const getItemCount = _data => listItems.length;
  return (
    <SafeAreaView>
      <VirtualizedList
        initialNumToRender={10}
        renderItem={({ item }) => <BusinessListItem item={item} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
})
export default BusinessList;