const pokemonName = document.querySelector(`.pokemon_name`);
const pokemonNumber = document.querySelector(`.pokemon_number`);
const pokemonImg = document.querySelector(`.pokemon_image`);
const pokemonTipo = document.querySelector(`.pokemon_tipo`);


//Parte que controla a musica de fundo do site:
const bgMusic = document.getElementById(`bgMusic`);

if(bgMusic){
    bgMusic.volume = 0.2 //(Define o volume da musíca, 0.3 = 30% menor volume que o navegador suporta);

    function enableMusic(){
        bgMusic.play().catch(e => console.log("Repodução Bloqueada:", e));
        document.removeEventListener(`click`, enableMusic);
    }

    document.addEventListener(`click`, enableMusic,{once:true});

}





//Parte que puxa e controla o som dos bips da pokedex:

//função para chamar o som do index:
const changeSound = document.getElementById(`changeSound`);

//função para configurar o volume dp bip:

if(changeSound){
    changeSound.volume = 0.8;

}

function playChangeSound(){
    if(!changeSound) return;

    //Reinicia o aúdio caso já esteja tocando:
    try{
        changeSound.currentTime = 0;
        changeSound.play().catch(e => {
            console.log("Reprodução de som bloqueada:", e);
        });

    } catch (e){
        console.log("Erro ao reproduzir som", e);
    }
}

//Parte que faz as luzes da pokedex piscarem:
const bolaAzul = document.querySelector('.bola_azul')

const form = document.querySelector(`.form`);
const input = document.querySelector(`.input_search`);
const inputPrev = document.querySelector(`.btn-prev`);
const inputNext = document.querySelector(`.btn-next`);

function translateType(type) {
    switch (type) {
        case 'normal':
            return 'Normal';
        case 'fire':
            return 'Fogo';
        case 'water':
            return 'Água';
        case 'electric':
            return 'Elétrico';
        case 'grass':
            return 'Planta';
        case 'ice':
            return 'Gelo';
        case 'fighting':
            return 'Lutador';
        case 'poison':
            return 'Veneno';
        case 'ground':
            return 'Terrestre';
        case 'flying':
            return 'Voador';
        case 'psychic':
            return 'Psíquico';
        case 'bug':
            return 'Inseto';
        case 'rock':
            return 'Pedra';
        case 'ghost':
            return 'Fantasma';
        case 'dragon':
            return 'Dragão';
        case 'dark':
            return 'Sombrio';
        case 'steel':
            return 'Aço';
        case 'fairy':
            return 'Fada';
        default:
            return type;
    }

}


let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = `Carregando...`;
    pokemonNumber.innerHTML = ``;

    const data = await fetchPokemon(pokemon);
    
    if(data){

        //Tocar o bip ao carregar corretamente os dados!
        playChangeSound();


        bolaAzul.classList.remove('flash');
        void bolaAzul.offsetWidth; // truque para resetar animação
        bolaAzul.classList.add('flash');

        pokemonImg.style.display = `block`;
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data[`sprites`][`versions`][`generation-v`][`black-white`][`animated`][`front_default`];
        pokemonTipo.innerHTML = data.types[0].type.name;
        
        const types = data.types.map((t) => translateType(t.type.name));
        pokemonTipo.innerHTML = types.join(' / ');

        input.value = ``;
        searchPokemon = data.id;


    }else {
        pokemonImg.style.display = `none`;
        pokemonName.innerHTML = `Não Encontrado! :C`;
        pokemonNumber.innerHTML = ``;
    }
}

form.addEventListener (`submit`, () => {
    event.preventDefault();    
    renderPokemon(input.value.toLowerCase());
    
});

inputPrev.addEventListener(`click`, () => {
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

inputNext.addEventListener(`click`, () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);

});




    renderPokemon(searchPokemon);

