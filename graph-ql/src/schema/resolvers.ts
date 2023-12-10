import { ContextValue } from '../index.js'
import { WithId, Film, Person } from './types.js'

export const resolvers = {
  Query: {
    films: async (_: any, __: any, { swapi }: ContextValue) => {
      return swapi.swapiGet('films')
    },
    film: async (_: any, { id }: WithId<number>, { swapi }: ContextValue) => {
      return swapi.swapiGet('films', id)
    },
    person: async (_: any, { id }: WithId<number>, { swapi }: ContextValue) => {
      return swapi.swapiGet('people', id)
    },
    species: async (
      _: any,
      { id }: WithId<number>,
      { swapi }: ContextValue
    ) => {
      return swapi.swapiGet('species', id)
    },
    vehicles: async (
      _: any,
      { id }: WithId<number>,
      { swapi }: ContextValue
    ) => {
      return swapi.swapiGet('vehicles', id)
    },
    starships: async (
      _: any,
      { id }: WithId<number>,
      { swapi }: ContextValue
    ) => {
      return swapi.swapiGet('starships', id)
    },
    planets: async (
      _: any,
      { id }: WithId<number>,
      { swapi }: ContextValue
    ) => {
      return swapi.swapiGet('planets', id)
    },
  },
  Film: {
    characters(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.personsLoader.load(url))
    },
    planets(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.planetsLoader.load(url))
    },
    starships(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.starshipsLoader.load(url))
    },
    vehicles(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.vehiclesLoader.load(url))
    },
    species(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.speciesLoader.load(url))
    },
  },
  Person: {
    films(parent: Person, __: any, { swapi }: ContextValue) {
      return parent.films?.map((url) => swapi.filmsLoader.load(url))
    },
    species(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.speciesLoader.load(url))
    },
    vehicles(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.vehiclesLoader.load(url))
    },
    starships(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.starshipsLoader.load(url))
    },
  },
  Species: {
    people(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.personsLoader.load(url))
    },
    films(parent: Person, __: any, { swapi }: ContextValue) {
      return parent.films?.map((url) => swapi.filmsLoader.load(url))
    },
  },
  Vehicle: {
    pilots(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.personsLoader.load(url))
    },
    films(parent: Person, __: any, { swapi }: ContextValue) {
      return parent.films?.map((url) => swapi.filmsLoader.load(url))
    },
  },
  Starship: {
    pilots(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.personsLoader.load(url))
    },
    films(parent: Person, __: any, { swapi }: ContextValue) {
      return parent.films?.map((url) => swapi.filmsLoader.load(url))
    },
  },
  Planet: {
    residents(parent: Film, __: any, { swapi }: ContextValue) {
      return parent.characters?.map((url) => swapi.personsLoader.load(url))
    },
    films(parent: Person, __: any, { swapi }: ContextValue) {
      return parent.films?.map((url) => swapi.filmsLoader.load(url))
    },
  },
}
