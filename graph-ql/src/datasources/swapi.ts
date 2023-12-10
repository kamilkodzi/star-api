import {
  AugmentedRequest,
  RESTDataSource,
  RequestDeduplicationPolicy,
  RequestOptions,
} from '@apollo/datasource-rest'
import DataLoader from 'dataloader'

type PresonURL = `https://swapi.dev/api/person/${number}`

class Api extends RESTDataSource {
  override baseURL = 'https://swapi.dev/api/'

  async getFilm(id?: string | number) {
    console.log('Fetching film with id: ', id)
    const data = await this.get(`films/${encodeURIComponent(id!)}`)
    return data
  }
  // async getPerson(): Promise<any[]>
  async getPerson(id?: PresonURL | number): Promise<any | null> {
    let results
    try {
      if (!id) results = (await this.get('people/')) ?? null
      if (typeof id === 'number') {
        results = (await this.get(`people/${encodeURIComponent(id)}`)) ?? null
      } else if (typeof id === 'string') {
        const regex = /(\d+)(\/)$/
        const idNumber = id.match(regex)?.[1]
        results = idNumber
          ? (await this.get(`people/${encodeURIComponent(idNumber)}`)) ?? null
          : null
      }
      return results
    } catch (error) {
      return null
    }
  }

  personLoader = new DataLoader((keys: any) => {
    return Promise.all(keys.map((key: any) => this.getPerson(key as any)))
  })

  async getFilmByURL(url: string) {
    const regex = /(\d+)(\/)$/
    const id = url.match(regex)?.[1]
    if (id) {
      console.log('Fetching film with id: ', id)
      const data = await this.get(`films/${encodeURIComponent(id)}`)
      return data
    } else {
      return null
    }
  }
  async getMovies() {
    console.log('Fetching all the movies')
    const data = await this.get(`${encodeURIComponent('films')}`)

    return data.results
  }
}

export { Api as StarWarsApi }
