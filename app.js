import * as d3 from "d3";

import dataJson from "./data/data.json" assert { type: "json" };

let map = document.querySelector(".active");
const buttonParent = document.querySelector("#buttonParent");

let pokeballsActive = document.querySelectorAll(".pokeballs");
let zones = document.querySelectorAll(".zones");

const pokedex = document.querySelector("section.pokedex");

const camera = document.querySelector(".camera");

const pokemonImage = document.querySelector("#pokemon-image");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonLvl = document.querySelector("#pokemon-lvl");
const pokemonRate = document.querySelector("#pokemon-rate");
const pokemonPosition = document.querySelector("#pokemon-position");
const pokemonPagination = document.querySelector("#pokemon-pagination");

let listCurrentPokemon = [];
let currentPokemonKey = 0;

let currentZone = "map";
let previousZone = "";

let isFunFactON = false;
let isPokedexON = false;
let isStatsON = false;
let isPowerON = true;

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
};

const changeZone = (newZone) => {
  document.querySelector(`.${newZone}`).classList.add("active");
  document.querySelector(`.${newZone}`).style.left = "0px";
  document.querySelector(`.${newZone}`).style.top = "0px";
  document.querySelector(`.${currentZone}`).classList.remove("active");

  previousZone = currentZone;
  currentZone = newZone;

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
  isFunFactON = !isFunFactON;
  document.querySelector(`.${currentZone}`).classList.toggle("active");
  const funfact = document.querySelector("section.funfact");

  funfact.classList.toggle(name);
  funfact.classList.toggle("active");
};

const printStats = () => {
  isStatsON = !isStatsON;
  document.querySelector(`.${currentZone}`).classList.toggle("active");

  const stats = document.querySelector("section.stats");

  stats.classList.toggle("active");
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

const printPokemon = (pokemon) => {
  pokemonImage.className = "";
  pokemonImage.classList.add(
    "pokemon-image",
    pokemon.name.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  );

  pokemonName.innerHTML = pokemon.name;
  pokemonLvl.innerHTML = pokemon.lvl;
  pokemonRate.innerHTML = pokemon.rate + "%";
  pokemonPosition.innerHTML = getLocation(listCurrentPokemon.location);
  pokemonPagination.innerHTML =
    currentPokemonKey + 1 + "/" + listCurrentPokemon.pokemon.length;
};

const togglePokedex = (zone) => {
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
  console.log(value);
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
      printFunFact("funfact-" + currentZone);
      break;

    case "btn-stats":
      printStats();
      break;

    default:
      break;
  }
};

document.addEventListener("keydown", (e) => {
  console.log(isPowerON);
  if (isPowerON) {
    if (currentZone !== "map") moveCamera(e.keyCode);
  }
});

buttonParent.addEventListener("click", (e) => {
  console.log(isPowerON);
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
