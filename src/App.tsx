import { useListStore } from "./store";
import { useShallow } from "zustand/react/shallow";
import "./App.css";
import Footer from "./components/Footer";
import Main from "./components/Main";

const App = () => {
  const handleInput = useListStore(useShallow((state) => state.handleInput));

  return (
    <section className="todoapp" id="root">
      <header className="header" data-testid="header">
        <h1>todos</h1>
        <div className="input-container">
          <input
            type="text"
            className="new-todo"
            id="todo-input"
            defaultValue=""
            placeholder="What needs to be done?"
            onKeyUp={handleInput}
          />
          <label className="visually-hidden" htmlFor="todo-input">
            New Todo Input
          </label>
        </div>
      </header>
      <Main></Main>
      <Footer></Footer>
    </section>
  );
};

export default App;
