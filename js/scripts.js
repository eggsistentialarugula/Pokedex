// create an array called pokemonList that will contain pokemon data to display in the application

//define pokemonList
let pokemonList = [];

pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        weight: 6.9,
        types: ['grass', 'poison'],

    },

    {
        name: 'Oddish',
        height: 0.5,
        weight: 5.4,
        types: ['grass', 'poison']
    },

    {
        name: 'Charmander',
        height: 0.6,
        weight: 8.5,
        types: ['fire']
    },

    {
        name: 'Squirtle',
        height: 0.5,
        weight: 9,
        types: ['water']
    },

    {
        name: 'JigglyPuff',
        height: 0.5,
        weight: 5.5,
        types: ['fairy', 'normal']
    },

    {
        name: 'Pikachu',
        height: 0.4,
        weight: 6,
        types: ['electric']
    },

    {
        name: 'Charizard',
        height: 1.7,
        weight: 90.5,
        types: ['fire', 'flying'] 
    }
];

//output list of pokemon names and height 
for(let i = 0; i < pokemonList.length; i++){
    document.write('<p id = "pokeText">' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') <br>' + '</p>');
}

//loop through the array to see if height is above a certain value

