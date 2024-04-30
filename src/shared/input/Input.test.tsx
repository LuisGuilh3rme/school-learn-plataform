import { render, screen } from "@testing-library/react-native";
import React from "react";

import Input from "./Input";

describe("Input Component", () => {
  it("should have normal content", () => {
    render(<Input testID="input" />);

    const input = screen.getByTestId("input");
    const props = input.props;

    expect(input).toBeTruthy();
    expect(props.errorText).toBeFalsy();
    expect(props.error).toBeFalsy();
  });
});
