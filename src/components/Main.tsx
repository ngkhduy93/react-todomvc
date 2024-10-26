import { FilterValues } from "../store";
import { useFilterStore, useListStore } from "../store";
import ListItem from "./ListItem";

const Main = () => {
  const { todoList, toggleAllItems } = useListStore();
  const { filterValue } = useFilterStore();

  const currentList = todoList.filter(
    (item) => filterValue === FilterValues.ALL || item.state === filterValue
  );

  return todoList.length > 0 ? (
    <main className="main">
      <div className="toggle-all-container">
        <input
          type="checkbox"
          className="toggle-all"
          onClick={toggleAllItems}
        />
        <label className="toggle-all-label" htmlFor="toggle-all">
          Toggle All Input
        </label>
      </div>
      <ul className="todo-list" data-testid="todo-list">
        {currentList.map((item, index) => (
          <ListItem key={`${item}_${index}`} item={item}></ListItem>
        ))}
      </ul>
    </main>
  ) : null;
};

export default Main;
