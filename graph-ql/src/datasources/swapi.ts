import { RESTDataSource } from '@apollo/datasource-rest'
import DataLoader from 'dataloader'
import {
  SwapiAllowedPath,
  ValidUrl,
  ValidSwapiResponse,
  FilmURL,
  PersonURL,
} from '../schema/types'

class Api extends RESTDataSource {
  override baseURL = 'https://swapi.dev/api/'

  async swapiGet(
    path: SwapiAllowedPath,
    id?: ValidUrl | number
  ): Promise<ValidSwapiResponse | ValidSwapiResponse[] | null> {
    let results
    try {
      if (!id) {
        console.log(`Fetching all ${path}`)
        results = (await this.get(`${path}/`)).results ?? null
      } else if (typeof id === 'number') {
        console.log(`Fetching ${path} with id: ${id}`)
        results = (await this.get(`${path}/${encodeURIComponent(id)}`)) ?? null
      } else if (typeof id === 'string') {
        const regex = /(\d+)(\/)$/
        const idNumber = id.match(regex)?.[1]
        console.log(`Fetching ${path} with id: ${idNumber}`)
        results = idNumber
          ? (await this.get(`${path}/${encodeURIComponent(idNumber)}`)) ?? null
          : null
      }
      if (results.results) return results.results
      return results
    } catch (error) {
      return null
    }
  }

  personsLoader = new DataLoader((keys: any) => {
    return Promise.all(
      keys.map((key: PersonURL) => this.swapiGet('people', key))
    )
  })
  filmsLoader = new DataLoader((keys: any) => {
    return Promise.all(keys.map((key: FilmURL) => this.swapiGet('films', key)))
  })
  planetsLoader = new DataLoader((keys: any) => {
    return Promise.all(
      keys.map((key: FilmURL) => this.swapiGet('planets', key))
    )
  })
  starshipsLoader = new DataLoader((keys: any) => {
    return Promise.all(
      keys.map((key: FilmURL) => this.swapiGet('starships', key))
    )
  })
  vehiclesLoader = new DataLoader((keys: any) => {
    return Promise.all(
      keys.map((key: FilmURL) => this.swapiGet('vehicles', key))
    )
  })
  speciesLoader = new DataLoader((keys: any) => {
    return Promise.all(
      keys.map((key: FilmURL) => this.swapiGet('species', key))
    )
  })
}

export { Api as StarWarsApi }
