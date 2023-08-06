import { useContext, useEffect, useState } from "react";
import { TodoDispatchContext } from "../App";
import MyButton from "./MyButton";

function TodoItem({ id, content, date, isDone }) {
  console.log(id, content, date, isDone);
  const { onDone, onRemove, onEdit } = useContext(TodoDispatchContext);
  const type = isDone ? "todo-content-done" : "todo-content";
  const [isEdit, setIsEdit] = useState(false);
  const [curContent, setContent] = useState();

  useEffect(() => {
    setContent(content);
  }, [content]);

  const editor = (
    <input
      type={"text"}
      value={curContent}
      onChange={(e) => {
        setContent(e.target.value);
      }}
    ></input>
  );

  const handleSubmit = () => {
    if (isEdit) {
      onEdit(id, curContent, date, isDone);
    }
    setIsEdit(!isEdit);
  };

  return (
    <div className="TodoItem">
      <div className="item-text">
        <input
          type="checkbox"
          id={id}
          onClick={() => onDone(id, content, date, isDone)}
        />
        <label className={type} htmlFor={id}>
          {isEdit ? editor : curContent}
        </label>
      </div>
      <div className="item-button">
        <MyButton
          text={isEdit ? "완료" : "수정"}
          onClick={handleSubmit}
        ></MyButton>
        <MyButton
          text={"삭제"}
          onClick={() => {
            console.log("삭제", id);
            onRemove(id);
          }}
          type="negative"
        ></MyButton>
      </div>
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
