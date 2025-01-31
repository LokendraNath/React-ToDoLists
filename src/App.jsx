import ToDoList from "./ToDoList";
import { useState, useEffect } from "react";

function App() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const [tasks, setTasks] = useState(storedTasks);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <ToDoList tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
