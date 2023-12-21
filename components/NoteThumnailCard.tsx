import { Box, Flex, Text } from "native-base";
import { NoteType } from "../common/commonTypes";
import BottomRightBadge from "./BottomRightBadge";
import Icon from 'react-native-vector-icons/AntDesign';
import { getBaseURL } from "../common/common";
import { ToastAndroid } from "react-native";

interface NoteThumnailCardProps {
    info: NoteType,
    navigateToEditNote: any
}
const NoteThumnailCard = ({ info, navigateToEditNote }: NoteThumnailCardProps) => {
    const { bgColor, category, description, finishBefore, id, title } = info;

    const onDelete = (noteId: number) => {
        fetch(`${getBaseURL()}/${noteId}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
        }).then(() => {
            ToastAndroid.show("Deleted Successfully!", ToastAndroid.SHORT);
            console.warn("Kindly refresh for current changes");
        })
            .catch((err) => {
                console.log(err.message);
            });
    }




    return (
        <Box bgColor={bgColor} h={32} w={40} rounded={'2xl'} p={2} overflow={'hidden'} position={'relative'}>
            <Flex position={'absolute'} right={8} top={1} zIndex={999}>
                <Icon name="edit" size={20} color="gray" onPress={() => navigateToEditNote(id)} ></Icon>
            </Flex>
            <Flex position={'absolute'} right={1} top={1} zIndex={999}>
                <Icon name="delete" size={20} color="#ef4444" onPress={() => onDelete(id)} ></Icon>
            </Flex>
            <Text fontWeight={'semibold'} fontSize={'md'} overflow={'hidden'}>{title}</Text>
            <Text fontSize={'sm'}>{description}</Text>
            <BottomRightBadge textToShow={category} />
        </Box>
    )
}

export default NoteThumnailCard