import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
}

const Detalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        setCargando(true);
        setError('');

        const respuesta = await fetch('http://localhost:3000/tareas');

        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar las tareas');
        }

        const datos: Tarea[] = await respuesta.json();

        const encontrada = datos.find(
          (item) => item.id === Number(id)
        );

        if (!encontrada) {
          throw new Error('Tarea no encontrada');
        }

        setTarea(encontrada);
      } catch (err) {
        setError('No se pudo cargar el detalle de la tarea');
      } finally {
        setCargando(false);
      }
    };

    cargarDetalle();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {cargando && <IonSpinner />}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {tarea && (
          <>
            <h2>{tarea.titulo}</h2>

            <p>{tarea.descripcion}</p>

            <p>
              <strong>ID:</strong> {tarea.id}
            </p>
          </>
        )}

        <IonButton routerLink="/home">
          Volver
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Detalle; 