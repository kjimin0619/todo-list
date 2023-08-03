import { useContext, useRef, useState } from "react";
import { TodoDispatchContext, TodoStateContext } from "../App";
import MyButton from "../components/MyButton";
import { getStringDate } from "../util/date";
import TodoList from "./TodoList";

function Home() {
  const currDate = getStringDate(new Date()).slice(6);

  const todoList = useContext(TodoStateContext);
  const { onCreate, onEdit, onDone } = useContext(TodoDispatchContext);
  const [content, setContent] = useState(""); // 투두리스트 내용
  const contentRef = useRef();

  // 작성 완료 함수
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    onCreate(content);
    console.log("submit");
  };
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
        <input
          type="text"
          placeholder="할 일을 추가해보세요"
          ref={contentRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></input>
        <div className="btn_adder">
          <MyButton
            type={"positive"}
            text="추가"
            onClick={handleSubmit}
          ></MyButton>
        </div>
      </div>

      <TodoList todoList={todoList} />
    </div>
  );
}

export default Home;
