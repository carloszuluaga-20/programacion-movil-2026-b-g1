
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../../features/auth/presentation/LoginScreen";
import { useAuth } from "../../features/auth/presentation/AuthContext";
import { StudentListScreen } from "../../features/students/presentation/StudentListScreen";
import { StudentDetailScreen } from "../../features/students/presentation/StudentDetailScreen";
import { AttendanceHistoryScreen } from "../../features/attendance/presentation/AttendanceHistoryScreen";

import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="StudentList"
              component={StudentListScreen}
            />
            <Stack.Screen
              name="StudentDetail"
              component={StudentDetailScreen}
            />
            <Stack.Screen
              name="AttendanceHistory"
              component={AttendanceHistoryScreen}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
