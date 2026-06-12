import { useState } from "react";

export default function Tablero() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Investigar la estructura organizacional de la empresa",
      status: "Por hacer"
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
        status: "Por hacer"
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

 <div className="board">
  <div className="column">
    <h2>Por hacer</h2>

    {tasks
      .filter(task => task.status === "Por hacer")
      .map(task => (
        <p key={task.id}>{task.title}</p>
      ))}
  </div>

<div className="column">
    <h2>Haciendo</h2>

    {tasks
      .filter(task => task.status === "Haciendo")
      .map(task => (
        <p key={task.id}>{task.title}</p>
      ))}
  </div>

  <div className="column">
    <h2>Hecho</h2>

    {tasks
      .filter(task => task.status === "Hecho")
      .map(task => (
        <p key={task.id}>{task.title}</p>
      ))}
  </div>
</div>
    </>
  );
}