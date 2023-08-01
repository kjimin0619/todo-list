import { useContext } from "react";
import { TodoStateContext } from "../App";
import MyButton from "../components/MyButton";
import { getStringDate } from "../util/date";
import TodoList from "./TodoList";

function Home() {
  const currDate = getStringDate(new Date()).slice(6);

  const todoList = useContext(TodoStateContext);

  // 날짜 관리

  return (
    <div>
      <header>
        <div className="head_btn_left">
          <MyButton
            text={"이전"}
            onClick={() => {
              console.log("어제");
            }}
          ></MyButton>
        </div>
        <div className="head_text">
          <h2>{currDate}의 할일</h2>
          <input type="date"></input>
        </div>
        <div className="head_btn_right">
          <MyButton
            text={"다음"}
            onClick={() => {
              console.log("내일");
            }}
          ></MyButton>
        </div>
      </header>
      <div className="item_adder">
        <input type="text" placeholder="할 일을 추가해보세요"></input>
        <div className="btn_adder">
          <MyButton type={"positive"} text="추가"></MyButton>
        </div>
      </div>

      <TodoList todoList={todoList} />
    </div>
  );
}

export default Home;
