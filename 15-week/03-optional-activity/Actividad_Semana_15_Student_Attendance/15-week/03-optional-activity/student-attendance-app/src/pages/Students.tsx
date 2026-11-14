import { getToken, clearToken } from '../services/auth';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
  IonInput,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { filterStudents } from '../utils/studentFilters';

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
  const [search, setSearch] = useState('');
  // Filtering is recalculated only when the students or search term change.
  const visibleStudents = useMemo(() => filterStudents(students, search), [students, search]);

  const loadStudents = useCallback(async () => {
    const token = getToken();

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
        clearToken();
        window.alert('Your session has expired. Please sign in again.');
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
        <IonButton expand="block" routerLink="/attendance">Continue to Attendance</IonButton>
        <h1>Student Management</h1>
        <p>Students loaded from the protected API.</p>

        <IonInput
          label="Search students"
          labelPlacement="stacked"
          placeholder="Name, email or program"
          value={search}
          onIonInput={(event) => setSearch(String(event.detail.value ?? ''))}
          aria-label="Search students"
          clearInput
        />
        {!loading && !error && <p role="status">Showing {visibleStudents.length} of {students.length} students</p>}

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

        {!loading && !error && students.length > 0 && visibleStudents.length === 0 && (
          <p>No students match your search.</p>
        )}

        {!loading && !error && visibleStudents.length > 0 && (
          <IonList>
            {visibleStudents.map((student) => (
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
