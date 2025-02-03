import {
  ArrowBigUpDash,
  ArrowBigDownDash,
  Trash2Icon,
  Circle,
  CheckCircle,
} from "lucide-react";
import PropTypes from "prop-types";

export function TaskItems({ tasks, setTasks }) {
  function deleteTask(index) {
    const updatedTask = tasks.filter((_, i) => i !== index);
    setTasks(updatedTask);
  }

  function handleIsChecked(id) {
    setTasks((t) => {
      const updatedTasks = t.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      );
      return [
        ...updatedTasks.filter((task) => !task.checked),
        ...updatedTasks.filter((task) => task.checked),
      ];
    });
  }

  function moveTask(index, direction) {
    if (
      (index > 0 && direction === "up") ||
      (index < tasks.length - 1 && direction === "down")
    ) {
      const newIndex = direction === "up" ? index - 1 : index + 1;
      const newTasks = [...tasks];
      [newTasks[index], newTasks[newIndex]] = [
        newTasks[newIndex],
        newTasks[index],
      ];
      setTasks(newTasks);
    }
  }
  return (
    <>
      <ul className="mt-[30px] w-[500px] text-center">
        {tasks.map((task, index) => (
          <li key={task.id} className="custom-li">
            <div className="flex flex-1 gap-2 text-start">
              <button
                aria-label={task.checked ? "Uncheck task" : "Check task"}
                onClick={() => handleIsChecked(task.id)}
              >
                {task.checked ? (
                  <CheckCircle className="w-5" />
                ) : (
                  <Circle className="w-5" />
                )}
              </button>
              <p
                className={
                  task.checked
                    ? "custom-task-text line-through opacity-70"
                    : "custom-task-text"
                }
              >
                {task.name}
              </p>
            </div>
            <div
              className={
                task.checked
                  ? "custom-right-circle opacity-70"
                  : "custom-right-circle"
              }
            >
              <button
                className="bg-green-400 custom-y active:-translate-y-1"
                onClick={() => moveTask(index, "up")}
              >
                <ArrowBigUpDash className="w-5" />
              </button>
              <button
                className="bg-yellow-400 custom-y active:translate-y-1"
                onClick={() => moveTask(index, "down")}
              >
                <ArrowBigDownDash className="w-5" />
              </button>
              <button
                className="text-white bg-red-700 custom-wrt-dlt"
                onClick={() => deleteTask(index)}
              >
                <Trash2Icon className="w-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

TaskItems.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
};
