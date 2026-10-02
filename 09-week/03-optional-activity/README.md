# Semana 9 - Lista, estado y navegación en Ionic React

## Objetivo

Crear una pantalla en Ionic React que utilice una lista de elementos, manejo de estado con `useState` y navegación entre dos páginas.

## 1. Lista con IonList

Se creó una pantalla principal con una lista de cinco materias utilizando componentes de Ionic React.

Las materias mostradas son:

- Programación Móvil
- Sistemas Operativos
- Sistemas Embebidos
- Inteligencia de Negocios
- Investigación de Operaciones

Para mostrar la lista se utilizaron los componentes:

- `IonList`
- `IonItem`
- `IonLabel`

Código principal:

```tsx
const materias = [
  'Programación Móvil',
  'Sistemas Operativos',
  'Sistemas Embebidos',
  'Inteligencia de Negocios',
  'Investigación de Operaciones'
];

<IonList>
  {materias.map((materia, index) => (
    <IonItem key={index}>
      <IonLabel>{materia}</IonLabel>
    </IonItem>
  ))}
</IonList>
```

## 2. Manejo de estado con useState

Se agregó un contador utilizando el hook `useState`.

Código:

```tsx
const [contador, setContador] = useState(0);
```

El valor del contador se muestra en la pantalla:

```tsx
<h2>Contador: {contador}</h2>
```

También se agregó un botón que incrementa el contador cada vez que el usuario lo presiona:

```tsx
<IonButton onClick={() => setContador(contador + 1)}>
  Aumentar contador
</IonButton>
```

De esta forma se demuestra el manejo de estado dentro de un componente React.

## 3. Navegación entre páginas

Se creó una segunda página llamada:

`src/pages/Detalle.tsx`

La navegación se configuró utilizando React Router dentro de:

`src/App.tsx`

Se agregó la ruta:

```tsx
<Route
  path="/detalle"
  element={<Detalle />}
/>
```

Desde la página principal se puede navegar a la segunda página mediante:

```tsx
<IonButton routerLink="/detalle">
  Ir a segunda página
</IonButton>
```

En la segunda página se muestra:

```text
Segunda Página

Información adicional

Esta es la segunda página de la actividad de la Semana 9.

[ Volver al inicio ]
```

Para regresar a la pantalla principal se utiliza:

```tsx
<IonButton routerLink="/home">
  Volver al inicio
</IonButton>
```

## 4. Archivos principales

Los archivos principales utilizados fueron:

- `src/pages/Home.tsx`
- `src/pages/Detalle.tsx`
- `src/App.tsx`

## 5. Resultado

La aplicación cumple con los siguientes requisitos:

- Lista de al menos cinco elementos usando componentes Ionic React.
- Manejo de estado utilizando `useState`.
- Contador funcional.
- Segunda página.
- Navegación entre la pantalla principal y la segunda página.
- Uso de React Router para las rutas.

## Evidencias

### Pantalla principal

La pantalla principal muestra la lista de cinco materias, el contador y el botón para navegar a la segunda página.

![Pantalla principal](evidencia-inicio.png)

### Segunda página

La segunda página muestra información adicional y permite regresar a la pantalla principal.

![Segunda página](evidencia-detalle.png)
