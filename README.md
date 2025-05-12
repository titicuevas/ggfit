# GGFit - Gamers Get Fit

GGFit es una aplicación web que combina el gaming con el ejercicio físico, específicamente diseñada para jugadores de League of Legends. La aplicación motiva a los jugadores a mantenerse en forma mientras juegan, convirtiendo las derrotas en oportunidades para mejorar su salud física.

## Características

- Integración con la API de Riot Games
- Sistema de ejercicios personalizados basado en el rendimiento en el juego
- Sistema de niveles y puntuación
- Clasificación de usuarios
- Perfiles personalizados
- Seguimiento de progreso

## Tecnologías Utilizadas

- React + TypeScript
- Supabase (Backend y Base de datos)
- Chakra UI + Bootstrap
- React Router
- API de Riot Games

## Instalación

1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/ggfit.git
```

2. Instala las dependencias
```bash
cd ggfit
npm install
```

3. Configura las variables de entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_key_de_supabase
VITE_RIOT_API_KEY=tu_key_de_riot
```

4. Inicia el servidor de desarrollo
```bash
npm run dev
```

## Contribución

Las contribuciones son bienvenidas. Por favor, lee las guías de contribución antes de enviar un pull request.

## Licencia

MIT
