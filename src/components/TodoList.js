import TodoItem from "./TodoItem";

function TodoList({ todoList }) {
  return (
    todoList && (
      <div className="TodoList">
        {todoList.map((it) => (
          <div key={it.id}>
            <TodoItem
              id={it.id}
              content={it.content}
              date={it.date}
              isDone={it.isDone}
            ></TodoItem>
          </div>
        ))}
      </div>
    )
  );
}

export default TodoList;
