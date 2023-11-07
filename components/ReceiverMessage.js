import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ReceiverMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>{message.message}</Text>
      <Image style={styles.image} source={{ uri: message.photoURL }} />
    </View>
  );
};

export default ReceiverMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f87171",
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    paddingLeft: 20,
    paddingRight: 14,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 8,
    marginLeft: 55,
    alignSelf: "flex-start",
  },

  image: {
    height: 45,
    width: 45,
    borderRadius: 25,
    position: "absolute",
    top: 0,
    left: -55,
  },
});
