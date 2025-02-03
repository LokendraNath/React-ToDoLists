import ToDoList from "./ToDoList";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return <ToDoList tasks={tasks} setTasks={setTasks} />;
}

export default App;
