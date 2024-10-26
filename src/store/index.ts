import { create } from "zustand";

export interface TodoItem {
  name: string;
  state: string;
}

export enum FilterValues {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}

interface FilterValueState {
  filterValue: string;
  setFilterValue: (value: string) => void;
  handleFilter: (event: any) => void;
}

interface TodoListState {
  todoList: TodoItem[];
  updateTodoList: (newTodoList: TodoItem[]) => void;
  handleInput: (event: any, item?: TodoItem) => boolean;
  toggleItem: (item: TodoItem) => void;
  toggleAllItems: () => void;
  removeItem: (item: TodoItem) => void;
  clearCompleted: () => void;
}

const initTodoList: TodoItem[] =
  localStorage
    .getItem("todoList")
    ?.split("|")
    .map((item) => JSON.parse(item)) || [];

const updateLocalStorage = (newTodoList: TodoItem[]) => {
  if (newTodoList.length > 0) {
    localStorage.setItem(
      "todoList",
      newTodoList.map((item) => JSON.stringify(item)).join("|")
    );
  } else {
    localStorage.removeItem("todoList");
  }
};

export const useFilterStore = create<FilterValueState>((set) => ({
  filterValue:
    !window.location.hash.includes("#/") || window.location.hash === "#/"
      ? FilterValues.ALL
      : window.location.hash.substring(2, window.location.hash.length),
  setFilterValue: (value: string) => {
    set(() => ({ filterValue: value }));
  },
  handleFilter: (event: any) => {
    set((state) => {
      if (state.filterValue === event.target.innerHTML) {
        return state;
      }
      return { filterValue: event.target.innerHTML };
    });
  },
}));

export const useListStore = create<TodoListState>((set, get) => ({
  todoList: initTodoList,
  updateTodoList: (newTodoList: TodoItem[]) => {
    set(() => {
      updateLocalStorage(newTodoList);
      return { todoList: newTodoList };
    });
  },
  handleInput: (event: any, currentItem?: TodoItem) => {
    const key = event.code;
    if (key === "Enter") {
      const inputValue = event.target.value.trim();
      if (!inputValue || inputValue === currentItem?.name) {
        return true;
      }
      let newTodoList;
      if (currentItem) {
        newTodoList = get().todoList.map((item) =>
          currentItem === item ? { ...item, name: inputValue } : item
        );
      } else {
        newTodoList = [
          ...get().todoList,
          {
            name: inputValue,
            state: FilterValues.ACTIVE,
          },
        ];
      }
      get().updateTodoList(newTodoList);
      event.target.value = "";
      return true;
    }
    return false;
  },
  toggleItem: (item: TodoItem) => {
    const itemIndex = get().todoList.indexOf(item);
    get().todoList[itemIndex].state =
      item.state === FilterValues.ACTIVE
        ? FilterValues.COMPLETED
        : FilterValues.ACTIVE;
    const newTodoList = [...get().todoList];
    get().updateTodoList(newTodoList);
  },
  toggleAllItems: () => {
    let newTodoList;
    if (
      get().todoList.filter((item) => item.state === FilterValues.ACTIVE)
        .length > 0
    ) {
      newTodoList = get().todoList.map(
        (newItem) => (newItem = { ...newItem, state: FilterValues.COMPLETED })
      );
    } else {
      newTodoList = get().todoList.map(
        (newItem) => (newItem = { ...newItem, state: FilterValues.ACTIVE })
      );
    }
    get().updateTodoList(newTodoList);
  },
  removeItem: (item: TodoItem) => {
    const newTodoList = get().todoList.filter(
      (newItemList) => newItemList !== item
    );
    get().updateTodoList(newTodoList);
  },
  clearCompleted: () => {
    const newTodoList = get().todoList.filter(
      (item) => item.state !== FilterValues.COMPLETED
    );
    if (newTodoList.length !== get().todoList.length) {
      get().updateTodoList(newTodoList);
    }
  },
}));
