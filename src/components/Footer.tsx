import { useShallow } from "zustand/shallow";
import { FilterValues } from "../store";
import { useFilterStore, useListStore } from "../store";

const Footer = () => {
  const { todoList, handleClearCompleted } =
    useListStore(
      useShallow((state) => ({
        todoList: state.todoList,
        handleClearCompleted: state.clearCompleted,
      }))
    );
  const { filterValue, handleFilter } = useFilterStore();
  const activeListLength = todoList.filter((item) => item.state === FilterValues.ACTIVE).length;
  return todoList.length > 0 ? (
    <footer className="footer">
      <span className="todo-count">{activeListLength} items left!</span>
      <ul className="filters">
        <li>
          <a
            className={filterValue === FilterValues.ALL ? "selected" : ""}
            href="#/"
            onClick={handleFilter}
          >
            {FilterValues.ALL}
          </a>
        </li>
        <li>
          <a
            className={filterValue === FilterValues.ACTIVE ? "selected" : ""}
            href="#/active"
            onClick={handleFilter}
          >
            {FilterValues.ACTIVE}
          </a>
        </li>
        <li>
          <a
            className={filterValue === FilterValues.COMPLETED ? "selected" : ""}
            href="#/completed"
            onClick={handleFilter}
          >
            {FilterValues.COMPLETED}
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClearCompleted}>
        Clear completed
      </button>
    </footer>
  ) : null;
};

export default Footer;