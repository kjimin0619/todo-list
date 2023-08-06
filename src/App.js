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

    case "REMOVE": {
      newState = oldState.filter((it) => it.id !== action.id);
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
  localStorage.setItem("todo", JSON.stringify(newState));
  return newState;
};

export const TodoStateContext = React.createContext(); // 데이터 공급
export const TodoDispatchContext = React.createContext(); // 데이터 처리 함수 공급

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  // 첫 마운트 시에만 시행
  // todolist 데이터 관련 설정
  useEffect(() => {
    const localData = localStorage.getItem("todo");

    if (localData) {
      const todoList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (todoList.length >= 1) {
        dataId.current = parseInt(todoList[0].id) + 1;
        dispatch({ type: "INIT", data: todoList });
      }
    }
  }, []);

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

  // DONE & UNDO
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

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      id: targetId,
    });
  };

  // EDIT
  const onEdit = (targetId, content, date, isDone) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        content: content,
        date: date,
        isDone: isDone,
      },
    });
  };

  return (
    <TodoStateContext.Provider value={data}>
      <TodoDispatchContext.Provider
        value={{ onCreate, onEdit, onDone, onRemove }}
      >
        <div className="App">
          <Home></Home>
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;
