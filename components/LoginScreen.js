import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <View style={styles.screen}>
      <ImageBackground
        resizeMode="contain"
        style={styles.background}
        source={require("../assets/logo.png")}
      >
        <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:"white"
  },

  background: {
    flex: 1,
    alignItems: "center",
  },

  button: {
    position: "absolute",
    bottom: "10%",
    backgroundColor: "#3E66FF",
    padding: 15,
    borderRadius: 20,
    width : "40%",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
  },
});

export default LoginScreen;
