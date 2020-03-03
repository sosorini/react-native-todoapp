import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import ToDo from "./ToDo";
import { AppLoading } from "expo";
// import { uuidv1 } from "uuid/v1";
// import uuid from "uuid";
// import { v1 as uuidv1 } from "uuid";
import { default as UUID } from "uuid";

const { width, weight } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false, // disk에서 로딩해왔는지
    toDos: {}
  };
  componentDidMount = () => {
    this._loadToDos();
  };

  render() {
    // state에서 정보 가져오기
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos);
    if (!loadedToDos) {
      return <AppLoading>{/* <StatusBar barStyle="light-content" /> */}</AppLoading>;
    }
    // loadedToDos = true
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Prography To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"flutter"}
            value={newToDo} // New To Do
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"grey"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo} // 클릭할때
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {/* array일때{toDos.map(todo => <ToDo />)} */}
            {/* {Object.values(toDos)} 하면 array가 생기니까 map() 돌릴 수 있다 */}
            {Object.values(toDos)
              .reverse()
              .map(toDo => (
                <ToDo
                  key={toDo.id}
                  deleteToDo={this._deleteToDo}
                  completeToDo={this._completeToDo}
                  uncompleteToDo={this._uncompleteToDo}
                  updateToDo={this._updateToDo}
                  {...toDo}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
  //  이벤트에서 텍스트 가져오는 함수
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };

  // loadedToDos = true
  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };
  // local save
  _addToDo = () => {
    const { newToDo } = this.state;
    // ToDos들은 Object로 관리할 것이다- 삭제수정을 용이하게 하기 위해 Object
    // **새로운 todo를 추가하는 법**
    // 오브젝트 생성 + 오브젝트에 리스트로 추가(toDo) -> toDos를 변경하는 것이 아니다
    // toDos : prevState.toDos + newToDos 를 원한다
    if (newToDo !== "") {
      this.setState(prevState => {
        // const ID = UUID.v4(); // ID를 만드는 건 uuid package (yarn으로 하면 expo와 충돌)
        const ID = Math.random()
          .toString(36)
          .substr(2, 11);
        const newToDoObject = {
          // uuid : [ID] or '[ID]' or 'someid'
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        // new Object 생성
        const newState = {
          ...prevState, // 이전상태state
          newToDo: "",
          toDos: {
            ...prevState.toDos, //이전toDos + 새로운toDos
            ...newToDoObject
          }
        };
        return { ...newState };
      });
    }
  };
  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      return { ...newState };
    });
  };
  // 할일 목록을 완성, 미완성 - 이걸 만듦으로써 로컬에 저장가능. ToDo는 안됨.
  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      return { ...newState };
    });
  };
  _uncompleteToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            //같은 id 쓰는 것을 만나면 덮어쓸 것
            ...prevState.toDos[id], // text, id, isCompleted, createAt 등이 들어있음
            isCompleted: false
          }
        }
      };
      return { ...newState };
    });
  };
  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          //같은 id 쓰는 것을 만나면 덮어쓸 것
          [id]: {
            ...prevState.toDos[id], // text, id, isCompleted, createAt 등이 들어있음
            text
          }
        }
      };
      return { ...newState };
    });
  };
}

//stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    marginTop: 50,
    marginBottom: 30,
    fontSize: 30,
    color: "white",
    fontWeight: "200"
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1, // StyleSheet.hairline
    fontSize: 20,
    backgroundColor: "#e7e1e1"
  },
  toDos: {
    alignItems: "center"
  }
});
