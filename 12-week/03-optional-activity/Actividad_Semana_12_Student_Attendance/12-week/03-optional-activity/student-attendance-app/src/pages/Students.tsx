
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
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
  ApiError,
  getStudents,
  type Student,
} from '../services/api';

const Students: React.FC = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudents = useCallback(async () => {
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
      const data = await getStudents(token);
      setStudents(data);
    } catch (err) {
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
          : 'Unable to load students.'
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void loadStudents();
  }, [loadStudents]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Students</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Student Management</h1>
        <p>Students loaded from the protected API.</p>

        {loading && (
          <div role="status">
            <IonSpinner name="crescent" />
            <p>Loading students...</p>
          </div>
        )}

        {!loading && error && (
          <div>
            <IonText color="danger">
              <p role="alert">{error}</p>
            </IonText>

            <IonButton onClick={() => void loadStudents()}>
              Retry
            </IonButton>
          </div>
        )}

        {!loading && !error && students.length === 0 && (
          <p>No students found.</p>
        )}

        {!loading && !error && students.length > 0 && (
          <IonList>
            {students.map((student) => (
              <IonItem key={student.id}>
                <IonLabel>
                  <h2>{student.name}</h2>
                  <p>{student.email}</p>
                  <p>{student.program}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Students;
