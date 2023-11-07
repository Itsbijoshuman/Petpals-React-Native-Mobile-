import React, { Component } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

class FireBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      messages: [],
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleBotResponse = this.handleBotResponse.bind(this);
  }

  componentDidMount() {
    // Send the initial welcome message from the bot
    const initialMessage = "Welcome to PetPals, I am here to help you";
    this.handleBotResponse(initialMessage.toLowerCase());
  }

  handleInput(input) {
    const newMessage = { text: input, type: "user" };

    this.setState((prevState) => ({
      messages: [...prevState.messages, newMessage],
      userInput: "",
    }));

    this.handleBotResponse(input.toLowerCase());
  }

  handleBotResponse(userInput) {
    if (this.state.messages.length === 0) {
      // Handle initial welcome message with pre-prompted response
      const initialMessage = "Welcome to PetPals! I'm here to help you with any questions you have about pet adoption.\n\nYou can ask me things like:\n- Tell me about PetPals\n- How can I adopt a pet?\n- send SOS' for emergencies\n\nFeel free to type your question or choose from the examples above!";
      const newBotMessage = { text: initialMessage, type: "bot" };
  
      setTimeout(() => {
        this.setState((prevState) => ({
          messages: [...prevState.messages, newBotMessage],
        }));
      }, 1000);
  
      return;
    }
  
    const responses = {
      "sos": "Hello , you are now connected to SOS , Kindly state your issue or select from an option below: \n1.Injured stray found \n2.Need Emergency Assistance \n3.Talk to a representative",
      "injured stray found":"Fetching your location ! Kindly connect to following \n1.Sample Clinic(500m away) \n2.Sample Hotline(88383843)",
      "need emergency assistance":"Fetching your location ! Kindly connect to following \n1.Sample Clinic(500m away) \n2.Sample Hotline(88383843)",
      "talk to a representative":"Our Volunteer will call you shortly , please wait !",
      "injured stray found":"Fetching your location ! Kindly connect to following \n1.Sample Clinic(500m away) \n2.Sample Hotline(88383843)",
      "hello": "Hello! Welcome to PetPals, your go-to platform for adopting adorable pets!",
      "tell me about petpals": "PetPals is a pet adoption platform where you can find a variety of lovable pets looking for their forever homes.",
      "how does PetPals work": "At PetPals, you can browse through profiles of pets available for adoption. Once you find a pet you love, you can contact the shelter or organization for more information.",
      "what kind of pets are available": "You can find a wide range of pets on PetPals, including dogs, cats, rabbits, and even small animals like hamsters and birds.",
      "how can i adopt a pet": "To adopt a pet, simply browse the profiles, choose a pet you connect with, and follow the provided adoption process. Each pet's profile includes contact information for the shelter or organization.",
      "where can I find more information about adoption": "For more information about adopting a pet, visit our website: [PetPals Adoption](https://www.petpalsadoption.com/adopt).",
      "can I see some available pets": "Sure! Check out these adorable pets available for adoption:\n1. [Buddy the Dog](https://www.petpalsadoption.com/pets/buddy)\n2. [Mittens the Cat](https://www.petpalsadoption.com/pets/mittens)\n3. [Hopper the Rabbit](https://www.petpalsadoption.com/pets/hopper)",
      "what should I consider before adopting": "Before adopting a pet, consider factors like your living situation, time commitment, and the needs of the pet. Our adoption counselors can provide guidance.",
      "can I donate to PetPals": "Absolutely! Your donations help us care for the pets and maintain our services. You can donate on our website: [Donate to PetPals](https://www.petpalsadoption.com/donate).",
      "how can I volunteer with PetPals": "We appreciate your interest in volunteering! You can find information about volunteering opportunities on our website: [Volunteer with PetPals](https://www.petpalsadoption.com/volunteer).",
      "how are you": "I'm just a bot, but I'm here to help!",
      "what's your name": "I am a chatbot.",
      "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
      "how old are you": "I don't have an age. I'm a computer program.",
      "what is the meaning of life": "The answer to the ultimate question of life, the universe, and everything is 42.",
      "who created you": "I was created by OpenAI.",
      "how does a computer work": "A computer works by processing binary data through its various components.",
      "what's the weather like today": "I'm sorry, I can't provide real-time information.",
      "do you dream": "I don't experience dreams like humans do.",
      "can you dance": "I'm not equipped for physical actions like dancing.",
      "what's your favorite color": "I don't have personal preferences, but I can display any color you like.",
      "what's the capital of France": "The capital of France is Paris.",
      "how do I bake a cake": "Baking a cake involves mixing ingredients, followed by baking in an oven.",
      "what's the largest mammal": "The blue whale is the largest mammal on Earth.",
      "who wrote Romeo and Juliet": "William Shakespeare wrote Romeo and Juliet.",
      "what's the speed of light": "The speed of light in a vacuum is approximately 299,792 kilometers per second.",
      "tell me about space exploration": "Space exploration involves sending spacecraft and satellites beyond Earth's atmosphere to learn about celestial bodies.",
      // Add more input-response pairs here
    };
  
    const botResponse = responses[userInput] || "I'm sorry, I don't understand. Please try a different question.";
  
    setTimeout(() => {
      const newBotMessage = { text: botResponse, type: "bot" };
  
      this.setState((prevState) => ({
        messages: [...prevState.messages, newBotMessage],
      }));
    }, 1000);
  }

  renderMessage({ item }) {
    const messageStyle = item.type === "bot" ? styles.botMessage : styles.userMessage;
    return (
      <View style={messageStyle}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.messages}
          renderItem={this.renderMessage.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messagesContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Type your message..."
            onChangeText={(text) => this.setState({ userInput: text })}
            value={this.state.userInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => this.handleInput(this.state.userInput)}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  messagesContainer: {
    padding: 16,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#4169e1",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4682b4",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
    color:'white',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "blue",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FireBot;
