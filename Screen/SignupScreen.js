import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(signUpURL, {
        name,
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style="p-4">
      <Text style="text-2xl font-bold text-center mb-6">Sign up</Text>

      <TextInput
        placeholder="Name"
        style="border border-gray-400 rounded-lg py-2 px-4 mb-4"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style="border border-gray-400 rounded-lg py-2 px-4 mb-4"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        style="border border-gray-400 rounded-lg py-2 px-4 mb-4"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style="bg-blue-500 rounded-lg py-2 px-4"
        onPress={handleSubmit}
      >
        <Text style="text-white text-center font-bold">Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
