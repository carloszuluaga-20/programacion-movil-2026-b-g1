
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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Student Attendance</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
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
              View student information from the
              protected API.
            </p>

            <IonButton expand="block" routerLink="/students">
              View Students
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
