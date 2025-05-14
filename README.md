# GGFit

Aplicación fitness gamificada integrada con League of Legends y Supabase.

## Recursos y dependencias principales

- **Supabase**: Backend como servicio para autenticación, base de datos y almacenamiento en la nube. [https://supabase.com/](https://supabase.com/)
- **Chakra UI**: Librería de componentes de UI para React. [https://chakra-ui.com/](https://chakra-ui.com/)
- **react-slick**: Carrusel responsivo para React. [https://react-slick.neostack.com/](https://react-slick.neostack.com/)
- **slick-carousel**: Estilos CSS para react-slick. [https://kenwheeler.github.io/slick/](https://kenwheeler.github.io/slick/)
- **@types/react-slick**: Tipos de TypeScript para react-slick.

## Instalación de dependencias

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm install @supabase/supabase-js
npm install react-slick slick-carousel
npm install --save-dev @types/react-slick
```

## Estructura principal
- **/src/pages/Home.tsx**: Pantalla de inicio, incluye carrusel de ejercicios destacados.
- **/src/pages/Exercises.tsx**: Ejercicios diarios, lógica de completado y puntos.
- **/src/pages/Leaderboard.tsx**: Clasificación global de usuarios.
- **/src/supabaseClient.ts**: Configuración de Supabase.

## Notas
- Asegúrate de tener el archivo `riot.txt` en la carpeta `public` si usas la API de Riot.
- Los GIFs de ejercicios deben estar en `public/ejercicios`.

---

Actualiza este README cada vez que añadas nuevas librerías o recursos importantes.
