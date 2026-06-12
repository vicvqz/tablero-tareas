import { useState } from "react";

export default function Board() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Diseñar UI",
      status: "todo"
    }
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        status: "todo"
      }
    ]);

    setNewTask("");
  };

  return (
    <>
      <h1>Kanban Board</h1>

      <input
        placeholder="Nueva tarea"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button onClick={addTask}>
        Agregar
      </button>

      <div>
        <h2>To Do</h2>
        {tasks
          .filter(task => task.status === "todo")
          .map(task => (
            <p key={task.id}>{task.title}</p>
          ))}
      </div>

      <div>
        <h2>Doing</h2>
      </div>

      <div>
        <h2>Done</h2>
      </div>
    </>
  );
}