import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, POKEMON_RULES } from '../../pokemon.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
@Component({
  selector: 'app-pokemon-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './pokemon-edit.component.html',
  styles: ``
})
export class PokemonEditComponent {

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = signal(Number(this.route.snapshot.paramMap.get('id'))).asReadonly();
  
  readonly #pokemonResponse = toSignal(this.pokemonService.getPokemonById(this.pokemonId()).pipe(
    map(pokemon => ({value : pokemon, error : undefined})),
    catchError(error => of({value : undefined, error: error}))
  ));

  readonly loading = computed(() => this.#pokemonResponse() == undefined);
  readonly error = computed(() => this.#pokemonResponse()?.error);
  readonly pokemon = computed(() => this.#pokemonResponse()?.value);
  
  readonly POKEMON_RULES = POKEMON_RULES;

  readonly form = new FormGroup({
    name : new FormControl('', [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN)
    ]),
    life : new FormControl(),
    damage : new FormControl(),
    types : new FormArray(
      [],
      [
        Validators.required,    
        Validators.maxLength(POKEMON_RULES.MAX_TYPES),  
      ]
    ),
  });


  constructor(){
    effect(()=>{
      const pokemon = this.pokemon();
      if(pokemon) {
        this.form.patchValue({
          name: pokemon.name,
          life: pokemon.life,
          damage: pokemon.damage,
        });
        pokemon.types.forEach(type => this.pokemonTypeList.push(new FormControl(type)));
      }
    })
  }

  get pokemonTypeList():FormArray {
    return this.form.get('types') as FormArray;
  }

  get pokemonName(): FormControl {
    return this.form.get('name') as FormControl;
  }

  isPokemonTypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.find(
      (control) => control.value == type
    );
  }

  onPokemonTypeChange(type: string, isChecked: boolean)
  {
    if(isChecked){
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    }else{
      const index = this.pokemonTypeList.controls
      .map((control) => control.value)
      .indexOf(type);
      
      this.pokemonTypeList.removeAt(index);
    }
  }

  getPokemonColor(type: string) {
    return getPokemonColor(type);
  }

  getChipTextColor(type: string): 'black' | 'white' {
    return type == 'Electrik' ? 'black' : 'white';
  }


  onSubmit(){
    const isFormValid = this.form.valid;
    const pokemon = this.pokemon();

    if(isFormValid && pokemon) {
      const updatedPokemon = {
        ...pokemon,
        name : this.pokemonName.value,
        life : this.pokemonLife.value,
        damage : this.pokemonDamage.value,
        types : this.pokemonTypeList.value
      };

      this.pokemonService.updatePokemon(updatedPokemon).subscribe(() => {
        this.router.navigate(['/pokemons', pokemon.id]);
      });

    }
  }

  get pokemonLife(): FormControl {
    return this.form.get('life') as FormControl;
  }
  incrementLife() {
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);

  }
  decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }

  get pokemonDamage(): FormControl {
    return this.form.get('damage') as FormControl;
  }
  incrementDamage() {
    const newValue = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newValue);

  }

  decrementDamage() {
    const newValue = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newValue);
  }

}
