import { useState, useRef, useEffect } from "react";
import { FilterValues, TodoItem, useListStore } from "../store";

export interface ListItemProps {
  item: TodoItem;
}

const ListItem = ({ item }: ListItemProps) => {
  const { handleInput, toggleItem, removeItem } = useListStore();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleDoubleClickItem = () => {
    setIsEditing(true);
  };

  const handleKeyUp = (event: any) => {
    const isSubmit = handleInput(event, item);
    if (isSubmit) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    } else {
      checkboxRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <li
      className={item.state === FilterValues.COMPLETED ? "completed" : ""}
      onDoubleClickCapture={handleDoubleClickItem}
    >
      {!isEditing ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            ref={checkboxRef}
            checked={item.state === FilterValues.COMPLETED}
            onClick={() => toggleItem(item)}
          />
          <label data-testid="todo-item-label">{item.name}</label>
          <button className="destroy" onClick={() => removeItem(item)} />
        </div>
      ) : (
        <div className="input-container">
          <input
            type="text"
            className="new-todo"
            id="todo-input"
            ref={inputRef}
            defaultValue={item.name}
            onBlur={() => setIsEditing(false)}
            onKeyUp={handleKeyUp}
          />
          <label className="visually-hidden" htmlFor="todo-input">
            {item.name}
          </label>
        </div>
      )}
    </li>
  );
};

export default ListItem;
