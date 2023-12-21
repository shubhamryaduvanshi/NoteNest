import { Button, Flex, Text, View } from "native-base"
import NoteThumnailCard from "./NoteThumnailCard"
import { NoteType } from "../common/commonTypes"
import useFetchData from "../common/hooks/useFetchData";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

interface PropsType {
    isLoading: boolean,
    notes: NoteType[],
    navigateToEditNote: any
}

const NotesCardContainer = ({ isLoading, notes, navigateToEditNote }: PropsType) => {
    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#ffff" />
            ) : (
                // @ts-ignore
                <Flex mt={6} gap='6' flexWrap={'wrap'} flexDir={'row'} justifyContent={'center'} alignItems={'center'} h={'full'}>
                    {notes?.map((note: NoteType) => <NoteThumnailCard key={note.id} info={note} navigateToEditNote={navigateToEditNote} />)}
                </Flex >
            )}
        </View>
    )
}

export default NotesCardContainer