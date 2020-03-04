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
        <Button title="hi" />
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: height / 4,
    alignItems: "center",
    width: width - 50,
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  action: {
    // marginVertical: 15,
    // marginHorizontal: 15,
    height: 50,
    margin: 5,
    // padding: 5,
    backgroundColor: "#F32657",
    borderRadius: 10,
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    marginVertical: 10,
    marginHorizontal: 100
  }
});
