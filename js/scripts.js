///////// assign  an IIFE variable ////////////

let pokemonRepository = (function (){
    // create an array called pokemonList that will contain pokemon data to display in the application
    // define pokemonList
    let pokemonList = [];
    pokemonList = [
        { name: 'Bulbasaur', height: 0.7, weight: 6.9, types: ['grass', 'poison'] },
    
        { name: 'Oddish', height: 0.5, weight: 5.4, types: ['grass', 'poison'] },
    
        { name: 'Charmander', height: 0.6, weight: 8.5, types: ['fire'] },
    
        { name: 'Squirtle', height: 0.5, weight: 9, types: ['water'] },
    
        { name: 'JigglyPuff', height: 0.5, weight: 5.5, types: ['fairy', 'normal'] },
    
        { name: 'Charizard', height: 1.7, weight: 90.5, types: ['fire', 'flying'] }
    ];

    // returns pokemon list
    function getAll(){
        return pokemonList;
    }

    // add a pokemon
    function add(pokemonItem){
        // check that the item being added is an object
        // every() method will check if all elements in the array pass the test. The test is "key in pokemonItem" which uses the in operator that returns true if the properties in pokemonItem are in specified object "pokemonList[0]" 
        // Object.keys creates an array of the keys in the object pokemonList[0] 
        if( typeof pokemonItem === 'object' && Object.keys(pokemonList[0]).every( key => key in pokemonItem) ){
            // push object into array if conditions are met
            pokemonList.push(pokemonItem);
        }else{
            console.log('Can\'t add Pokemon, information isn\'t valid.');
        }
    }

    // search for a pokemon
    searchPokemon = (searchedPokemon) => {
        return Object.keys(pokemonList).filter(key => {
            return (pokemonList[key].name.toLowerCase()).includes(searchedPokemon.toLowerCase());
        })
    }

    return{
        searchPokemon: searchPokemon,
        getAll: getAll,
        add: add
    };
})();

////////// add a object with the valid keys /////////////
pokemonRepository.add({
    name: 'Pikachu',
    height: 0.4,
    weight: 6,
    types: ['electric'],
});

// test - add object with invalid or missing keys

// pokemonRepository.add({
//     name: 'blah',
//     height: 0.6,
//     weight: 7
// });


//////////// forEach function //////////////// 

// someValues.forEach((element) => {
//     console.log(element);
// });

// someValues.forEach((element, index) => {
//     console.log(`Current index: ${index}`);
//     console.log(element);
// });

/////////// print out pokemon onto page ///////////////
let pokemonList = pokemonRepository.getAll();

pokemonList.forEach((pokemonItem, i) => {
    document.write('<p class = "pokeText">' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
    // conditional to check if height is above a certain value
    if(pokemonList[i].height > 1){
        document.write('<span class = "pokeText">' + ' - Wow, that\'s big!' + '</span>');
    }
    document.write('</p>' + '<br>');
});

// find pokemon by name, display in console whether or not pokemon was found in pokemon repository. use filter function
// if the searched pokemon exists, then return array information about it
console.log(searchPokemon('squirtle'));
// if it doesn't then return an empty array
console.log(searchPokemon('DNE'));