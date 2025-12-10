// import { handleInitialLoad } from "./pageLoad.js";
import { displaySeasons, displayRecipes, loadSeasonRecipes } from "./recipeLoad.js";
import { seasons } from "./seaons.js";

export function handleInitialLoad() {
  const params = new URLSearchParams(window.location.search);
  const season = params.get("season");
  if (season) {
    loadSeasonRecipes(season);
  } else {
    displaySeasons();
  }
}

document.addEventListener("DOMContentLoaded", () => {


  const backButton = document.getElementById("backButton"); // optional back button


  // Ensure the initial state is clean
  if (!window.location.search) {
    history.replaceState({}, "", "index.html");
  }

  // --- Handle browser back/forward buttons ---
  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(window.location.search);
    const season = params.get("season");

    if (season) {
      loadSeasonRecipes(season);
    } else {
      displaySeasons();
      if (backButton) backButton.style.display = "none";
    }
  });

  // --- Optional back button (on-screen) ---
  if (backButton) {
    backButton.addEventListener("click", () => {
      history.pushState({}, "", "index.html");
      displaySeasons();
      backButton.style.display = "none";
    });
  }

  // --- Dropdown Menu Selection ---
  const seasonSelect = document.getElementById("seasonSelect");

seasonSelect.addEventListener("change", () => {
  const chosenSeason = seasonSelect.value;

  if (chosenSeason) {
    // Update the URL
    history.pushState({ season: chosenSeason }, "", `?season=${chosenSeason}`);

    // Load the recipes
    loadSeasonRecipes(chosenSeason);
  }
});



  // --- Initialize page view ---
  function init() {
    handleInitialLoad();
  }

  init();
});