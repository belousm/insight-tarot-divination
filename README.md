# Hello
This is an application for mini-app contest

The application consists of two parts (backend and front)

### BACKEND
Express.js & sequlize is used (to work with the database), openai is also used

### FRONT
SvelteKit is built on Svelte, a UI framework that uses a compiler to let you write breathtakingly concise components that do minimal work in the browser, using languages you already know - HTML, CSS and JavaScript. It's a love letter to web development.


## Launch
Use docker-compose.yml to start the project, this file will assemble two containers + nginx

```bash
docker-compose run app node init # (only the first run, to fill the database)
```

```bash
docker-compose up -d  # (for full launch)
```

## Attention! Don't forget to set your environment variables
```

/.env - common variables of the backend and frontend are configured here (see example .env_defaults)
/backend/app/.env - only backend variables are configured here (if, for example, your frontend is running on another domain)
```


# For developer
Use ./backend/Psy.postman_collection.json for test and visualize API interface 

# Kubernetes 
Use Kompose for deploy to kuber
https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/