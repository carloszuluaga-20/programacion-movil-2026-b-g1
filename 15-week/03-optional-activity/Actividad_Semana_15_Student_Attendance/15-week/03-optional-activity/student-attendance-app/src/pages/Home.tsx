import { useNavigate } from 'react-router-dom';
import { clearToken } from '../services/auth';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  peopleOutline,
  calendarOutline,
  cameraOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Student Attendance</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton fill="outline" onClick={() => { clearToken(); navigate('/login', { replace: true }); }}>Sign Out</IonButton>
        <IonText>
          <h1>Welcome!</h1>
          <p>
            Manage students and attendance records
            from one place.
          </p>
        </IonText>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={peopleOutline} /> Students
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              Start the MVP flow: load students from the protected API, review attendance and capture optional evidence.
            </p>

            <IonButton expand="block" routerLink="/students">
              Start Attendance Flow
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={calendarOutline} /> Attendance
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              Review attendance history and
              student participation.
            </p>

            <IonButton expand="block" routerLink="/attendance">
              View Attendance
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={cameraOutline} /> Camera Evidence
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              Capture optional photographic evidence
              for an attendance session.
            </p>

            <IonButton expand="block" routerLink="/camera">
              Open Camera
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={shieldCheckmarkOutline} /> Security
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              Student and attendance information is
              retrieved using JWT authentication.
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
