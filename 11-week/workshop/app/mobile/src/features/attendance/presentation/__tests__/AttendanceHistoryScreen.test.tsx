
import React from "react";
import {
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import { AttendanceHistoryScreen } from "../AttendanceHistoryScreen";
import { getAttendanceHistory } from "../attendanceHistoryData";

jest.mock("../attendanceHistoryData", () => ({
  getAttendanceHistory: jest.fn(),
}));

const mockedHistory = jest.mocked(getAttendanceHistory);

const props = {
  route: {
    key: "history-test",
    name: "AttendanceHistory",
    params: { studentId: "student-001" },
  },
  navigation: {
    goBack: jest.fn(),
  },
} as unknown as React.ComponentProps<
  typeof AttendanceHistoryScreen
>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AttendanceHistoryScreen - CP3", () => {
  test("shows loading while history is pending", async () => {
    let finish!: (value: []) => void;

    mockedHistory.mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        })
    );

    await render(<AttendanceHistoryScreen {...props} />);

    expect(
      screen.getByText("Cargando historial...")
    ).toBeTruthy();

    await act(async () => {
      finish([]);
    });
  });

  test("shows empty state when there are no sessions", async () => {
    mockedHistory.mockResolvedValue([]);

    await render(<AttendanceHistoryScreen {...props} />);

    expect(
      await screen.findByText(
        "Todavía no hay sesiones registradas"
      )
    ).toBeTruthy();
  });

  test("shows an error and retries successfully", async () => {
    mockedHistory
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce([]);

    await render(<AttendanceHistoryScreen {...props} />);

    expect(
      await screen.findByText(
        "No se pudo cargar el historial."
      )
    ).toBeTruthy();

    fireEvent.press(screen.getByText("Reintentar"));

    await waitFor(() => {
      expect(mockedHistory).toHaveBeenCalledTimes(2);

      expect(
        screen.getByText(
          "Todavía no hay sesiones registradas"
        )
      ).toBeTruthy();
    });
  });
});
