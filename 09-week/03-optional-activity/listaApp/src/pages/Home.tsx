import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { useState } from 'react';

const Home: React.FC = () => {
  const [contador, setContador] = useState(0);

  const materias = [
    'Programación Móvil',
    'Sistemas Operativos',
    'Sistemas Embebidos',
    'Inteligencia de Negocios',
    'Investigación de Operaciones'
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Semana 9</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <h2>Lista de materias</h2>

        <IonList>
          {materias.map((materia, index) => (
            <IonItem key={index}>
              <IonLabel>{materia}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <h2>Contador: {contador}</h2>

        <IonButton onClick={() => setContador(contador + 1)}>
          Aumentar contador
        </IonButton>

        <IonButton routerLink="/detalle">
          Ir a segunda página
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;