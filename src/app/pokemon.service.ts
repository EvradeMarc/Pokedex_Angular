import { Pokemon, PokemonList } from './pokemon.model';
import { Observable } from 'rxjs';

//@Injectable() : indique que ce service est injectable mais je ne dis pas qu'il est disponible dans toute l'application
// providedIn: 'root' : permet de rendre ce service disponible dans toute l'application 
/*@Injectable({
  providedIn: 'root'
})*/

export abstract class PokemonService { 
  abstract getPokemonList(): Observable<PokemonList>;
  abstract getPokemonById(id: number): Observable<Pokemon>;
  abstract updatePokemon(pokemon: Pokemon): Observable<Pokemon>;
  abstract deletePokemon(pokemonId: number): Observable<void>;
  abstract addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon>;
  abstract getPokemonTypeList(): string[];
}

