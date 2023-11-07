import { View, Text, SafeAreaView, Button } from "react-native";
import React from "react";
import Header from "./Header";
import ChatList from "./ChatList";

const Chat = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default Chat;
