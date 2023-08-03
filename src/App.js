import React, { useReducer, useRef, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";

const reducer = (oldState, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };

      newState = [newItem, ...oldState];
      console.log(newState);
      break;
    }

    case "DONE": {
      newState = oldState.map((it) =>
        it.id === action.id ? (it.isDone = true) : it
      );
      break;
    }

    case "EDIT": {
      newState = oldState.map((it) =>
        it.id === action.data.id ? action.data : it
      );
      break;
    }

    default:
      return oldState;
  }
  return newState;
};
const tempData = [
  { id: 0, content: "장보러 가기", date: new Date().getTime(), isDone: false },
  { id: 1, content: "과제하기", date: new Date().getTime(), isDone: false },
];

export const TodoStateContext = React.createContext(); // 데이터 공급
export const TodoDispatchContext = React.createContext(); // 데이터 처리 함수 공급

function App() {
  // todolist 데이터 관련 설정
  useEffect(() => {
    dispatch({ type: "INIT", data: tempData });
  }, []);
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(2);

  // CREATE
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        content: content,
        date: new Date().getTime(),
        isDone: false,
      },
    });
  };

  // REMOVE(DONE)
  const onDone = (id) => {
    dispatch({
      type: "DONE",
      data: {
        id,
      },
    });
  };

  // EDIT
  const onEdit = (targetId, content, date) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime,
        content: content,
      },
    });
  };

  return (
    <TodoStateContext.Provider value={tempData}>
      <TodoDispatchContext.Provider value={{ onCreate, onEdit, onDone }}>
        <div className="App">
          <Home></Home>
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;
