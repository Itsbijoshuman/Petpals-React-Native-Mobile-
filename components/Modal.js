import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigation } from "@react-navigation/native";

const Modal = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [name, setname] = useState(null);
  const [age, setAge] = useState(null);
  const [breed, setBreed] = useState(null);

  const incompleteForm = !image || !name || age < 1;
  const navigation = useNavigation();

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      name: name,
      age: age,
      breed : breed,
      timeStamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri : "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/7v3z76d2r5d-90%3A560?alt=media&token=c07df87e-2db3-4568-9321-23c6692794ae"}}/>
        <Text style={styles.welcomeText}>BEGIN THEIR TALE !</Text>
        <Text style={styles.steps}>Step 1: The Profile Pic</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
          placeholder="Picture URL : "
        />
        <Text style={styles.steps}>Step 2: Name of The Pet</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setname}
          placeholder="Enter Animal's name :"
        />
        <Text style={styles.steps}>Step 3: AGE :</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Enter Animal's Age "
          keyboardType="numeric"
        />
        <Text style={styles.steps}>Step 4: Breed : </Text>
        <TextInput
          style={styles.input}
          value={breed}
          onChangeText={setBreed}
          placeholder="Enter Animal's Breed "
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: incompleteForm ? "#cbd5e0" : "#3E66FF" },
          ]}
          onPress={updateUserProfile}
          disabled={incompleteForm}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 110,
    backgroundColor: "white",
  },

  image: {
    height: 80,
    width: "100%",
  },

  welcomeText: {
    color: "#232222",
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
  },

  steps: {
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 16,
    color: "#3E66FF",
  },

  input: {
    marginTop: 15,
    fontSize: 20,
  },

  button: {
    width: 250,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
