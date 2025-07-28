let trainers = [];
let currentIndex = 0;

async function loadTrainers() {
  const res = await fetch('data/trainers.json');
  trainers = await res.json();
  renderTrainer();
}

function renderTrainer() {
  const trainer = trainers[currentIndex];
  document.getElementById("trainer-name").textContent = trainer.name;
  document.getElementById("trainer-sprite").src = trainer.sprite;

  const teamContainer = document.getElementById("pokemon-team");
  teamContainer.innerHTML = "";

  trainer.team.forEach(pokemon => {
    const pokeDiv = document.createElement("div");
    pokeDiv.className = "pokemon";
    pokeDiv.innerHTML = `
      <img src="${pokemon.sprite}" alt="${pokemon.name}">
      <div>${pokemon.name}</div>
      <div>${pokemon.types.join(" / ")}</div>
    `;
    teamContainer.appendChild(pokeDiv);
  });
}

function nextTrainer() {
  currentIndex = (currentIndex + 1) % trainers.length;
  renderTrainer();
}

function prevTrainer() {
  currentIndex = (currentIndex - 1 + trainers.length) % trainers.length;
  renderTrainer();
}

loadTrainers();
