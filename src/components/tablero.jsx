import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Tablero() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
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
        id: Date.now().toString(),
        title: newTask,
        status: "todo"
      }
    ]);

    setNewTask("");
  };

const onDragEnd = (result) => {
  if (!result.destination) return;

  const taskId = result.draggableId;

  const newStatus = result.destination.droppableId;

  setTasks((currentTasks) =>
    currentTasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: newStatus
          }
        : task
    )
  );
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
      .filter(task => task.status === "todo")
      .map(task => (
        <p key={task.id}>{task.title}</p>
      ))}
  </div>

<div className="column">
    <h2>Haciendo</h2>

    {tasks
      .filter(task => task.status === "doing")
      .map(task => (
        <p key={task.id}>{task.title}</p>
      ))}
  </div>

  <div className="column">
    <h2>Hecho</h2>

    {tasks
      .filter(task => task.status === "done")
      .map(task => (
        <p key={task.id}>{task.title}</p>
      ))}
  </div>
</div>
    </>
  );
}