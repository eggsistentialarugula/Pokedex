///////// assign  an IIFE variable ////////////

let pokemonRepository = (function (){
    // create empty array of pokemon
    let pokemonList = [];
    // api variable
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';

    // add a pokemon
    // function add(pokemonItem){
    //     // check that the item being added is an object
    //     // every() method will check if all elements in the array pass the test. The test is "key in pokemonItem" which uses the in operator that returns true if the properties in pokemonItem are in specified object "pokemonList[0]" 
    //     // Object.keys creates an array of the keys in the object pokemonList[0] 
    //     if( typeof pokemonItem === 'object' && Object.keys(pokemonList[0]).every( key => key in pokemonItem) ){
    //         // push object into array if conditions are met
    //         pokemonList.push(pokemonItem);
    //     }else{
    //         console.log('Can\'t add Pokemon, information isn\'t valid.');
    //     }
    // }

    //add pokemon to the empty array of pokemon
    function add(pokemonItem){
      // check that the item being added is an object
      if(typeof pokemonItem === 'object'){
          // push object into array if conditions are met
          pokemonList.push(pokemonItem);
      }else{
          console.log('Can\'t add Pokemon, information isn\'t valid.');
      }
    }

    // return the pokemon list
    function getAll(){
      return pokemonList;
    }

    // add pokemon items onto the page
    function addListItem(pokemonItem){
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemonItem.name;
      button.classList.add('pokemonList-button');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      // event listener
      button.addEventListener('click', function(){
          showDetails(pokemonItem);
      });
    }

    //load the list of pokemon
    function loadList() {
      return fetch(apiUrl).then(response => {
        return response.json();
      }).then(json => {
        json.results.forEach(pokemonItem => {
          let pokemon = {
            name: pokemonItem.name,
            detailsUrl: pokemonItem.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(e => {
        console.error(e);
      })
    }

    //loads details of each pokemon
    function loadDetails(pokemonItem) {
      let url = pokemonItem.detailsUrl;
      return fetch(url).then(response => {
        return response.json();
      }).then(details => {
        // Now we add the details to the item
        pokemonItem.imageUrlFront = details.sprites.front_default;
        pokemonItem.imageUrlBack = details.sprites.back_default;
        pokemonItem.height = details.height;
        pokemonItem.types = details.types;
      }).catch(e => {
        console.error(e);
      });
    }

    // search for a pokemon, find a more simple way to do this later.
    searchPokemon = (searchedPokemon) => {
      return Object.keys(pokemonList).filter(key => {
        return (pokemonList[key].name.toLowerCase()).includes(searchedPokemon.toLowerCase());
      })
    }

    // Show details of the pokemon
    // function showDetails(pokemonItem){
    //   pokemonRepository.loadDetails(pokemonItem).then(function () {
    //     console.log(pokemonItem);
    //   });
    // }

    function showDetails(pokemonItem){
      pokemonRepository.loadDetails(pokemonItem).then(function () {
        console.log(pokemonItem);
      });
    }

    return{
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      searchPokemon: searchPokemon
    };
})();

////////// add a object with the valid keys /////////////
// pokemonRepository.add({
//     name: 'Pikachu',
//     height: 0.4,
//     weight: 6,
//     types: ['electric'],
// });

// test - add object with invalid or missing keys

// pokemonRepository.add({
//     name: 'blah',
//     height: 0.6,
//     weight: 7
// });


//////////// forEach function //////////////// 

// someValues.forEach((element, index) => {
//     console.log(`Current index: ${index}`);
//     console.log(element);
// });

/////////// Print out Pokemon onto page ///////////////

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemonItem => {
        pokemonRepository.addListItem(pokemonItem);
    });
});

// find pokemon by name, display in console whether or not pokemon was found in pokemon repository. use filter function
// if the searched pokemon exists, then return array information about it
console.log(searchPokemon('squirtle'));
// if it doesn't then return an empty array
console.log(searchPokemon('DNE'));