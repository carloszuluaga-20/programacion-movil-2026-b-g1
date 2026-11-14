import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <strong>Bienvenido a Horario Estudiantil</strong>
      <p>Organiza tus materias, horarios y notas desde tu celular.</p>
    </div>
  );
};

export default ExploreContainer;