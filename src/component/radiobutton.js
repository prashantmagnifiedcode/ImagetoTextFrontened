import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const RadioButton = ({ onPress, selected, children }) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    marginBottom: 5,
    marginHorizontal:10,

  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#98CFB6"
  },
  radioButtonText: {
    fontSize: 13,
    marginLeft: 16,
    color:"gray"
  },
  text: {
    lineHeight: 30,
    fontSize: 20,
    marginVertical: 5
  }
});

export default RadioButton;
