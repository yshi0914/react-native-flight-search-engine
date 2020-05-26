import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Hello, I am James who built this app.</Text>
        <Text>Wish you have a great day! </Text>
      </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});