
import { Navigate, Route } from 'react-router-dom';

import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home';
import Login from './pages/Login';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import CameraEvidence from './pages/CameraEvidence';
import { isAuthenticated } from './services/auth';

// Ionic core styles
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// Ionic utility styles
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// Dark mode
import '@ionic/react/css/palettes/dark.system.css';

// Application theme
import './theme/variables.css';

setupIonicReact();

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/login"
            element={
              isAuthenticated()
                ? <Navigate to="/home" replace />
                : <Login />
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/camera"
            element={
              <ProtectedRoute>
                <CameraEvidence />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <Navigate
                to={
                  isAuthenticated()
                    ? '/home'
                    : '/login'
                }
                replace
              />
            }
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
