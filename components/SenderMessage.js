import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9333ea",
    borderRadius: 30,
    borderTopRightRadius: 0,
    paddingRight: 20,
    paddingLeft: 14,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
});
