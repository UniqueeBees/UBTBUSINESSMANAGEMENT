import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorText,
    Input, InputField, InputSlot, InputIcon, Box, VStack
} from '@gluestack-ui/themed';
import { resetBusinessName } from '../../slices/businessSlice';
import { ChevronRight } from 'lucide-react-native';
import { styles } from '../../assets/styles/theme';
import { getBusinessListItems } from '../../slices/businessSlice';
function BusinessSelect(props) {
    const navigation = useNavigation();
    const businessSelectLanguageDTO = useSelector((state) => state.language.businessSelectLanguageDTO)
    const selectedBusinessItem = useSelector((state) => state.business.businessSelectedFromForm)
    const businessListItems = useSelector((state) => state.business.businessList);
    const token = useSelector((state) => state.login.token)
    const controlSettings = props.controlSettings;
    const [businessName, setBusinessName] = useState(props.businessName);
    const dispatch = useDispatch();
    useEffect(() => {
        if (selectedBusinessItem.id && selectedBusinessItem.name) {
            setBusinessName(selectedBusinessItem.name)
            props.setDatasource(controlSettings.fieldName, selectedBusinessItem)
            dispatch(resetBusinessName());
        }
    }, [selectedBusinessItem])

    useEffect(() => {
        if (businessListItems.length === 0) {
            dispatch(getBusinessListItems(token))
        }
    }, [])
    useEffect(() => {
        if (selectedBusinessItem.id && !selectedBusinessItem.name) {
            const business = businessListItems.find(business => business.id === selectedBusinessItem.id)
            if (business) {
                setBusinessName(business.name)
            }

        }
    }, [businessListItems])

    return (
            <FormControl isRequired={controlSettings.isRequired} isInvalid={controlSettings.isInvalid} >
            <FormControlLabel pb="$0" pt="$0" mb="$0" mt="$0" >
                <FormControlLabelText pb="$0" pt="$0" mb="$0" mt="$0" style={styles.fieldLabel}>{businessSelectLanguageDTO.label}</FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined" style={styles.fieldInput}  >
                <InputField pb="$0" pt="$0" mb="$0" mt="$0" style={styles.fieldInput} placeholderTextColor="#171717" placeholder={businessSelectLanguageDTO.placeholder} value={businessName}
                    editable={false} >
                </InputField>
                <InputSlot pr='$3' onPress={() => navigation.navigate('businessSelectList')}>
                    <InputIcon as={ChevronRight} size="lg" />
                </InputSlot>
            </Input>
            <FormControlError>
                <FormControlErrorText>
                    {businessSelectLanguageDTO.requiredValidationMessage}
                </FormControlErrorText>
            </FormControlError>
        </FormControl>
    )
}
export default BusinessSelect;