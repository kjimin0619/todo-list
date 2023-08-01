import React, { useReducer, useRef } from "react";
import "./App.css";
import Home from "./pages/Home";

const reducer = (oldState, action) => {};
const tempData = [
  { id: 0, content: "장보러 가기", date: new Date(), isDone: false },
  { id: 1, content: "과제하기", date: new Date(), isDone: false },
];

export const TodoStateContext = React.createContext();
function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  return (
    <TodoStateContext.Provider value={tempData}>
      <div className="App">
        <Home></Home>
      </div>
    </TodoStateContext.Provider>
  );
}

export default App;
