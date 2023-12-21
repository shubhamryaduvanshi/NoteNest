import { Flex, Heading, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid } from 'react-native';
import { getBaseURL } from '../common/common';

const CreateNote = ({ navigation, route }) => {
    const [noteId, setNoteId] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Education');
    const [finishBefore, setFinishBefore] = useState(new Date().toDateString());
    const [bgColor, setBgColor] = useState('');


    const { details, mode } = route.params;

    const getBgColor = () => {
        const randomColorCode = bgColorOptions[(Math.floor(Math.random() * bgColorOptions.length))].code;
        // setBgColor(randomColorCode);
        return randomColorCode;
    }
    const bgColorOptions = [{
        name: "Meant",
        code: "#f5fffa"
    },
    {
        name: "Yellow Green",
        code: "#9acd32"
    },
    {
        name: "Pale Green",
        code: "#98fb98"
    }
    ]
    const handleAddNote = () => {
        const payload = {
            id: noteId,
            title,
            description,
            category,
            finishBefore,
            bgColor: getBgColor(),
        };
        console.log('Note Data:', payload);
        const url = mode == 'edit' ? `${getBaseURL()}/${details?.id}` : getBaseURL();
        fetch(url, {
            method: mode == 'edit' ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(response => response.json())
            .then(res => {
                const toastMessage = mode == 'edit' ? 'Updated Successfully!' : 'Note Created Successfully!'
                ToastAndroid.show(toastMessage, ToastAndroid.SHORT);
                resetForm();
                navigation.navigate("Home")
            })

    };
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setCategory('');
        setFinishBefore(new Date().toDateString());
        setBgColor('');
    }
    const getNotesCount = async () => {
        try {
            const response = await fetch(getBaseURL());
            const json = await response.json();
            setNoteId(json.length + 1)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getNotesCount();
        console.log("route params", details, mode);
        patchValues();
    }, []);

    const patchValues = () => {
        if (mode !== 'edit' && !details) return;
        setNoteId(details.id)
        setTitle(details.title)
        setDescription(details.description)
        setCategory(details.category)
        setFinishBefore(details.finishBefore)
    }

    return (
        <View style={styles.container}>
            <Heading mb={10}>Let's {mode == 'edit' ? 'Update' : 'Create'}{" "}Note</Heading>
            <Flex w={'full'}>
                <Text pl={1}>Enter Title</Text>
                <TextInput
                    aria-label='Enter title'
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
            </Flex>
            <Flex w={'full'}>
                <Text pl={1}>Enter Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    multiline
                />
            </Flex>
            <Flex w={'full'}>
                <Text pl={1}>Enter Category</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Category"
                    value={category}
                    onChangeText={(text) => setCategory(text)}
                />
            </Flex>
            <Flex w={'full'}>
                <Text pl={1}>Enter Finish Before (e.g., YYYY-MM-DD)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Finish Before (e.g., YYYY-MM-DD)"
                    value={finishBefore}
                    onChangeText={(text) => setFinishBefore(text)}
                />
            </Flex>
            {/*  <Flex w={'full'}>
                <Text pl={1}>Select Background Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Background Color (e.g., #RRGGBB)"
                    value={bgColor}
                    onChangeText={(text) => setBgColor(text)}
                />
                </Flex> */}
            <Flex mt={4}>
                <Button title={mode === 'edit' ? 'Update Note' : 'Create Note'} onPress={handleAddNote}
                    disabled={!(title && description && category && finishBefore)}
                />
            </Flex>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default CreateNote;
