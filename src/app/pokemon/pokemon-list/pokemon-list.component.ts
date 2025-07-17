import { Component, computed, inject, signal } from '@angular/core';
import { Pokemon } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: `.pokemon-card{
    cursor: pointer;
  }`
})
export class PokemonListComponent {
// Déclaration de la classe du composant(Code); 
// export : permet d'utiliser ce composant dans d'autres fichiers
 
// signal : permet de créer un état réactif dans Angular
 // Liste des Pokémon, initialisée avec POKEMON_LIST
readonly #pokemonService = inject(PokemonService); // Injection du service PokemonService
readonly pokemons = toSignal(this.#pokemonService.getPokemonList(), {
  initialValue: []
}); // Utilisation du service PokemonService pour obtenir la liste des Pokémon)
readonly searchTerm = signal(''); // Signal pour le terme de recherche

readonly pokemonListFiltered = computed(()=> {
  const term = this.searchTerm();
  const pokemons = this.pokemons();

  return pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(term.trim().toLowerCase()));
});

readonly loading = computed(() => this.pokemons().length == 0);


size(pokemon :Pokemon){

  if(pokemon.life <= 15){
    return 'petit';
  }

  if(pokemon.life >= 25){
    return 'grand';
  }

  return 'moyen'
}

incrementLife(pokemon : Pokemon){
  pokemon.life += 1;
}

decrementLife(pokemon : Pokemon){
  pokemon.life -= 1;
}
}
