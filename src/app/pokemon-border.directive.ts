import { Directive, ElementRef, Host, HostListener, input } from '@angular/core';
import { getPokemonColor } from './pokemon.model';

@Directive({
  selector: '[appPokemonBorder]'
})
export class PokemonBorderDirective {

  private initialCorlor: string;
  // input : permet de passer des données à la directive
  // required : permet de rendre l'input obligatoire
  pokemonType = input.required<string>();

  constructor(private el : ElementRef) {
      this.initialCorlor = this.el.nativeElement.style.borderColor;
      this.el.nativeElement.style.borderWidth = '2px solid ' ;
   }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(getPokemonColor(this.pokemonType()));
   }

  @HostListener('mouseleave') onMouseLeave() {
      this.setBorder(this.initialCorlor);
  }

   private setBorder(color: string){
    this.el.nativeElement.style.borderColor = color; 
   }
}
