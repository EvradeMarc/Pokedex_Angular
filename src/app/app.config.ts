import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // Définition des routes de l'application
  // L'ordre est important, Angular va parcourir les routes dans l'ordre du haut vers le bas
  // Si une route correspond, elle sera utilisée et les suivantes seront ignorées
 // Plus une route est spécifique, plus elle doit être placée haut dans la liste
  {
    path: 'login',
    component: LoginComponent,
    title: 'Connexion'
  },
  {
    path: 'pokemons',
    canActivateChild: [AuthGuard], // Protège les routes enfants avec le AuthGuard
    children: [
      {
        path:'edit/:id', 
        component: PokemonEditComponent, 
        title: 'Édition du Pokémon'
      },
      {
        path:':id', 
        component: PokemonProfileComponent 
      },
      {
        path:'', 
        component: PokemonListComponent, 
        title: 'Pokédex',
      },
    ]
  },
  {
    path: '', 
    redirectTo: '/pokemons', 
    pathMatch: 'full'
  }, // faire pointer vers la liste des pokémons par défaut
  {
    path:'**', 
    component: PageNotFoundComponent, 
    title:'Page non Trouvée'
  }, // ** :  pour capturer toutes les routes non définies/ "intercepte toutes les routes"
  
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
