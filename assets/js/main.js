const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0


function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <dialog id="${pokemon.name}" class="dialog-box ${pokemon.type}">
                    <button onclick="document.getElementById('${pokemon.name}').close()">&larr;</button>
                    <img src="${pokemon.photo}" alt="${pokemon.name}"> <br>
                    <h3>Base Stats</h3>
                    <ul>
                        <li>HP: ${pokemon.hp}</li>
                        <li>Attack: ${pokemon.attack}</li>
                        <li>Deffense: ${pokemon.defense}</li>
                        <li>Speed: ${pokemon.speed}</li>
                    </ul>
                </dialog>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}" 
                    onclick="document.getElementById('${pokemon.name}').showModal()">
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})

