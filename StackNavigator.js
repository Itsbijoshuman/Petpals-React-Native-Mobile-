import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import Chat from "./components/Chat";
import LoginScreen from "./components/LoginScreen";
import Modal from "./components/Modal";
import useAuth from "./hooks/useAuth";
import Match from "./components/Match";
import MessageScreen from "./components/MessageScreen";
import Profile from "./components/Profile";
import gig from "./components/gig";
import gigmodal from "./components/gigmodal";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="gig"component={gig}/>
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="Modal" component={Modal} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Match" component={Match} />
          <Stack.Screen name="gigmodal" component={gigmodal} />
        </Stack.Group>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
