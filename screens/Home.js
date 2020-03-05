import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Button } from "react-native";

const { width, height } = Dimensions.get("window");
class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPressOut={() => this.props.navigation.navigate("ToDoApp")}>
          <View style={styles.action}>
            <Text style={styles.text}>To Do List</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPressOut={() => this.props.navigation.navigate("MovieScreen")}>
          <View style={styles.action}>
            <Text style={styles.text}>Movie</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height / 4,
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: 20
  },
  action: {
    width: width - 100,
    margin: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#F32657",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    color: "white"
  }
});
