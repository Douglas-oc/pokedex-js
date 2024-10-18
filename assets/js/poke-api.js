

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.hp = pokeDetail.stats.find(stat => stat.stat.name == 'hp').base_stat
    pokemon.attack = pokeDetail.stats.find(stat => stat.stat.name == 'attack').base_stat
    pokemon.defense = pokeDetail.stats.find(stat => stat.stat.name == 'defense').base_stat
    pokemon.speed = pokeDetail.stats.find(stat => stat.stat.name == 'speed').base_stat
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {// valores padrões
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    // - offset -> seria 'quando eu começo a olhar', ou seja, no 0 começa no primeiro pokemon
    // caso fosse offset=10; começaria apartir do pokemon 11, pulando o 10
    // - limit=10 -> vai exibir no máximo 10 pokemons
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)

}
