import { useState } from "react";
import { TaskItems } from "./components/TaskItems";
import PropTypes from "prop-types";

function ToDoList({ tasks, setTasks }) {
  const [inputText, setInputText] = useState("");

  function inputChange(event) {
    setInputText(event.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  function addTask() {
    if (!inputText.trim()) {
      alert("Please Enter a Task");
      return;
    }

    const newTaskObj = {
      id: crypto.randomUUID(),
      name: inputText,
      checked: false,
    };

    setTasks((t) => [newTaskObj, ...t]);
    setInputText("");
  }

  return (
    <div className="custom-task-container">
      <h1 className="text-5xl font-bold text-center mb-11">To Do List</h1>
      <div>
        <input
          type="text"
          className="custom-input  focus:ring-2 focus:ring-green-500"
          onChange={inputChange}
          value={inputText}
          placeholder="Enter a Task ..."
          onKeyDown={handleKeyDown}
        />
        <button
          className="px-3 h-12 font-medium ml-4 bg-green-600 rounded-[8px] text-[18px]"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <TaskItems tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

ToDoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default ToDoList;
