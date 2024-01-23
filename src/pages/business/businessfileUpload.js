import React, { useEffect } from "react"
import {
  VStack,
  FormControl,
  Input,
  InputField,
  Center,
  Button,
  ButtonText,
  ButtonIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Heading,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  SelectIcon,
  SelectContent,
  Icon,
  ChevronDownIcon,
  HStack,
  ArrowLeftIcon,
  ScrollView,
  Text,
  Image

} from "@gluestack-ui/themed"
import { ArrowRight } from 'lucide-react-native';
import { businessDTO } from "../../dto/businessDTO"
import { styles } from '../../assets/styles/theme'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { businessTypes } from '../../slices/businessSlice'
import { ArrowBigRightDash, Camera } from 'lucide-react-native';
import { MoveLeft } from 'lucide-react-native';
import { FlatList } from "react-native-gesture-handler";

export default function businessfileUpload(props) {
  const [atachments, setAttachments] = React.useState([])
  function renderPhotos() {
    <FlatList style={{ height: "90%" }} showsVerticalScrollIndicator={false}
      data={props.contactItemList}
      renderItem={({ item }) => <Box style={[styles.listContentItem, styles.boxShadow]} m="$1" p="$2" pl="$5">
        <View>
          <HStack>
            <box>
              <Image src="src\assets\images\home.jpg"></Image>
            </box> 
          </HStack>
        </View>
      </Box>
      }>
    </FlatList> 
  }
  return (
    <View>
      <VStack>
        <Text>UPLOAD PHOTO</Text>
        {renderPhotos()}
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          style={styles.buttonLong}
        //</VStack>onPress={() => navigation.navigate("contactSetup")}
        >
          <ButtonText ><Icon color="$white" as={Camera} m="$2" w="$6" h="$6" />"Upload Photo"</ButtonText>
        </Button>
      </VStack>
    </View>

  )
}