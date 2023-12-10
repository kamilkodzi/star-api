type HostURL = `https://swapi.dev/api`

export type SwapiAllowedPath =
  | 'vehicles'
  | 'films'
  | 'planets'
  | 'people'
  | 'starships'
  | 'species'

export type ValidUrl =
  | VehicleURL
  | FilmURL
  | PlanetURL
  | PersonURL
  | StarshipURL
  | SpeciesURL

export type VehicleURL = `${HostURL}/vehicles/${number}/`
export type FilmURL = `${HostURL}/films/${number}/`
export type PlanetURL = `${HostURL}/planets/${number}/`
export type PersonURL = `${HostURL}/people/${number}/`
export type StarshipURL = `${HostURL}/starships/${number}/`
export type SpeciesURL = `${HostURL}/species/${number}/`

export type ValidSwapiResponse =
  | Film
  | Species
  | Vehicle
  | Person
  | Planet
  | Starship

export type Film = {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: PersonURL[] | null
  planets: PlanetURL[] | null
  starships: StarshipURL[] | null
  vehicles: VehicleURL[] | null
  species: SpeciesURL[] | null
  created: string
  edited: string
  url: string
}
export type Species = {
  name: string
  classification: string
  designation: string
  average_height: string
  skin_colors: string
  hair_colors: string
  eye_colors: string
  average_lifespan: string
  homeworld: string
  language: string
  people: PersonURL[] | null
  films: FilmURL[] | null
  created: string
  edited: string
  url: string
}

export type Vehicle = {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  vehicle_class: string
  pilots: PersonURL[] | null
  films: FilmURL[] | null
  created: string
  edited: string
  url: string
}

export type Starship = {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: PersonURL[] | null
  films: FilmURL[] | null
  created: string
  edited: string
  url: string
}

export type Planet = {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: PersonURL[] | null
  films: FilmURL[] | null
  created: string
  edited: string
  url: string
}

export type Person = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: FilmURL[] | null
  species: SpeciesURL[] | null
  vehicles: VehicleURL[] | null
  starships: StarshipURL[] | null
  created: string
  edited: string
  url: string
}

export type WithId<T = any> = {
  id: T
}
