import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/GetMatchedUserInfo";
import { useNavigation } from "@react-navigation/native";
import { db } from "../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails,
        })
      }
    >
      <Image style={styles.image} source={{ uri: matchedUserInfo?.photoURL }} />
      <View>
        <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 5 }}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  image: {
    borderRadius: 50,
    height: 64,
    width: 64,
    marginRight: 16,
  },
});
