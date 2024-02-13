import React, { useState, useRef } from "react";
import { VirtualizedList, SafeAreaView } from "react-native";
import { VStack, Input, InputField } from "@gluestack-ui/themed";
import GeneralListItem from "./generalListItem";
function GeneralList(props) {
    const [generalList, setGeneralList] = useState({ list: props.list, search: '' });
    const listSettings = props.listSettings
    const flatListRef = useRef()
    const searchItems = (text) => {
        let newData = text.length > 0 ? props.list.filter(item => {
            const itemData = `${item[listSettings.searchField].toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;

        }) : props.list;
        setGeneralList({ list: newData, search: text })
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    };
    const selectItem = (item) => {
        props.selectItem(item[listSettings.valueField],listSettings.sourceFieldName, true)
    }
    const getItem = (_data, index) => ({
        ...generalList.list[index]
    });
    const getItemCount = _data => generalList.list.length;
    return (
        <VStack space="2xl" >

            <Input size="lg" borderRadius="$2xl" >
                <InputField
                    placeholder={props.languageDTO.executiveSearchPlaceholder}
                    value={generalList.search}
                    onChangeText={value => searchItems(value)}
                />
            </Input>
            <SafeAreaView>
                <VirtualizedList
                    ref={flatListRef}
                    initialNumToRender={15}
                    renderItem={({ item }) => <GeneralListItem item={item} selectItem={selectItem} listSettings={listSettings} />}

                    keyExtractor={item => item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
            </SafeAreaView>

        </VStack>

    )
}
export default GeneralList;