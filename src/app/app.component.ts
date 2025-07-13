import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html', // Chemin vers le fichier HTML du composant
  styleUrl: './app.component.css', // Chemin vers le fichier CSS du composant(specifique à ce composant)
  // providers: [PokemonService],  Permet d'injecter le service PokemonService dans ce composant, DU COUP L'INSTANCE DU SERVICE EST CREEE EST PROPRE A CE COMPOSANT
})
export class AppComponent { 

}
