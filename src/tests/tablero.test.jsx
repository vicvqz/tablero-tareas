import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tablero from "../components/tablero";

test("verifica que se visualizan las columnas", () => {
  render(<Tablero />);

  expect(screen.getByText("Por hacer")).toBeInTheDocument();
  expect(screen.getByText("Haciendo")).toBeInTheDocument();
  expect(screen.getByText("Hecho")).toBeInTheDocument();
});

test("verifica que se muestra la tarea por defecto", () => {
  render(<Tablero />);

  expect(
    screen.getByText(
      "Investigar la estructura organizacional de la empresa"
    )
  ).toBeInTheDocument();
});

test("verifica agregar tarea", async () => {
  render(<Tablero />);

  const input =
    screen.getByPlaceholderText("Nueva tarea");

  await userEvent.type(
    input,
    "Preparar presentación"
  );

  await userEvent.click(
    screen.getByRole("button", {
      name: /agregar/i,
    })
  );

  expect(
    screen.getByText("Preparar presentación")
  ).toBeInTheDocument();
});

test("verifica que no se añada una tarea vacía", async () => {
  render(<Tablero />);

  await userEvent.click(
    screen.getByRole("button", {
      name: /agregar/i,
    })
  );

  expect(
    screen.getAllByText(
      "Investigar la estructura organizacional de la empresa"
    )
  ).toHaveLength(1);
});

test("verifica que se vacía el campo luego de agregar una tarea", async () => {
  render(<Tablero />);

  const input = screen.getByPlaceholderText(
    "Nueva tarea"
  );

  await userEvent.type(
    input,
    "Preparar informe"
  );

  await userEvent.click(
    screen.getByRole("button", {
      name: /agregar/i,
    })
  );

  expect(input).toHaveValue("");
});
