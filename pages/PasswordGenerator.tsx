import { Box, Flex } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

  const generatePassword = () => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let specialChars = '!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';

    if (includeNumbers) chars += numbers;
    if (includeSpecialChars) chars += specialChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    ToastAndroid.show('Password copied to clipboard', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Password Length:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(length)}
        onChangeText={(value) => setLength(parseInt(value) || 0)}
      />

      <Flex w={'full'} justifyContent={'space-between'} flexDir={'row'} alignItems={'center'} my={2}>
        <Text style={styles.label}>Include Numbers:</Text>
        <Flex flexDir={'row'} alignItems={'center'}>
          <TextInput
            style={styles.checkbox}
            value={includeNumbers ? 'Yes' : 'No'}
            editable={false}
          />
          <Button
            title="Toggle"
            onPress={() => setIncludeNumbers(!includeNumbers)}
          />
        </Flex>
      </Flex>

      <Flex w={'full'} justifyContent={'space-between'} flexDir={'row'} alignItems={'center'} my={2} mb={8}>
        <Text style={styles.label}>Include Special Characters:</Text>
        <Flex flexDir={'row'} alignItems={'center'}>
          <TextInput
            style={styles.checkbox}
            value={includeSpecialChars ? 'Yes' : 'No'}
            editable={false}
          />
          <Button
            title="Toggle"
            onPress={() => setIncludeSpecialChars(!includeSpecialChars)}
          />
        </Flex>
      </Flex>
      <Button title="Generate" onPress={generatePassword} />
      {
        password && (
          <TextInput style={styles.password} value={password} multiline />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    fontSize: 16,
  },
  checkboxContainer: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    width: 60,
    textAlign: 'center',
  },
  password: {
    marginTop: 32,
    fontSize: 20,
    width: '100%',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,

  },
});

export default PasswordGenerator;
