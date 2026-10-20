
export type Session = {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  muscleGroups: string[];
};

export async function getAttendanceHistory(
  studentId: string
): Promise<Session[]> {
  // Pending integration with the attendance API.
  void studentId;
  return [];
}
