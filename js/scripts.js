///////// assign  an IIFE variable ////////////
let pokemonRepository = (function (){
    let modalContainer = document.querySelector('.modal-container');
    // create empty array of pokemon
    let pokemonList = [];
    // api variable
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        pokemonItem.imageUrl = details.sprites.other.dream_world.front_default;
        pokemonItem.height = details.height;
        pokemonItem.weight = details.weight;

        pokemonItem.types = [];
        for(let i = 0; i < details.types.length; i++){
          pokemonItem.types.push(details.types[i].type.name);
        }
        pokemonItem.abilities = [];
        details.abilities.forEach(abilities => {
          pokemonItem.abilities.push(" " + abilities.ability.name);
        })

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

    function showDetails(pokemonItem){
      pokemonRepository.loadDetails(pokemonItem).then(function () {
        console.log(pokemonItem);
        showModal(pokemonItem);
      });
    }

    //Display modal
    function showModal(pokemonItem){
      //Clear existing modal content
      modalContainer.innerHTML = '';
      let modalBody = document.createElement('div');
      modalBody.classList.add('modal-body');

      let closeButton = document.createElement('button');
      closeButton.classList.add('modal-close');
      closeButton.innerText = 'Close';
      closeButton.addEventListener('click', closeModal);
      //name
      let pokemonName = document.createElement('h1');
      pokemonName.innerText = pokemonItem.name;
      //image
      let pokemonImg = document.createElement('img');
      pokemonImg.src = pokemonItem.imageUrl;
      //description
      let pokemonHeight = document.createElement('p');
      pokemonHeight.innerText = "Height: " + pokemonItem.height + " ft";

      let pokemonWeight = document.createElement('p');
      pokemonWeight.innerText = "Weight: " + pokemonItem.weight + " lbs";

      let pokemonTypes = document.createElement('p');
      pokemonTypes.innerText = "Types: " + pokemonItem.types;

      let abilities = document.createElement('p');
      abilities.innerText = "Abilities: " + pokemonItem.abilities;

      modalBody.appendChild(pokemonName);
      modalBody.appendChild(pokemonImg);
      modalBody.appendChild(pokemonHeight);
      modalBody.appendChild(pokemonWeight);
      modalBody.appendChild(pokemonTypes);
      modalBody.appendChild(abilities);
      modalBody.appendChild(closeButton);

      modalContainer.appendChild(modalBody);

      modalContainer.classList.add('is-visible');  
    }

    function closeModal() {
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
          closeModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if(target === modalContainer){
          closeModal();
      }
    });

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

/////////// Print out Pokemon onto page ///////////////
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemonItem => {
        pokemonRepository.addListItem(pokemonItem);
    });
});

