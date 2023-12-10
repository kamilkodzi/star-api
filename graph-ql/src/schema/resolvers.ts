import { ContextValue } from '../index.js'

type Film = {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: string
  edited: string
  url: string
}
type Arguments = {
  id: number
}

export const resolvers = {
  Query: {
    films: async (
      _: any,
      __: any,
      contextValue: ContextValue
    ): Promise<Film[]> => {
      return contextValue.swapi.getMovies()
    },
    film: async (_: any, { id }: any, contextValue: ContextValue) => {
      return contextValue.swapi.getFilm(id)
    },
    person: async (_: any, { id }: Arguments, contextValue: ContextValue) => {
      return contextValue.swapi.getPerson(id)
    },
  },
  Film: {
    characters(parent: Film, __: any, contextValue: ContextValue) {
      console.log('typ: ', typeof parent)
      console.log('parent: ', parent)
      return parent.characters.map((url: string) =>
        contextValue.swapi.personLoader.load(url)
      )
    },
  },
  Person: {
    films(parent: any, __: any, contextValue: ContextValue) {
      return parent.films.map((url: string) =>
        contextValue.swapi.getFilmByURL(url)
      )
    },
  },
}
