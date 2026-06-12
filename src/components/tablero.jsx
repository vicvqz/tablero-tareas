import { useState } from "react";

export default function Tablero() {
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
      <h1>Tablero de tareas</h1>

      <input
        placeholder="Nueva tarea"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button onClick={addTask}>
        Agregar
      </button>

      <div>
        <h2>Por hacer</h2>
        {tasks
          .filter(task => task.status === "todo")
          .map(task => (
            <p key={task.id}>{task.title}</p>
          ))}
      </div>

      <div>
        <h2>Haciendo</h2>
      </div>

      <div>
        <h2>Hecho</h2>
      </div>
    </>
  );
}