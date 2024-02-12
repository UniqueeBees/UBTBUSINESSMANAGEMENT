import React, { useState, useRef } from "react";
import { FlatList, VirtualizedList, SafeAreaView } from "react-native";
import { VStack, Input, InputField } from "@gluestack-ui/themed";
import UserListItem from "./userListItem";
function UserList(props) {
    const [userList, setUserList] = useState({ list: props.userItemList, search: '' });
    const flatListRef = useRef()
    const searchItems = (text) => {
        let newData = text.length > 0 ? props.userItemList.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;

        }) : props.userItemList;
        setUserList({ list: newData, search: text })
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    };
    const getItem = (_data, index) => ({
        ...userList.list[index]
      });
      const getItemCount = _data => userList.list.length;
    return (
        <VStack space="2xl" >

            <Input size="lg" borderRadius="$2xl" >
                <InputField
                    placeholder={props.languageDTO.executiveSearchPlaceholder}
                    value={userList.search}
                    onChangeText={value => searchItems(value)}
                />
            </Input>
            {1 > 2 && <FlatList showsVerticalScrollIndicator={false}
                data={userList.list}
                ref={flatListRef}
                renderItem={({ item }) => <UserListItem source={props.source} item={item} selectItem={props.selectItem} />}
            />
            }
            <SafeAreaView>
                <VirtualizedList
                ref={flatListRef}
                initialNumToRender={15}
                renderItem={({item}) => <UserListItem selectedList={props.selectedList} source={props.source} item={item} selectItem={props.selectItem} />}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                />
            </SafeAreaView>

        </VStack>

    )
}

export default UserList;