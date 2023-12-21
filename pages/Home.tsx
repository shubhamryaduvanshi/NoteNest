import { Box, Divider, Flex, Text } from "native-base";
import NotesCardContainer from "../components/NotesCardContainer";
import { Alert, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import { getBaseURL } from "../common/common";
import { NoteType } from "../common/commonTypes";


interface ActionDataType {
    id: number
    label: string,
    prefix: string,
    bgColor: string,
    isDisabled: boolean,
    navigate?: string
}

const HomePage = ({ navigation }) => {

    const [isRefresh, setIsRefresh] = useState(false);
    const [notes, setNotes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getNotes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(getBaseURL());
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getNotes();
    }, [isRefresh]);


    const getNoteInfo = (id: number) => {
        return notes.find((note: NoteType) => note.id == id)
    }

    const navigateToEditNote = (id: number) => {
        navigation.navigate("Create Note", {
            mode: "edit",
            details: getNoteInfo(id)
        })
    }

    return (
        <Flex h={'full'} w={'full'} bg={'blueGray.800'}>
            {/* <Header /> */}
            <ActionContainers navigation={navigation} />
            <Divider my="2" _light={{
                bg: "muted.700"
            }} _dark={{
                bg: "muted.50"
            }} />

            <Flex ml={'auto'} pr={8}>
                <Icon.Button name="refresh" size={20} color="#fff" backgroundColor="#3b5998" onPress={() => setIsRefresh(!isRefresh)} >Refresh</Icon.Button>
            </Flex>
            {/* Notes thumbnail starts here */}
            {notes?.length ?
                <NotesCardContainer isLoading={isLoading} notes={notes} navigateToEditNote={navigateToEditNote} />
                : <Text textAlign={'center'} mt={'20'} fontSize={'xl'} color={'warmGray.100'} textTransform={'uppercase'}>Please create a note.</Text>
            }
        </Flex>
    )
}

const ActionContainers = ({ navigation }: any) => {
    const actionData: ActionDataType[] = [
        {
            id: 1,
            label: "Generate Password",
            prefix: "+",
            bgColor: "white",
            isDisabled: false,
            navigate: "Generate Password"
        },
        {
            id: 2,
            label: "Create new note",
            prefix: "+",
            bgColor: "blue.300",
            isDisabled: false,
            navigate: "Create Note"
        },
    ]
    return (
        <Flex
            flexDir={'row'}
            flexWrap={'wrap'}
            // @ts-ignore
            gap="4"
            my={4}
            justifyContent={'space-around'}
            alignItems="center">
            {actionData.map((action: ActionDataType) =>
                // <Box key={action.id} w="full" minH="16" bg={action.bgColor} rounded="2xl" shadow={3} opacity={action.isDisabled ? "0.5" : "1"}
                // >
                //     <Text m={'auto'} fontSize={'lg'} fontWeight={'semibold'} textTransform={'uppercase'}>{action.prefix} {action.label}</Text>
                // </Box>
                <Button
                    key={action.id}
                    title={action.label}
                    disabled={action.isDisabled}
                    onPress={() => navigation.navigate(action.navigate, {
                        mode: 'add'
                    })}
                />
            )}
        </Flex>
    )
}

export default HomePage;