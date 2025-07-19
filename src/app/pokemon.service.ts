import { inject, Injectable } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list';
import { Pokemon, PokemonList } from './pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//@Injectable() : indique que ce service est injectable mais je ne dis pas qu'il est disponible dans toute l'application
// providedIn: 'root' : permet de rendre ce service disponible dans toute l'application 
@Injectable({
  providedIn: 'root'
})


export class PokemonService {

  readonly #POKEMON_API_URL = 'http://localhost:3000/pokemons'; // URL de l'API JSON Server
  readonly #http = inject(HttpClient);

  getPokemonList() : Observable<PokemonList> {
    return this.#http.get<PokemonList>(this.#POKEMON_API_URL);
  }

  getPokemonById(id: number) : Observable<Pokemon> {
    const url =this.#POKEMON_API_URL + '/' + id;
    return this.#http.get<Pokemon>(url);
  }

  updatePokemon(pokemon: Pokemon) : Observable<Pokemon> {
    const url = this.#POKEMON_API_URL + '/' + pokemon.id;   
    return this.#http.put<Pokemon>(url, pokemon);
  }

  deletePokemon(id: number) : Observable<void> {
    const url = this.#POKEMON_API_URL + '/' + id;
    return this.#http.delete<void>(url);
  }

  addPokemon(pokemon : Omit<Pokemon, 'id'>) : Observable<Pokemon> {
    return this.#http.post<Pokemon>(this.#POKEMON_API_URL, pokemon);
  }


  getPokemonTypeList() : string[]
  {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Vol',
      'Poison',
      'Fée',
      'Electrik',
      'Normal',
    ];
  }
}
