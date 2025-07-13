import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-profile',
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styles: ``
})
export class PokemonProfileComponent {

  constructor() {
    this.#titleService.setTitle('Pokémon - ' + this.pokemon().name);
  }

  readonly #route = inject(ActivatedRoute); // Injection du service ActivatedRoute pour accéder aux paramètres de la route
  readonly #pokemonService = inject(PokemonService); // Injection du service PokemonService

  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id')); // Récupération de l'ID du Pokémon à partir des paramètres de la route
  
  readonly pokemon = signal(this.#pokemonService.getPokemonById(this.#pokemonId)); // Utilisation du service PokemonService pour obtenir le Pokémon par son ID

  readonly #titleService = inject(Title);
  

}
