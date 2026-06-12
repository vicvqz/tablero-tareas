import { render, screen } from "@testing-library/react";
import Tablero from "../components/tablero";

test("renders all columns", () => {
  render(<Tablero />);

  expect(screen.getByText("Por hacer")).toBeInTheDocument();
  expect(screen.getByText("Haciendo")).toBeInTheDocument();
  expect(screen.getByText("Hecho")).toBeInTheDocument();
});

test("shows default task", () => {
  render(<Tablero />);

  expect(
    screen.getByText("Diseñar UI")
  ).toBeInTheDocument();
});

import userEvent from "@testing-library/user-event";

test("adds a task", async () => {
  render(<Tablero />);

  const input =
    screen.getByPlaceholderText("Nueva tarea");

  await userEvent.type(
    input,
    "Investigar la estructura organizacional de la empresa"
  );

  await userEvent.click(
    screen.getByText("Agregar")
  );

  expect(
    screen.getByText("Investigar la estructura organizacional de la empresa")
  ).toBeInTheDocument();
});