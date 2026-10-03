import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { useEffect, useState } from 'react';
import { useIonRouter } from '@ionic/react';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
}

const Home: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const router = useIonRouter();

  const cargarTareas = async () => {
    try {
      setCargando(true);
      setError('');

      const respuesta = await fetch('http://localhost:3000/tareas');

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar las tareas');
      }

      const datos = await respuesta.json();
      setTareas(datos);
    } catch (err) {
      setError('Error de red al cargar las tareas');
    } finally {
      setCargando(false);
    }
  };

  const crearTarea = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      setError('El título y la descripción son obligatorios');
      return;
    }

    try {
      setError('');

      const respuesta = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo,
          descripcion
        })
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo crear la tarea');
      }

      const nuevaTarea = await respuesta.json();

      setTareas([...tareas, nuevaTarea]);
      setTitulo('');
      setDescripcion('');
    } catch (err) {
      setError('Error de red al crear la tarea');
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestor de Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <h2>Nueva tarea</h2>

        <IonItem>
          <IonLabel position="stacked">Título</IonLabel>
          <IonInput
            value={titulo}
            onIonInput={(e) => setTitulo(e.detail.value ?? '')}
            placeholder="Escribe el título"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonInput
            value={descripcion}
            onIonInput={(e) => setDescripcion(e.detail.value ?? '')}
            placeholder="Escribe la descripción"
          />
        </IonItem>

        <IonButton expand="block" onClick={crearTarea}>
          Crear tarea
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <h2>Lista de tareas</h2>

        {cargando ? (
          <IonSpinner />
        ) : (
          <IonList>
            {tareas.map((tarea) => (
              <IonItem
                key={tarea.id}
                button
                onClick={() => router.push(`/detalle/${tarea.id}`)}
              >
                <IonLabel>
                  <h2>{tarea.titulo}</h2>
                  <p>{tarea.descripcion}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Home;