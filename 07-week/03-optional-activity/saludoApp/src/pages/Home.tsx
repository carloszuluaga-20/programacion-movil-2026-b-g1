import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Saludo from '../components/Saludo';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Semana 7</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Saludo nombre="Carlos" />
      </IonContent>
    </IonPage>
  );
};

export default Home;