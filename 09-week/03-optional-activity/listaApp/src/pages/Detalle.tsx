import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

const Detalle: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Segunda Página</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Información adicional</h2>

        <p>
          Esta es la segunda página de la actividad de la Semana 9.
        </p>

        <IonButton routerLink="/home">
          Volver al inicio
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Detalle;