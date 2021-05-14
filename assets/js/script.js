// Consumir API
// offset es como un start
// limit pues cuantos
// const API = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";
let since = 1;
let until = 20;
let namePoke = '';
const API = "https://pokeapi.co/api/v2/pokemon/";

const getData = () => {

    let fetchs = [];

    //pokemos ids for arrive
    if (namePoke != '') {
        fetchs.push(fetch(API + namePoke));
    } else {
        range(since, until).forEach(id => {
            fetchs.push(fetch(API + id));
        });
    }
    Promise.all(fetchs)
        .then(resps => {
            resps.forEach(resp => {
                draw(resp.json());
            });
        }).catch(console.error);
};

//pokemon draw
const draw = async(prom) => {
    const dataPokemon = document.getElementById("datosPersonaje");
    dataPokemon.innerHTML = '';
    const pokemon = await prom;

    let divcol = document.createElement('div');
    divcol.setAttribute('class', 'col-md-4');

    let divCard = document.createElement('div');
    divCard.setAttribute('class', 'card');
    divcol.setAttribute('style', 'width: 18rem;');

    let img = document.createElement('img');
    img.setAttribute('class', 'card-img-top');
    img.src = pokemon.sprites.other['official-artwork']['front_default'];
    img.setAttribute('alt', pokemon.name);

    let divBody = document.createElement('div');
    divBody.setAttribute('class', 'card-body');

    let h5Name = document.createElement('h5');
    h5Name.setAttribute('class', 'card-title');
    h5Name.textContent = pokemon.name;


    let pXp = document.createElement('p');
    pXp.setAttribute('class', 'card-text');
    pXp.textContent = `base experience ${pokemon.base_experience}`;

    divBody.appendChild(h5Name);
    divBody.appendChild(pXp);

    divCard.appendChild(img);
    divCard.appendChild(divBody);

    divcol.appendChild(divCard);
    dataPokemon.appendChild(divcol);

}
const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

// Paginación
const paginacion = () => {
    let pagination = document.getElementById("paginacion");
    let sinceInput = document.createElement('input');
    let untilInput = document.createElement('input');
    let nameInput = document.createElement('input');
    let idInput = document.createElement('input');

    sinceInput.setAttribute('type', 'number');
    idInput.setAttribute('type', 'number');
    nameInput.setAttribute('type', 'text');
    sinceInput.setAttribute('placeholder', 'since');
    nameInput.setAttribute('placeholder', 'Name');
    idInput.setAttribute('placeholder', 'ID');
    untilInput.setAttribute('type', 'number');
    untilInput.setAttribute('placeholder', 'until');
    sinceInput.setAttribute('min', '1');
    sinceInput.setAttribute('max', '1118');
    untilInput.setAttribute('min', '1');
    untilInput.setAttribute('max', '30');

    let btn = document.createElement('button');
    btn.innerHTML = 'Search!';
    btn.addEventListener('click', () => {

        since = sinceInput.value;
        until = untilInput.value;
        namePoke = nameInput.value;
        namePoke = idInput.value;
        getData();
    });
    pagination.appendChild(sinceInput);
    pagination.appendChild(untilInput);
    pagination.appendChild(nameInput);
    pagination.appendChild(idInput);
    pagination.appendChild(btn);
};

// Ejecutar getData
// getData(API);
paginacion();
getData();