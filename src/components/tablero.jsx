import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Tablero() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Investigar la estructura organizacional de la empresa",
      status: "todo"
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

      <div className="task-form">
  <input
    className="task-input"
    placeholder="Nueva tarea"
    value={newTask}
    onChange={(e) => setNewTask(e.target.value)}
  />

  <button
    className="add-button"
    onClick={addTask}
  >
    Agregar
  </button>
</div>

      <button onClick={addTask}>
        Agregar
      </button>

 <DragDropContext onDragEnd={onDragEnd}>
  <div className="board">

    <Droppable droppableId="todo">
      {(provided) => (
        <div
          className="column todo"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>Por hacer</h2>

          {tasks
            .filter(task => task.status === "todo")
            .map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.title}
                  </div>
                )}
              </Draggable>
            ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>

    <Droppable droppableId="doing">
      {(provided) => (
        <div
          className="column doing"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>Haciendo</h2>

          {tasks
            .filter(task => task.status === "doing")
            .map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.title}
                  </div>
                )}
              </Draggable>
            ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>

    <Droppable droppableId="done">
      {(provided) => (
        <div
          className="column done"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>Hecho</h2>

          {tasks
            .filter(task => task.status === "done")
            .map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.title}
                  </div>
                )}
              </Draggable>
            ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>

  </div>
</DragDropContext>
    </>
  );
}