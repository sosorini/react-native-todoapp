<<<<<<< HEAD
import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    completeToDo: PropTypes.func.isRequired,
    uncompleteToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired
  }; // deleteToDo만 props에서 또 얻어오는 이유는 뭐지

  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted, updateToDo } = this.props; // props에서 text 받아오자
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          {/* <TouchableOpacity onPress={this._toggleComplete}> */}
          {isEditing ? (
            // <TouchableOpacity>
            <TextInput
              style={[
                styles.input,
                styles.text,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={"done"}
              onBlur={this._finishEditing} // blur 편집종료
            />
          ) : (
            // </TouchableOpacity>
            // not edit
            <Text
              onPress={this._toggleComplete}
              style={[styles.text, isCompleted ? styles.completedText : styles.unCompletedText]}
            >
              {text}
            </Text>
          )}
          {/* </TouchableOpacity> */}
        </View>
        <View>
          {/* 수정삭제버튼 */}
          {isEditing ? (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._finishEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>완료</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText2}>수정</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={event => deleteToDo(id)}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText3}>삭제</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  // onPress - Text
  _toggleComplete = () => {
    const { isCompleted, completeToDo, uncompleteToDo, id } = this.props;
    if (isCompleted) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };
  // onPressOut - TouchableOpacity
  _startEditing = () => {
    const { text } = this.props;
    this.setState({
      isEditing: true
    });
  };
  _finishEditing = () => {
    const { id, updateToDo } = this.props; // 여기서 사용하려면 props에서 받아오는거
    const { toDoValue } = this.state;
    updateToDo(id, toDoValue); // func 인자가 2개였다
    this.setState({
      // prevState 받아서 isEditing 실행하니까 not working
      isEditing: false
    });
  };

  // 수정 텍스트 -> toDovalue로 넘기기
  _controlInput = text => {
    this.setState({ toDoValue: text });
  };
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "black",
    //width: width - 50,
    width: width - 30,
    fontSize: 20,
    // borderBottomColor: "#bbb",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#e4cdce",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  // circle: {
  //     width: 30,
  //     height: 30,
  //     borderRadius: 15, // width/2
  //     marginRight: 20,
  //     marginLeft: 20,
  //     borderWidth: 3,
  // },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20, // top & bottom
    marginHorizontal: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  unCompletedCircle: {
    borderColor: "#F32657"
  },
  completedText: {
    color: "grey",
    textDecorationLine: "line-through"
  },
  unCompletedText: {
    color: "black"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width / 2
    // backgroundColor: "red"
  },
  actions: {
    flexDirection: "row" // default : column
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  actionText2: {
    color: "blue"
  },
  actionText3: {
    color: "red"
  },
  input: {
    width: width / 2
    // marginVertical: 20
  }
});
=======
import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    completeToDo: PropTypes.func.isRequired,
    uncompleteToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired
  }; // deleteToDo만 props에서 또 얻어오는 이유는 뭐지

  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted, updateToDo } = this.props; // props에서 text 받아오자
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          {/* <TouchableOpacity onPress={this._toggleComplete}> */}
          {isEditing ? (
            // <TouchableOpacity>
            <TextInput
              style={[
                styles.input,
                styles.text,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              returnKeyType={"done"}
              onBlur={this._finishEditing} // blur 편집종료
            />
          ) : (
            // </TouchableOpacity>
            // not edit
            <Text
              onPress={this._toggleComplete}
              style={[styles.text, isCompleted ? styles.completedText : styles.unCompletedText]}
            >
              {text}
            </Text>
          )}
          {/* </TouchableOpacity> */}
        </View>
        <View>
          {/* 수정삭제버튼 */}
          {isEditing ? (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._finishEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>완료</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText2}>수정</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={event => deleteToDo(id)}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText3}>삭제</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  // onPress - Text
  _toggleComplete = () => {
    const { isCompleted, completeToDo, uncompleteToDo, id } = this.props;
    if (isCompleted) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };
  // onPressOut - TouchableOpacity
  _startEditing = () => {
    const { text } = this.props;
    this.setState({
      isEditing: true
    });
  };
  _finishEditing = () => {
    const { id, updateToDo } = this.props; // 여기서 사용하려면 props에서 받아오는거
    const { toDoValue } = this.state;
    updateToDo(id, toDoValue); // func 인자가 2개였다
    this.setState({
      // prevState 받아서 isEditing 실행하니까 not working
      isEditing: false
    });
  };

  // 수정 텍스트 -> toDovalue로 넘기기
  _controlInput = text => {
    this.setState({ toDoValue: text });
  };
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "black",
    //width: width - 50,
    width: width - 30,
    fontSize: 20,
    // borderBottomColor: "#bbb",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#e4cdce",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  // circle: {
  //     width: 30,
  //     height: 30,
  //     borderRadius: 15, // width/2
  //     marginRight: 20,
  //     marginLeft: 20,
  //     borderWidth: 3,
  // },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20, // top & bottom
    marginHorizontal: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  unCompletedCircle: {
    borderColor: "#F32657"
  },
  completedText: {
    color: "grey",
    textDecorationLine: "line-through"
  },
  unCompletedText: {
    color: "black"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width / 2
    // backgroundColor: "red"
  },
  actions: {
    flexDirection: "row" // default : column
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  actionText2: {
    color: "blue"
  },
  actionText3: {
    color: "red"
  },
  input: {
    width: width / 2
    // marginVertical: 20
  }
});
>>>>>>> fa59697152d636fde78161a9fb2a92acdef780f4
