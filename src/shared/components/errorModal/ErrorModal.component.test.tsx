import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react-native";
import React from "react";

import ErrorModal from "./ErrorModal.component";

describe("ErrorModal", () => {
  function useState<T>(value: T): [T, jest.Mock<any, any, any>] {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: T) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementationOnce(useStateMock);

    setStateMock(value);

    return [value, setStateMock];
  }

  it("should show modal with error", () => {
    const errorMessage = faker.lorem.text();
    const [modalError, setModalError] = useState(errorMessage);
    const [modalOpen, setModalOpen] = useState(true);

    render(
      <ErrorModal
        modalError={modalError}
        setModalError={setModalError}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />,
    );

    expect(screen.getByTestId("modal").props["visible"]).toBeTruthy();
    expect(screen.getByTestId("modalText").props["children"]).toBe(
      errorMessage,
    );
  });

  it("should modal not render", () => {
    const [modalError, setModalError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    render(
      <ErrorModal
        modalError={modalError}
        setModalError={setModalError}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />,
    );

    expect(screen.queryByTestId("modal")).toBeFalsy();
  });
});
