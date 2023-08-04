import { useContext, useEffect, useRef, useState } from "react";
import { TodoDispatchContext, TodoStateContext } from "../App";
import MyButton from "../components/MyButton";
import TodoList from "../components/TodoList";

function Home() {
  // 날짜 제어
  const [curDate, setCurDate] = useState(new Date());
  const year = curDate.getFullYear();
  const month = curDate.getMonth() + 1;
  const rMonth = month >= 10 ? month : "0" + `${month}`;
  const day = curDate.getDate();
  const rDay = day >= 10 ? day : "0" + `${day}`;

  const headTxt = `${year}년 ${rMonth}월 ${rDay}일`;

  const increaseDay = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 1)
    );
  };

  const decreaseDay = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 1)
    );
  };

  // 투두리스트 데이터
  const todoList = useContext(TodoStateContext);
  const [data, setData] = useState([]);

  // 투두리스트 업데이트 제어(날짜 필터링)
  useEffect(() => {
    if (todoList.length >= 1) {
      const startTime = new Date(
        `${curDate.getFullYear()}-${
          curDate.getMonth() + 1
        }-${curDate.getDate()}`
      );

      const endTime = new Date(
        `${curDate.getFullYear()}-${curDate.getMonth() + 1}-${
          curDate.getDate() + 1
        }`
      );

      setData(
        todoList.filter(
          (it) => it.date >= startTime.getTime() && it.date < endTime.getTime()
        )
      );
    }
  }, [todoList, curDate]);

  const { onCreate, onEdit, onDone } = useContext(TodoDispatchContext);
  const [content, setContent] = useState(""); // 작성한 투두리스트 내용
  const contentRef = useRef();

  // 작성 완료 함수
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    setContent("");
    onCreate(content, curDate);
  };

  return (
    <div>
      <header>
        <div className="head_btn_left">
          <MyButton text={"이전"} onClick={decreaseDay}></MyButton>
        </div>
        <div className="head_text">
          <h2>{headTxt}의 할일</h2>
          <input
            type="date"
            id="date"
            value={`${year}-${rMonth}-${rDay}`}
            onChange={(e) => {
              setCurDate(new Date(e.target.value));
            }}
          ></input>
        </div>
        <div className="head_btn_right">
          <MyButton text={"다음"} onClick={increaseDay}></MyButton>
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

      <TodoList todoList={data} />
    </div>
  );
}

export default Home;
