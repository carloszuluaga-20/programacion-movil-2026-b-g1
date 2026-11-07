
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  calendarOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';

import {
  ApiError,
  getAttendance,
  getStudents,
  type AttendanceRecord,
  type Student,
} from '../services/api';

const Attendance: React.FC = () => {
  const navigate = useNavigate();

  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAttendance = useCallback(async () => {
    const token = sessionStorage.getItem(
      'student_attendance_token'
    );

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [attendanceData, studentData] = await Promise.all([
        getAttendance(token),
        getStudents(token),
      ]);

      setRecords(attendanceData);
      setStudents(studentData);
    } catch (err) {
      setRecords([]);
      setStudents([]);

      if (err instanceof ApiError && err.status === 401) {
        sessionStorage.removeItem('student_attendance_token');
        sessionStorage.removeItem('student_attendance_user');
        navigate('/login', { replace: true });
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load attendance records.'
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void loadAttendance();
  }, [loadAttendance]);

  const getStudentName = (studentId: number) => {
    const student = students.find(
      (item) => item.id === studentId
    );

    return student?.name ?? `Student #${studentId}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>

          <IonTitle>Attendance</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Attendance History</h1>

        <p>
          Review student attendance records from the protected API.
        </p>

        {loading && (
          <div role="status">
            <IonSpinner name="crescent" />
            <p>Loading attendance records...</p>
          </div>
        )}

        {!loading && error && (
          <div>
            <IonText color="danger">
              <p role="alert">{error}</p>
            </IonText>

            <IonButton onClick={() => void loadAttendance()}>
              Retry
            </IonButton>
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <p>No attendance records found.</p>
        )}

        {!loading && !error && records.length > 0 && (
          <IonList>
            {records.map((record) => {
              const isPresent =
                record.status.toLowerCase() === 'present';

              return (
                <IonItem key={record.id}>
                  <IonIcon
                    icon={
                      isPresent
                        ? checkmarkCircleOutline
                        : closeCircleOutline
                    }
                    color={isPresent ? 'success' : 'danger'}
                    slot="start"
                  />

                  <IonLabel>
                    <h2>{getStudentName(record.studentId)}</h2>
                    <p>
                      <IonIcon icon={calendarOutline} />{' '}
                      {record.date}
                    </p>
                  </IonLabel>

                  <IonChip
                    slot="end"
                    color={isPresent ? 'success' : 'danger'}
                  >
                    {record.status}
                  </IonChip>
                </IonItem>
              );
            })}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Attendance;
