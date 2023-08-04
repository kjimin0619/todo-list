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
      break;
    }

    case "DONE": {
      newState = oldState.filter((it) => it.id !== action.data.id);
      newState = [...newState, { ...action.data }]; // 끝난 작업 맨 아래로

      break;
    }

    case "EDIT": {
      break;
    }

    default:
      return oldState;
  }
  return newState;
};

// 임시 데이터
const tempData = [
  { id: 0, content: "장보러 가기", date: 1691134164701, isDone: false },
  { id: 1, content: "과제하기", date: 1691161200000, isDone: false },
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
  const onCreate = (content, curDate) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        content: content,
        date: curDate.getTime(),
        isDone: false,
      },
    });
  };

  // REMOVE(DONE)
  const onDone = (targetId, content, date, isDone) => {
    dispatch({
      type: "DONE",
      data: {
        id: targetId,
        content,
        date,
        isDone: !isDone,
      },
    });
  };

  // EDIT
  const onEdit = (targetId, content, date, isDone) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        content: content,
        date: new Date(date).getTime,
        isDone: isDone,
      },
    });
  };

  return (
    <TodoStateContext.Provider value={data}>
      <TodoDispatchContext.Provider value={{ onCreate, onEdit, onDone }}>
        <div className="App">
          <Home></Home>
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;
