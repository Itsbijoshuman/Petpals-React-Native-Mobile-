import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";

const Match = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri : "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/vrficl5wmn-202%3A40?alt=media&token=098b9e9a-8024-4711-ac79-63b79253a4bc"}}
        />
      </View>

      <Text style={styles.text}>
        You and {userSwiped.displayName} are Connected !
      </Text>

      <View style={styles.profilePicContainers}>
        <Image
          style={styles.profilePic}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          style={styles.profilePic}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={styles.buttonText}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#3E66FF",
    paddingTop: 50,
    opacity: 0.89,
  },

  imageContainer: {
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingTop: 100,
  },

  image: {
    height: 124,
  },

  text: {
    color: "white",
    marginTop: 40,
    textAlign: "center",
  },

  profilePicContainers: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 70,
  },

  profilePic: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },

  button: {
    alignSelf: "center",
    marginTop: 60,
    backgroundColor: "white",
    height: 60,
    width: 300,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
