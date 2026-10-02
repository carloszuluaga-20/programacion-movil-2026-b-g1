import { IonButton } from '@ionic/react';

interface SaludoProps {
  nombre: string;
}

const Saludo: React.FC<SaludoProps> = ({ nombre }) => {
  const mostrarMensaje = () => {
    alert(`Hola, ${nombre}`);
  };

  return (
    <div>
      <h2>Hola, {nombre}</h2>

      <IonButton onClick={mostrarMensaje}>
        Saludar
      </IonButton>
    </div>
  );
};

export default Saludo;