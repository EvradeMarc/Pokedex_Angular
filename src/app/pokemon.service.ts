import { Injectable } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list';
import { Pokemon, PokemonList } from './pokemon.model';

//@Injectable() : indique que ce service est injectable mais je ne dis pas qu'il est disponible dans toute l'application
// providedIn: 'root' : permet de rendre ce service disponible dans toute l'application 
@Injectable({
  providedIn: 'root'
})


export class PokemonService {

  getPokemonList() : PokemonList {
    return POKEMON_LIST;
  }

  getPokemonById(id: number) : Pokemon {
     
    const pokemon = POKEMON_LIST.find(pokemon => pokemon.id === id);
    if(!pokemon) {
       throw new Error('No Pokemon with id ' + id);
    }
    
    return pokemon;
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
