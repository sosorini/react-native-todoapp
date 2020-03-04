import React, { Component } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";

class Movie extends Component {
  _isMounted = false; // memory leak

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: {}
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    try {
      const response = await fetch("https://yts.mx/api/v2/list_movies.json?limit=50");
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        dataSource: responseJson.data.movies // 바로 직전 태그까지. dataSource.title로 바로 찾아갈수있게.
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let titles = this.state.dataSource.map((val, key) => {
        return (
          <View key={key} style={styles.item}>
            <Text>{val.title}</Text>
          </View>
        );
      });
      return <View style={styles.container}>{titles}</View>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bbb",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    // alignItems: "center",
    justifyContent: "center"
  }
});

export default Movie;
