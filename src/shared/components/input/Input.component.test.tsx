import { render, screen } from "@testing-library/react-native";

import Input from "./Input.component";

describe("Input", () => {
  it("should have normal content", () => {
    render(<Input testID="input" />);

    const input = screen.getByTestId("input");
    const props = input.props;

    expect(input).toBeTruthy();
    expect(props.errorText).toBeFalsy();
    expect(props.error).toBeFalsy();
  });
});
