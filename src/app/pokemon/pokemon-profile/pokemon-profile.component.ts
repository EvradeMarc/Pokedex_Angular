import { Component, inject, signal, effect, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styles: ``
})
export class PokemonProfileComponent {

  constructor() {
   effect(()=>{
      const pokemon = this.pokemon();
      if(pokemon) {
        this.#titleService.setTitle('Pokémon - ' + pokemon.name);
      }
    });
  }

  readonly #route = inject(ActivatedRoute); // Injection du service ActivatedRoute pour accéder aux paramètres de la route
  readonly #router = inject(Router);
  readonly #pokemonService = inject(PokemonService); // Injection du service PokemonService

  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id')); // Récupération de l'ID du Pokémon à partir des paramètres de la route
  
  readonly #pokemonResponse = toSignal(this.#pokemonService.getPokemonById(this.#pokemonId).pipe(
    map(pokemon => ({value: pokemon, error : undefined})),
    catchError(error => of({value: undefined, error: error}))
  )
  ); 
  readonly loading =  computed(()=> this.#pokemonResponse() == undefined);
  readonly error =  computed(()=> this.#pokemonResponse()?.error);
  readonly pokemon = computed(() => this.#pokemonResponse()?.value); 
  readonly #titleService = inject(Title);

  deletePokemon() {
    this.#pokemonService.deletePokemon(this.#pokemonId).subscribe( ()=>{
      this.#router.navigate(['/pokemons']);
    });
   }
  
}
