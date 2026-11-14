
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { ApiError, login } from '../services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await login(email.trim(), password);

      sessionStorage.setItem(
        'student_attendance_token',
        response.token
      );

      sessionStorage.setItem(
        'student_attendance_user',
        JSON.stringify(response.user)
      );

      navigate('/home', { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Student Attendance</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Teacher Login</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              Sign in to access student and attendance records.
            </p>

            <IonItem>
              <IonInput
                label="Email"
                labelPlacement="stacked"
                type="email"
                value={email}
                placeholder="Enter your email"
                onIonInput={(event) => {
                  setEmail(String(event.detail.value ?? ''));
                }}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Password"
                labelPlacement="stacked"
                type="password"
                value={password}
                placeholder="Enter your password"
                onIonInput={(event) => {
                  setPassword(String(event.detail.value ?? ''));
                }}
              />
            </IonItem>

            {error && (
              <IonText color="danger">
                <p role="alert">{error}</p>
              </IonText>
            )}

            <IonButton
              expand="block"
              className="ion-margin-top"
              disabled={loading}
              onClick={handleLogin}
            >
              Sign In
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" fill="outline" onClick={() => {
          sessionStorage.setItem('student_attendance_token', 'ux-demo-token');
          sessionStorage.setItem('student_attendance_user', JSON.stringify({ email: 'demo@example.com', role: 'teacher' }));
          navigate('/attendance', { replace: true });
        }}>Preview Week 11 UX (no backend)</IonButton>
        <IonLoading
          isOpen={loading}
          message="Signing in..."
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
