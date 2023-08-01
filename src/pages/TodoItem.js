function TodoItem({ id, content, date, isDone }) {
  const type = isDone ? "todo-content-done" : "todo-content";
  return (
    <div className="TodoItem">
      <input type="checkbox" id={id} onClick={() => console.log(id, content)} />
      <label className={type} htmlFor={id}>
        {content}
      </label>
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
