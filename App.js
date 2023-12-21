import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./pages/Home.tsx";
import CreateNote from "./pages/CreateNote.tsx";
import PasswordGenerator from "./pages/PasswordGenerator.tsx";


const Stack = createNativeStackNavigator();

export default function App() {
  // Todo: Now to implement routing in react native for that will use : https://reactnavigation.org/docs/params
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Create Note" component={CreateNote} />
          <Stack.Screen name="Generate Password" component={PasswordGenerator} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );



}



