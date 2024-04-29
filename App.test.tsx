import { render, screen } from "@testing-library/react-native";
import React from "react";

import App from "./App";

describe("<App />", () => {
  it("show authentication page for default", () => {
    render(<App />);

    const text = screen.getByText("OLA, PRONTO PARA ESTUDAR HOJE?");
    expect(text).toBeTruthy();
  });
});
