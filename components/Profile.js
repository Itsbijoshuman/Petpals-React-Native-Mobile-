import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [gigUserData, setGigUserData] = useState(null);
  const navigation = useNavigation();
  const { logout, user } = useAuth();
  const { width, height } = Dimensions.get("window");

  const imageDimensions = Math.min(width, height) * 0.4;
  const fontSize = Math.min(width, height) * 0.03;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
        } else {
          console.log("User data not found!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const fetchGigUserData = async () => {
      try {
        const gigDocRef = doc(db, "users_gig", auth.currentUser.uid);
        const gigDocSnapshot = await getDoc(gigDocRef);

        if (gigDocSnapshot.exists()) {
          setGigUserData(gigDocSnapshot.data());
        } else {
          console.log("Gig user data not found!");
        }
      } catch (error) {
        console.error("Error fetching gig user data: ", error);
      }
    };

    fetchUserData();
    fetchGigUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      
      {userData && (
        <>
          <Text style={styles.sectionTitle}>Pet Owner Information</Text>
          <Image style={[styles.profileImage, { width: imageDimensions, height: imageDimensions }]} source={{ uri: userData.photoURL }} />
          <Text style={[styles.displayName, { fontSize: fontSize }]}>Owner: {userData.displayName}</Text>
          <Text style={[styles.label, { fontSize: fontSize }]}>Pet Name: {userData.name}</Text>
          <Text style={[styles.label, { fontSize: fontSize }]}>Breed: {userData.breed}</Text>
          <Text style={[styles.label, { fontSize: fontSize }]}>Age: {userData.age} months</Text>
        </>
      )}

      {gigUserData && (
        <>
          <Text style={styles.sectionTitle}>Gig Worker Information</Text>
          <Image style={[styles.profileImage, { width: imageDimensions, height: imageDimensions }]} source={{ uri: gigUserData.photoURL }} />
          <Text style={[styles.label, { fontSize: fontSize }]}>Name: {gigUserData.name_gig}</Text>
          <Text style={[styles.label, { fontSize: fontSize }]}>Profession: {gigUserData.profession}</Text>
          <Text style={[styles.label, { fontSize: fontSize }]}>Open For : {gigUserData.gig}</Text>
        </>
      )}

      <TouchableOpacity style={[styles.logoutButton, { fontSize: fontSize * 1.2 }]} onPress={() => auth.signOut()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor : "white",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: "#3E66FF",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileImage: {
    borderRadius: 100,
    marginBottom: 20,
  },
  displayName: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 46,
  },
  label: {
    marginBottom: 10,
    color: "#333",
    fontWeight: "bold",
    fontSize: 46,
    fontFamily: "sans-serif-condensed",

  },
  logoutButton: {
    backgroundColor: "#3E66FF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Profile;
