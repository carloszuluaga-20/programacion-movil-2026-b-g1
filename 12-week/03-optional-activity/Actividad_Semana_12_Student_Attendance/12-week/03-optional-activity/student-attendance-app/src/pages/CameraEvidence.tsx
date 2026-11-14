
import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  cameraOutline,
  imageOutline,
  trashOutline,
} from 'ionicons/icons';

const CameraEvidence: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [permissionStatus, setPermissionStatus] = useState('Not requested');

  const takePhoto = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Native permission handling.
      // Browser permissions are managed by the browser.
      if (Capacitor.isNativePlatform()) {
        const permissions = await Camera.checkPermissions();
        setPermissionStatus(permissions.camera);

        if (
          permissions.camera !== 'granted' &&
          permissions.camera !== 'limited'
        ) {
          const requested = await Camera.requestPermissions({
            permissions: ['camera'],
          });

          setPermissionStatus(requested.camera);
          if (
            requested.camera !== 'granted' &&
            requested.camera !== 'limited'
          ) {
            setError(
              'Camera permission was denied. Enable it in device settings.'
            );
            return;
          }
        }
      }

      const result = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: false,
      });

      if (!result.webPath) {
        throw new Error('The camera did not return an image.');
      }

      setPhoto(result.webPath);
      if (!Capacitor.isNativePlatform()) setPermissionStatus('Managed by browser');
      setMessage('Photo captured successfully.');
    } catch (err) {
      const details =
        err instanceof Error ? err.message : '';

      if (
        /cancel|canceled|cancelled/i.test(details)
      ) {
        setMessage('Photo capture was cancelled.');
      } else {
        if (/denied|permission|not authorized/i.test(details)) setPermissionStatus('denied');
        setError(
          'Unable to capture a photo. Check camera permissions and try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setError('');
    setMessage('Photo removed from the preview.');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>

          <IonTitle>Camera Evidence</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Attendance Evidence</h1>

        <p>
          Capture a photo as optional evidence
          for an attendance session.
        </p>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={cameraOutline} /> Camera
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p role="status"><strong>Permission status:</strong> {permissionStatus}</p>
            <p>
              Camera access is requested only when
              you choose to take a photo.
            </p>

            <IonButton
              expand="block"
              onClick={() => void takePhoto()}
              disabled={loading}
            >
              <IonIcon
                icon={cameraOutline}
                slot="start"
              />
              Take Photo
            </IonButton>

            {loading && (
              <div role="status" className="ion-text-center">
                <IonSpinner name="crescent" />
                <p>Opening camera...</p>
              </div>
            )}

            {error && (
              <IonText color="danger">
                <p role="alert">{error}</p>
              </IonText>
            )}

            {message && (
              <IonText color="success">
                <p role="status">{message}</p>
              </IonText>
            )}
          </IonCardContent>
        </IonCard>

        {photo ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Photo Preview</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <img
                src={photo}
                alt="Attendance evidence preview"
                style={{
                  width: '100%',
                  maxHeight: '350px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />

              <IonButton
                color="danger"
                fill="outline"
                expand="block"
                onClick={removePhoto}
              >
                <IonIcon
                  icon={trashOutline}
                  slot="start"
                />
                Remove Photo
              </IonButton>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardContent className="ion-text-center">
              <IonIcon
                icon={imageOutline}
                size="large"
                color="medium"
              />
              <p>No photo captured yet.</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CameraEvidence;
