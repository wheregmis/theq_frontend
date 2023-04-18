import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

const RatingScreen = () => {
  const [userId, setUserId] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, rating }),
      });

      const data = await response.json();
      Alert.alert("Success", data.message);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter user ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        placeholder="Enter rating"
        value={rating}
        onChangeText={setRating}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default RatingScreen;
