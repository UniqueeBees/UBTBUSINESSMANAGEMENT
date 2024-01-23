import React,{useEffect} from "react"
import {
  VStack,
  FormControl,
  Input,
  InputField ,
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
import { useSelector,useDispatch } from 'react-redux';
import {businessTypes} from '../../slices/businessSlice'
import { ArrowBigRightDash,CheckCircle2} from 'lucide-react-native';
import { MoveLeft} from 'lucide-react-native';

const contactList = useSelector((state) => state.user.contactList); 
const [formData, setData] = useState(meetingSetup);

export default function showAttachment(props) {
  useEffect(() => {
    if (contactList.list.length === 0 && token) {
        dispatch(getContactList(token));
    }
}, [token])

function showAttachment(){ 
  <HStack>
    <Image src=""></Image>
  </HStack> 
  }
  return (
    <View>
      <VStack> 
        <Text>UPLOAD PHOTO</Text>
        {renderPhotos()}
      </VStack>
    </View>

  )
}