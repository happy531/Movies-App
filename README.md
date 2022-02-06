## Frontend
- React
- TypeScript
- Redux-toolkit
- Material-UI

## API
- [TMDB API](https://www.themoviedb.org/documentation/api)

## Docker
To run my app locally with docker: 

[Download Docker Desktop](https://www.docker.com/get-started)

Create .env file in main directory with following line:
```text
REACT_APP_API_KEY=your_api_key_from_tmdb_api
```

Build containers:
```console
docker-compose build
```

To run app:
```console
docker-compose up
```


