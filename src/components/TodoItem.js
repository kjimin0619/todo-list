import { useContext } from "react";
import { TodoDispatchContext } from "../App";
import MyButton from "./MyButton";

function TodoItem({ id, content, date, isDone }) {
  const { onDone } = useContext(TodoDispatchContext);

  const type = isDone ? "todo-content-done" : "todo-content";
  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        id={id}
        onClick={() => onDone(id, content, date, isDone)}
      />
      <label className={type} htmlFor={id}>
        {content}
      </label>
      <MyButton text={"수정"}></MyButton>
      <MyButton text={"삭제"} type="negative"></MyButton>
    </div>
  );
}

TodoItem.defaultProps = {
  id: 0,
  content: "test todo",
  date: new Date(),
  isDone: false,
};

export default TodoItem;
