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
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Tarea = {
  id: number;
  titulo: string;
  descripcion: string;
};

const API_URL = 'http://localhost:3000';

function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const cargarTareas = async () => {
    try {
      setError('');

      const respuesta = await fetch(`${API_URL}/tasks`);

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar las tareas');
      }

      const datos = await respuesta.json();
      setTareas(datos);
    } catch {
      setError('Error de red. Verifica que el backend esté encendido.');
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const crearTarea = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      setError('Debes completar título y descripción.');
      return;
    }

    try {
      setError('');

      const respuesta = await fetch(`${API_URL}/tasks`, {
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

      setTitulo('');
      setDescripcion('');

      await cargarTareas();
    } catch {
      setError('Error de red al crear la tarea.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mini App de Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Nueva tarea</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonInput
                label="Título"
                labelPlacement="stacked"
                value={titulo}
                onIonInput={(e) => setTitulo(e.detail.value ?? '')}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Descripción"
                labelPlacement="stacked"
                value={descripcion}
                onIonInput={(e) => setDescripcion(e.detail.value ?? '')}
              />
            </IonItem>

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={crearTarea}
            >
              Crear tarea
            </IonButton>
          </IonCardContent>
        </IonCard>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <h2>Tareas</h2>

        <IonList>
          {tareas.map((tarea) => (
            <IonItem
              key={tarea.id}
              button
              onClick={() => navigate(`/detalle/${tarea.id}`)}
            >
              <IonLabel>
                <h2>{tarea.titulo}</h2>
                <p>{tarea.descripcion}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
}

function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        setError('');

        const respuesta = await fetch(`${API_URL}/tasks/${id}`);

        if (!respuesta.ok) {
          throw new Error('Tarea no encontrada');
        }

        const datos = await respuesta.json();
        setTarea(datos);
      } catch {
        setError('No fue posible cargar el detalle de la tarea.');
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

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        {tarea && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{tarea.titulo}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>{tarea.descripcion}</p>
              <p>ID: {tarea.id}</p>
            </IonCardContent>
          </IonCard>
        )}

        <IonButton onClick={() => navigate('/')}>
          Volver
        </IonButton>

      </IonContent>
    </IonPage>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detalle/:id" element={<Detalle />} />
    </Routes>
  );
}

export default App;