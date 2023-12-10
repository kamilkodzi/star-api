# If you ever wonder how to start working with Apollo server + GraphQL

This is just starting point for further developlemt.

### Area to investigate:

1. Add Redis server to docker-compose+network and use in project
2. Cache each fetch results in to redis (watchout for null responses)
3. Is possible to use just `Film` query with optional param`(id)` and return `Film[] | Film` instead of using `Films`
4. Add tests - probably Jest can suit all needs

## This is simple example of reducing deduplication (n+1) problem

Packaget that fix problem:
`datasource-rest`
`dataloader`

## Running application locally:

My node version = 20.9.0

1. `git clone https://github.com/kamilkodzi/star-api.git`
1. `cd star-api`
1. `npm i`
1. `npm run dev`

## Running applicaton with Docker

Be sure you have docker instaled on your system, then:

1. `cd infra\docer-compose\`
1. `docker-compose up`
1. visit `http://localhost:4000/`
   Projest starts on dev mode with hot-reloading,
   so uou can add any console.log() just like that
   [TIP]:
   Use query bellow and watch console.
   Each fetch will be prompt

### Fishy query with deduplication:

```js
query Films {
  films {
    title
    producer
    planets {
      terrain
      name
      films {
        species {
          name
          language
        }
      }
    }
    characters {
      name
    }
    vehicles {
      name
      pilots {
        name
      }
    }
  }
}
`
```
