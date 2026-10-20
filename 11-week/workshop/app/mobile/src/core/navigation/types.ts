
export type RootStackParamList = {
  Login: undefined;
  StudentList: undefined;
  StudentDetail: {
    studentId: string;
  };
  AttendanceHistory: {
    studentId: string;
  };
};
