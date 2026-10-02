# Semana 7 - Kotlin básico y componente Ionic React

## Objetivo

Realizar una práctica básica con Kotlin y crear un componente funcional en Ionic React.

## 1. Clase Producto en Kotlin

Se creó una clase llamada `Producto` con los atributos `nombre` y `precio`.

El atributo `nombre` permite valores nulos utilizando `String?`.

El atributo `precio` utiliza `Double` y se valida para evitar valores negativos.

Archivo utilizado:

`kotlin/Producto.kt`

Código:

```kotlin
class Producto(
    val nombre: String?,
    val precio: Double
) {
    init {
        require(precio >= 0) { "El precio no puede ser negativo" }
    }

    fun mostrarInformacion() {
        val nombreSeguro = nombre ?: "Producto sin nombre"

        println("Producto: $nombreSeguro")
        println("Precio: $precio")
    }
}

fun main() {
    val producto1 = Producto("Cuaderno", 12000.0)
    val producto2 = Producto(null, 5000.0)

    producto1.mostrarInformacion()

    println()

    producto2.mostrarInformacion()
}
```

En este ejemplo se utiliza `val` para declarar valores que no cambian después de ser asignados.

También se utiliza `String?` para permitir valores nulos y el operador `?:` para mostrar un valor alternativo cuando el nombre es nulo.

La validación:

```kotlin
require(precio >= 0)
```

permite evitar que se creen productos con precios negativos.

## 2. Componente Saludo en Ionic React

Se creó un proyecto Ionic React y dentro de él se creó un componente llamado `Saludo`.

Archivo:

`saludoApp/src/components/Saludo.tsx`

Código:

```tsx
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
```

El componente recibe un nombre y lo muestra en pantalla.

También incluye un botón llamado `Saludar`.

Cuando el usuario presiona el botón se muestra una alerta con el mensaje:

```text
Hola, Carlos
```

El componente se utiliza desde el archivo:

`saludoApp/src/pages/Home.tsx`

Código:

```tsx
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
```

El resultado mostrado en la aplicación es:

```text
Semana 7

Hola, Carlos

[ Saludar ]
```

Al presionar el botón aparece una alerta con el mensaje:

```text
Hola, Carlos
```

## 3. Diferencias entre Kotlin y TypeScript

### Diferencia 1 - Manejo de valores nulos

Kotlin incluye soporte para null-safety.

Para indicar que una variable puede contener un valor nulo se utiliza `?`.

Ejemplo:

```kotlin
val nombre: String?
```

También se puede utilizar el operador `?:` para definir un valor alternativo cuando una variable es nula.

Ejemplo:

```kotlin
val nombreSeguro = nombre ?: "Producto sin nombre"
```

En TypeScript también se pueden manejar valores nulos, pero se utiliza una unión de tipos.

Ejemplo:

```typescript
let nombre: string | null;
```

### Diferencia 2 - Declaración de variables

En Kotlin se utiliza `val` para valores que no pueden ser reasignados y `var` para valores que pueden cambiar.

Ejemplo:

```kotlin
val nombre = "Carlos"
var edad = 20
```

En TypeScript se utiliza `const` para valores que no se reasignan y `let` para valores que pueden cambiar.

Ejemplo:

```typescript
const nombre = "Carlos";
let edad = 20;
```
## Resultado

Se creó correctamente una clase `Producto` en Kotlin utilizando validación, `val` y manejo de valores nulos.

También se creó un componente funcional en Ionic React llamado `Saludo`, el cual muestra un nombre y un botón que genera un mensaje al ser presionado.

Además, se identificaron dos diferencias básicas entre Kotlin y TypeScript relacionadas con el manejo de valores nulos y la declaración de variables.

---

## Evidencia

A continuación se muestra el componente funcionando correctamente:

<img width="1913" height="960" alt="image" src="https://github.com/user-attachments/assets/ad64c843-7cf3-4e24-8251-4eadab67ab17" />
