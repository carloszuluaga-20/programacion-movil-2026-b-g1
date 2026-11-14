
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  IonBackButton,
  IonCard,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
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

import './Attendance.css';

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
  const [demoState, setDemoState] = useState<'live' | 'data' | 'empty' | 'error'>(() => sessionStorage.getItem('student_attendance_token') === 'ux-demo-token' ? 'data' : 'live');
  const demoRecords: AttendanceRecord[] = [
    { id: 1, studentId: 1, date: '2026-11-10', status: 'present' },
    { id: 2, studentId: 2, date: '2026-11-10', status: 'absent' },
  ];
  const demoStudents: Student[] = [
    { id: 1, name: 'Ana Torres', email: 'ana@example.com', program: 'Systems Engineering' },
    { id: 2, name: 'Luis Perez', email: 'luis@example.com', program: 'Systems Engineering' },
  ];
  const visibleRecords = demoState === 'data' ? demoRecords : demoState === 'live' ? records : [];
  const visibleStudents = demoState === 'data' ? demoStudents : students;
  const visibleError = demoState === 'error' ? 'Demo: unable to load attendance records.' : demoState === 'live' ? error : '';
  const visibleLoading = demoState === 'live' && loading;

  const loadAttendance = useCallback(async () => {
    const token = sessionStorage.getItem(
      'student_attendance_token'
    );

    if (token === 'ux-demo-token') { setLoading(false); return; }

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
    const student = visibleStudents.find(
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

      <IonContent className="ion-padding attendance-ux">
        <h1>Attendance History</h1>

        <p>
          Review student attendance records from the protected API.
        </p>

        <IonButton expand="block" size="large" aria-label="Refresh attendance records" onClick={() => { setDemoState('live'); void loadAttendance(); }}>
          Refresh attendance
        </IonButton>
        <IonCard>
          <IonCardContent>
            <p><strong>UX demonstration</strong> — Preview all states without changing the API.</p>
            <IonSegment scrollable value={demoState} onIonChange={(e) => setDemoState(e.detail.value as typeof demoState)} aria-label="Attendance display state">
              <IonSegmentButton value="live">API</IonSegmentButton>
              <IonSegmentButton value="data">Data</IonSegmentButton>
              <IonSegmentButton value="empty">Empty</IonSegmentButton>
              <IonSegmentButton value="error">Error</IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>
        {visibleLoading && (
          <div role="status" className="attendance-state">
            <IonSpinner name="crescent" />
            <p>Loading attendance records...</p>
          </div>
        )}

        {!visibleLoading && visibleError && (
          <div>
            <IonText color="danger">
              <p role="alert">{visibleError}</p>
            </IonText>

            <IonButton onClick={() => { setDemoState('live'); void loadAttendance(); }}>
              Retry
            </IonButton>
          </div>
        )}

        {!visibleLoading && !visibleError && visibleRecords.length === 0 && (
          <div role="status" className="attendance-state"><h2>No attendance records</h2><p>There are no records to display. Try refreshing or select the Data preview.</p></div>
        )}

        {!visibleLoading && !visibleError && visibleRecords.length > 0 && (
          <IonList>
            {visibleRecords.map((record) => {
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
