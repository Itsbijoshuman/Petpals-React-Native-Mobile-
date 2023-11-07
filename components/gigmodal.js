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
    const [image_gig, setImage_gig] = useState(null);
    const [name_gig, setname_gig] = useState(null);
    const [age_gig, setAge_gig] = useState(null);
    const [profession_gig, setprofession_gig] = useState(null);
    const [gig, setgig] = useState(null);
  
    const incompleteForm = !image_gig || !name_gig || age_gig < 1;
    const navigation = useNavigation();
  
    const updateUserProfile = () => {
      setDoc(doc(db, "users_gig", user.uid), {
        id: user.uid,
        displayName: user.displayName,
        photoURL: image_gig,
        name_gig: name_gig,
        age_gig: age_gig,
        profession : profession_gig,
        gig : gig,
        timeStamp: serverTimestamp(),
      })
        .then(() => {
          navigation.navigate("gig");
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
            source={{uri : "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/y94gz5um75-90%3A560?alt=media&token=c9517c17-5d4a-4aea-ad42-0d58b31ca947"}}
          />
          <Text style={styles.welcomeText}>BEGIN YOUR JOURNEY !</Text>
          <Text style={styles.steps}>Step 1: Your Profile Pic</Text>
          <TextInput
            style={styles.input}
            value={image_gig}
            onChangeText={setImage_gig}
            placeholder="Picture URL : "
          />
          <Text style={styles.steps}>Step 2: Your Name</Text>
          <TextInput
            style={styles.input}
            value={name_gig}
            onChangeText={setname_gig}
            placeholder="Enter name :"
          />
          <Text style={styles.steps}>Step 3: AGE :</Text>
          <TextInput
            style={styles.input}
            value={age_gig}
            onChangeText={setAge_gig}
            placeholder="Enter Age :"
            keyboardType="numeric"
          />
          <Text style={styles.steps}>Step 4: Profession : </Text>
          <TextInput
            style={styles.input}
            value={profession_gig}
            onChangeText={setprofession_gig}
            placeholder="Enter Profession :"
          />
          <Text style={styles.steps}>Step 5: What are you looking For ? : </Text>
          <TextInput
            style={styles.input}
            value={gig}
            onChangeText={setgig}
            placeholder="WORK ? :"
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
      paddingTop: 150,
      backgroundColor: "white",
    },
  
    image: {
      height: 80,
      width: "100%",
    },
  
    welcomeText: {
      color: "#232222",
      fontSize: 20,
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
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100,
    },
  
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
    },
  });
  