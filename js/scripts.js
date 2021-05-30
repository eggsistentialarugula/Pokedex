///////// assign  an IIFE variable ////////////
let pokemonRepository = (function (){
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
      details.types.forEach(types => {
        pokemonItem.types.push(" " + types.type.name);
      });

      pokemonItem.abilities = [];
      details.abilities.forEach(abilities => {
        pokemonItem.abilities.push(" " + abilities.ability.name);
      });

    }).catch(e => {
      console.error(e);
    });
  }

  // add pokemon items onto the page
  function addListItem(pokemonItem){
    let pokemonList = $(".pokemon-list");
    let listItem = $("<div class = 'list-group-item col-sm-6 col-md-4 col-xl-3'</div>");
    let button = $("button");
    button = $("<button>" + pokemonItem.name + "</button>");
    button.addClass("pokemonList-button");

    // add data toggle and data target to show modals
    button.attr('data-toggle','modal');
    button.attr('data-target', '#exampleModalCenter')

    listItem.append(button);
    pokemonList.append(listItem);
    // event listener
    button.on('click', function(){
        showDetails(pokemonItem);
    });
  }

  function showDetails(pokemonItem){
    pokemonRepository.loadDetails(pokemonItem).then(function () {
      console.log(pokemonItem);
      showModal(pokemonItem);
    });
  }

  //Display modal
  function showModal(pokemonItem){
    // modalContainer.innerHTML = '';
    let modalTitle = $(".modal-title");
    let modalBody = $(".modalBody");
    //Clear existing modal content
    modalTitle.empty();
    modalBody.empty();
    //name
    let pokemonName = $('<h1>' + pokemonItem.name + '</h1>');
    pokemonName.attr('aria-label', pokemonItem.name + ' name title');
    //image
    let pokemonImg = $('<img class = "pokemon-img img-fluid">');
    pokemonImg.attr('src', pokemonItem.imageUrl);
    pokemonImg.attr('alt', pokemonItem.name + ' image');
    
    //description
    let pokemonHeight = $("<p>" + 
      "<b> Height: </b>" + 
      pokemonItem.height + " ft" 
      + "</p>"
    );

    let pokemonWeight = $("<p>" + 
      "<b> Weight: </b>" + 
      pokemonItem.weight + 
      " lbs" 
      + "</p>"
    );

    let pokemonTypes = $("<p>" + 
      "<b> Types: </b>" + 
      pokemonItem.types + 
      "</p>"
    );

    let pokemonAbilities = $("<p>" + 
      "<b> Abilities: </b>" + 
      pokemonItem.abilities + 
      "</p>"
    );

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImg);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);

  } 

  // search function, credit goes to: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_filters_table

  $(document).ready(function(){
    $("#search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".pokemon-list *").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

/////////// Print out Pokemon onto page ///////////////
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(pokemonItem => {
      pokemonRepository.addListItem(pokemonItem);
  });
});

// credits: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
function topFunction(){
  document.body.scrollTop = 0; //safari
  document.documentElement.scrollTop = 0; //for chrome, firefox, IE, and opera  
}