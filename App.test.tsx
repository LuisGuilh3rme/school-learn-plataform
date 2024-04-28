import { render, screen } from "@testing-library/react-native";
import React from "react";

import App from "./App";

describe("<App />", () => {
  it("have the text rendering", () => {
    render(<App />);

    const text = screen.getByText(
      "Open up App.tsx to start working on your app!",
    );
    expect(text).toBeTruthy();
  });
});
