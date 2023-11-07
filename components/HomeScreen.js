import {
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";                        
import { db } from "../Firebase";
import generateId from "../lib/GenerateId";


const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout, user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs                  
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          console.log(`You've matched with ${userSwiped.displayName}`);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log(
            `You swiped MATCH on ${userSwiped.displayName} (${userSwiped.name})`
          );
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: "white" }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileImageContainer} onPress={() => navigation.navigate("Profile")}>
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("gig")}>
        <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/726664epdqg-87%3A555?alt=media&token=2afd7c8b-15e4-488f-9030-d5a29b84c65d" }} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Modal")}>
        <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/h2d3ef5jvtc-86%3A539?alt=media&token=f80d2133-503d-4f5c-acfa-6251d89b0b1c" }} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoImageContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={{uri : "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/k5fvyf34aid-86%3A551?alt=media&token=5467b9f7-7139-4dea-b69d-3635b12920fb"}}
            style={styles.logoImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/9ma7wqbzz1f-86%3A542?alt=media&token=0f733ce7-afb3-4012-b23a-856614af3947" }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.swiper}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                  fontSize: 40,
                  marginRight: 10,
                },
              },
            },
            right: {
              title: "INTERESTED",
              style: {
                label: {
                  color: "#4ded30",
                  fontSize: 40,
                  marginLeft: 10,
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View key={card.id} style={styles.swiperCard}>
                <Image
                  style={styles.swiperCardImage}
                  source={{ uri: card.photoURL }}
                />
                <View style={styles.imageTextContainer}>
                  <Text style={styles.imageTextName}>
                    (O):{card.displayName},Age:{card.age}mo
                  </Text>
                  <Text style={styles.imageTextJob}>Name:{card.name}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  styles.swiperCard,
                  { alignItems: "center", justifyContent: "center" },
                ]}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}
                >
                  No Pets For You at The Moment 
                </Text>
                <Image
                  style={{ height: 80, width: 100 }}
                  source={{uri : "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/rj82nzhx2qk-88%3A558?alt=media&token=dec28299-fa1e-4e8c-98fd-88c681d54a98"}}
                />
              </View>
            )
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonCross}
          onPress={() => swipeRef.current.swipeLeft()}
        >
        <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/5x9gviash6f-92%3A562?alt=media&token=22ef6898-b590-483d-840b-dc853cd740a1" }} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonHeart}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmw4wif96jq-93%3A568?alt=media&token=24351614-61a9-4f12-8b3d-520336144818" }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 170,
    paddingHorizontal: 10,
  },
  profileImageContainer: {},

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  logoImageContainer: {
    width: 70,
    height: 70,
  },

  logoImage: {
    width: 70,
    height: 70,
  },

  swiper: {
    flex: 1,
    marginTop: -45,
  },

  swiperCard: {
    backgroundColor: "white",
    height: "72%",
    borderRadius: 20,
    position: "relative",
    shadowColor: "000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  swiperCardImage: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },

  imageTextContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#232222",
    width: "100%",
    height: 80,
    paddingHorizontal: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
  },

  imageTextName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    fontFamily: 'sans-serif-condensed'
  },

  imageTextAge: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    fontFamily: 'sans-serif-condensed'
    
  },

  imageTextJob: {
    color: "white",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    
  },

  buttonCross: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 80,
    height: 70,
    backgroundColor: "rgba(255,0,0, 0.3)",
  },

  buttonHeart: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 80,
    height: 70,
    backgroundColor: "rgba(50,205,50, 0.3)",
  },
});

export default HomeScreen;