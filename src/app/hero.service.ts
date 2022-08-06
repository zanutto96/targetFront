import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Hero } from './hero';


@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getHeroes(): Observable<any> {
    return this.httpClient.get(environment.API_ENDPOINT.heroes)
  }

  getHero(id_hero: number): Observable<any> {
    return this.httpClient.get(environment.API_ENDPOINT.heroes, {
      params: {
        id_hero: id_hero
      }
    })
  }
  
  addHero(hero: Hero): Observable<any> {
    return this.httpClient.post(environment.API_ENDPOINT.heroes, hero)
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(environment.API_ENDPOINT.heroes, hero)
  }

  deleteHero(id_hero: number): Observable<any> {
    return this.httpClient.delete(environment.API_ENDPOINT.heroes, {
      params: {
        id_hero: id_hero
      }
    })
  }

}
