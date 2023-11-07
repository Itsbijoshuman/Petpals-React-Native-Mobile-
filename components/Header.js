import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.returnAndTitle}>
        <TouchableOpacity
          style={styles.return}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#3E66FF" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity
          style={styles.call}
          onPress={() => Alert.alert("This feature is Coming Soon!")}
        >
          <Foundation name="telephone" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  returnAndTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  return: {
    padding: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  call: {
    marginRight: 10,
    backgroundColor: "#3E66FF",
    borderRadius: 50,
    padding: 10,
    width: 45,
    alignItems: "center",
    
  },
});
