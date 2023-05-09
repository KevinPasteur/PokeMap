import * as d3 from "./node_modules/d3/dist/d3.js";
import dataJson from "./data/data.json";

console.log(dataJson);
let map = document.querySelector(".active");
const buttonParent = document.querySelector("#buttonParent");

let pokeballsActive = document.querySelectorAll(".pokeballs");
let zones = document.querySelectorAll(".zones");

const pokedex = document.querySelector("section.pokedex");

const camera = document.querySelector(".camera");

const title = document.querySelector("#titre");

const pokemonImage = document.querySelector("#pokemon-image");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonLvl = document.querySelector("#pokemon-lvl");
const pokemonRate = document.querySelector("#pokemon-rate");
const pokemonPosition = document.querySelector("#pokemon-position");
const pokemonPagination = document.querySelector("#pokemon-pagination");
const pokemonType1 = document.querySelector("#pokemon-type1");
const pokemonType2 = document.querySelector("#pokemon-type2");

const btnStats1 = document.querySelector("#btn-stats-1");
const btnStats2 = document.querySelector("#btn-stats-2");

let listCurrentPokemon = [];
let currentPokemonKey = 0;

let currentZone = "map";
let previousZone = "";

let isFunFactON = false;
let isPokedexON = false;
let isStatsON = false;
let isPowerON = true;

const Zones = {
  route1: "ROUTE 1",
  route2: "ROUTE 2",
  route3: "ROUTE 3",
  route4: "ROUTE 4",
  route5: "ROUTE 5",
  route6: "ROUTE 6",
  route7: "ROUTE 7",
  route8: "ROUTE 8",
  route9: "ROUTE 9",
  route10: "ROUTE 10",
  route11: "ROUTE 11",
  route12: "ROUTE 12",
  route13: "ROUTE 13",
  route14: "ROUTE 14",
  route15: "ROUTE 15",
  route16: "ROUTE 16",
  route17: "ROUTE 17",
  route18: "ROUTE 18",
  route19: "ROUTE 19",
  route20: "ROUTE 20",
  route21: "ROUTE 21",
  route22: "ROUTE 22",
  route23: "ROUTE 23",
  route24: "ROUTE 24",
  route25: "ROUTE 25",
  palletTown: "BOURG PALETTE",
  viridianCity: "JADIELLE",
  viridianForest: "FORET DE JADE",
  vermilionCity: "CARMIN SUR MER",
  celadonCity: "CELADOPOLE",
  fuchsiaCity: "PARMANIE",
  cinnabarIsland: "CRAMOIS'ILE",
};

const Location = {
  grass: "Herbe",
  surfing: "Surf",
  oldRod: "Canne",
  goodRod: "Super canne",
  superRod: "Mega canne",
  cave: "Grotte",
  starter: "Starter",
  casino: "Casino",
  special: "Special",
  safari: "Safari",
  powerPlant: "Centrale",
};

const Types = {
  normal: "Normal",
  fire: "Feu",
  water: "Eau",
  electric: "Electrique",
  grass: "Plante",
  ice: "Glace",
  fight: "Combat",
  poison: "Poison",
  ground: "Sol",
  flying: "Vol",
  psychic: "Psy",
  bug: "Insecte",
  rock: "Roche",
  dragon: "Dragon",
  dark: "Tenebres",
  steel: "Acier",
  fairy: "Fee",
};

let countTypes = {
  normal: 0,
  fire: 0,
  water: 0,
  electric: 0,
  grass: 0,
  ice: 0,
  fight: 0,
  poison: 0,
  ground: 0,
  flying: 0,
  psychic: 0,
  bug: 0,
  rock: 0,
  dragon: 0,
  dark: 0,
  steel: 0,
  fairy: 0,
};

const toggleTitle = (zone) => {
  title.classList.toggle("activateTitle");
  title.innerHTML = getZone(zone);
};

const changeZone = (newZone) => {
  document.querySelector(`.${newZone}`).classList.add("active");
  document.querySelector(`.${newZone}`).style.left = "0px";
  document.querySelector(`.${newZone}`).style.top = "0px";
  document.querySelector(`.${currentZone}`).classList.remove("active");

  previousZone = currentZone;
  currentZone = newZone;

  toggleTitle(newZone);

  map = document.querySelector(".active");
  pokeballsActive = document.querySelector(".active>.pokeballs");
};

zones.forEach((element) => {
  element.addEventListener("click", (e) => {
    changeZone(e.target.id);
  });
});

pokeballsActive.forEach((element) => {
  element.addEventListener("click", (e) => {
    const [zone, location] = e.target.id.split("-");

    togglePokedex(zone);

    listCurrentPokemon = dataJson[zone][location];
    listCurrentPokemon["location"] = location;

    currentPokemonKey = 0;
    printPokemon(listCurrentPokemon.pokemon[0]);
  });
});

const printFunFact = (name) => {
  title.classList.toggle("activateTitle");
  isFunFactON = !isFunFactON;
  document.querySelector(`.${currentZone}`).classList.toggle("active");
  const funfact = document.querySelector("section.funfact");

  funfact.classList.toggle(name);
  funfact.classList.toggle("active");
};

// set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Initialize the X axis
var x = d3.scaleBand().range([0, width]).padding(0.2);
var xAxis = svg.append("g").attr("transform", "translate(0," + height + ")");

// Initialize the Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = svg.append("g").attr("class", "myYaxis");

const printStats = () => {
  title.classList.toggle("activateTitle");
  document.querySelector("#titreStat").innerHTML = getZone(currentZone);

  isStatsON = !isStatsON;
  document.querySelector(`.${currentZone}`).classList.toggle("active");

  const stats = document.querySelector("section.stats");

  stats.classList.toggle("active");

  btnStats1.classList.remove("stats1-active");
  btnStats1.classList.add("stats1-active");
  btnStats2.classList.remove("stats2-active");

  createGraph1();
  cleanCountTypes();
};

const moveArray = (move) => {
  currentPokemonKey += move;

  if (currentPokemonKey < 0)
    currentPokemonKey = listCurrentPokemon.pokemon.length - 1;
  if (currentPokemonKey === listCurrentPokemon.pokemon.length)
    currentPokemonKey = 0;

  printPokemon(listCurrentPokemon.pokemon[currentPokemonKey]);
};

const getLocation = (location) => {
  return Location[location];
};

const getZone = (zone) => {
  return Zones[zone];
};

const getType = (type) => {
  return Types[type];
};

const formatPokemonName = (name) => {
  if (name === "NidoranMale") name = "Nidoran (M)";
  if (name === "NidoranFemelle") name = "Nidoran (F)";

  return name;
};

const changeType = (pokemon) => {
  pokemonType1.className = "pokemon-type1";
  pokemonType2.className = "pokemon-type2";

  if (Array.isArray(pokemon.type)) {
    pokemonType1.classList.add("pokemon-" + pokemon.type[0]);
    pokemonType2.classList.add("pokemon-" + pokemon.type[1]);
  } else pokemonType1.classList.add("pokemon-" + pokemon.type);
};

const printPokemon = (pokemon) => {
  changeType(pokemon);

  pokemonImage.className = "";
  pokemonImage.classList.add(
    "pokemon-image",
    pokemon.name.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  );
  pokemonName.innerHTML = formatPokemonName(pokemon.name);
  pokemonLvl.innerHTML = pokemon.lvl;

  if (
    pokemon.rate.includes("One") ||
    pokemon.rate.includes("C") ||
    pokemon.rate.includes("Two")
  )
    pokemonRate.innerHTML = pokemon.rate;
  else pokemonRate.innerHTML = pokemon.rate + "%";

  pokemonPosition.innerHTML = getLocation(listCurrentPokemon.location);

  if (pokemonPosition.innerHTML === "Safari")
    pokemonPagination.style.left = "295px";
  pokemonPagination.innerHTML =
    currentPokemonKey + 1 + "/" + listCurrentPokemon.pokemon.length;
};

const togglePokedex = (zone) => {
  title.classList.toggle("activateTitle");
  isPokedexON = !isPokedexON;
  document.querySelector(`.${zone}`).classList.toggle("active");
  pokedex.classList.toggle("active");
};

const togglePower = () => {
  const led = document.querySelector("#led");
  isPowerON = !isPowerON;
  if (isPowerON) {
    led.classList.remove("led-off");
    led.classList.add("led-on");
    camera.style.display = "block";
  } else {
    led.classList.remove("led-on");
    led.classList.add("led-off");
    camera.style.display = "none";
  }
};

const moveCamera = (value) => {
  let val = 0;
  switch (value) {
    case "btn-left":
    case 37:
      val = parseInt(map.style.left, 10);
      if (!val <= 0) map.style.left = val + 20 + "px";

      break;
    case "btn-up":
    case 38:
      val = parseInt(map.style.top, 10);
      if (!val <= 0) map.style.top = val + 20 + "px";
      break;
    case "btn-right":
    case 39:
      val = parseInt(map.style.left, 10);
      map.style.left = val - 20 + "px";
      break;
    case "btn-down":
    case 40:
      val = parseInt(map.style.top, 10);
      map.style.top = val - 20 + "px";
      break;

    case "btn-b":
      if (!isFunFactON && !isPokedexON && !isStatsON) changeZone(previousZone);
      if (isPokedexON && !isStatsON) togglePokedex(currentZone);
      break;

    case "btn-funfact":
      if (!isPokedexON && !isStatsON) printFunFact("funfact-" + currentZone);
      break;

    case "btn-stats":
      if (!isPokedexON && !isFunFactON) printStats();
      break;

    default:
      break;
  }
};

document.addEventListener("keydown", (e) => {
  if (isPowerON) {
    if (currentZone !== "map") moveCamera(e.keyCode);
  }
});

buttonParent.addEventListener("click", (e) => {
  if (isPowerON) {
    if (currentZone !== "map") moveCamera(e.target.id);
  }
  if (e.target.id === "btn-power") togglePower();
});

pokedex.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "btn-pokedex-right":
      moveArray(1);
      break;
    case "btn-pokedex-left":
      moveArray(-1);
      break;
  }
});

//Clique sur les boutons dans les stats
document.querySelector("section.stats").addEventListener("click", (e) => {
  cleanCountTypes();
  if (e.target.id === "btn-stats-1") {
    if (!btnStats1.classList.contains("stats1-active")) {
      btnStats1.classList.toggle("stats1-active");
      btnStats2.classList.toggle("stats2-active");
      createGraph1();
    }
  } else if (e.target.id === "btn-stats-2") {
    if (!btnStats2.classList.contains("stats2-active")) {
      btnStats1.classList.toggle("stats1-active");
      btnStats2.classList.toggle("stats2-active");
      createGraph2();
    }
  }
});

const createGraph1 = () => {
  let listPokemon = dataJson[currentZone];

  let data = [];

  Object.entries(listPokemon).forEach((entry) => {
    const [key, value] = entry;
    if (key !== "height" && key !== "width") {
      parsePokemon(value.pokemon);
    }
  });

  Object.entries(countTypes).forEach((type) => {
    const [key, value] = type;
    if (value > 0) {
      data.push({
        group: getType(key),
        value: value,
      });
    }
  });

  update(data);
};

const createGraph2 = () => {
  let listPokemon = dataJson[currentZone];
  let data = [];

  Object.entries(listPokemon).forEach((entry) => {
    const [key, value] = entry;
    if (key !== "height" && key !== "width") {
      data.push({
        group: getLocation(key),
        value: Object.keys(value.pokemon).length,
      });
    }
  });

  update(data);
};

const parsePokemon = (listPokemon) => {
  listPokemon?.forEach((pokemon) => {
    parsePokemonTypes(pokemon.type);
  });
};

const parsePokemonTypes = (types) => {
  if (Array.isArray(types)) {
    types?.forEach((type) => {
      countTypes[type]++;
    });
  } else countTypes[types]++;
};

const cleanCountTypes = () => {
  Object.entries(countTypes).forEach((type) => {
    const [key, value] = type;
    countTypes[key] = 0;
  });
};

const update = (data) => {
  // Update the X axis
  x.domain(
    data.map(function (d) {
      return d.group;
    })
  );
  xAxis.call(d3.axisBottom(x));

  // Update the Y axis
  y.domain([
    0,
    d3.max(data, function (d) {
      return d.value;
    }),
  ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg.selectAll("rect").data(data);

  u.enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
    .attr("x", function (d) {
      return x(d.group);
    })
    .attr("y", function (d) {
      return y(d.value);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d.value);
    })
    .attr("fill", "#69b3a2");

  // If less group in the new dataset, I delete the ones not in use anymore
  u.exit().remove();
};

const test = () => {};
