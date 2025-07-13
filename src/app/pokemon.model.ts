//mappe le type du pokemon à une couleur de bordure
   export function getPokemonColor(type:string): string {
    switch (type) {
      case 'Feu':
        return '#EF5350';
      case 'Eau':
        return '#42A5F5';
      case 'Plante':
        return '#66BB6A';
      case 'Insecte':
        return '#8d6e63';
      case 'Vol':
        return '#90CAF9';
      case 'Poison':
        return '#b388ff';
      case 'Fée':
        return '#f8bbd0';
      case 'Electrik':
        return '#f4ff81';
      default:
        return '#303030';
    }
  }


export const POKEMON_RULES = {
  NAME_PATTERN: /^[a-zA-Zéè]+$/,
  MAX_NAME: 20,
  MIN_NAME: 3,
  MAX_LIFE: 30,
  HIGH_LIFE: 25,
  LOW_LIFE: 15,
  MIN_LIFE: 10,
  MAX_DAMAGE: 10,
  MIN_DAMAGE: 1,
  MIN_TYPES: 1,
  MAX_TYPES: 3,
}as const;



export interface Pokemon {
  id: number; // Identifiant unique du Pokémon
  name: string; // Nom du Pokémon
  picture: string; // URL de l'image du Pokémon
  life: number; // Points de vie du Pokémon
  damage: number; // Dégâts infligés par le Pokémon
  //Type du Pokémon : on pouvait faire type: string[]; mais on l'a fait ainsi car un pokemon ne peut avoir que 1 à 3 types
  types : [string] | [string, string] | [string, string, string]; // Types du Pokémon 1-3 types
  created: Date;
}

export type PokemonList = Pokemon[]; 