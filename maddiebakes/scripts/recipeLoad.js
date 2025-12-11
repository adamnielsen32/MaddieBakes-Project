import { handleInitialLoad } from "./main.mjs";
import { seasons } from "./seaons.js";

const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const backButton = document.getElementById("backButton"); // optional back button

 
 // --- Display the main season cards ---
  export function displaySeasons() {
    recipeContainer.innerHTML = "";
    seasons.forEach(season => {
      const card = document.createElement("div");
      card.className = "recipe-card season-card";
      // card.setAttribute("aria-label", recipe.attribute);
      card.innerHTML = `
        <img src="${season.image}" alt="${season.title}">
        <h3>${season.title}</h3>
        <p>${season.description}</p>
      `;

      // ✅ Only push a new history entry if we're switching to a new season
      card.addEventListener("click", () => {
        const currentParams = new URLSearchParams(window.location.search);
        const currentSeason = currentParams.get("season");

        if (currentSeason !== season.season) {
          history.pushState({ season: season.season }, "", `?season=${season.season}`);
        }

        loadSeasonRecipes(season.season);
      });

      recipeContainer.appendChild(card);
    });

    // Hide the back button when showing main grid
    if (backButton) backButton.style.display = "none";
  }

  // --- Display recipes for a selected season ---
  export function displayRecipes(recipes) {
    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <p class="price">${recipe.price}</p>
      </a>
      <button class="addCart">Add to Cart</button>
      `;
      recipeContainer.appendChild(card);
    });

    if (backButton) backButton.style.display = "block";
  }

  // --- Load and display seasonal recipes from JSON ---
  export function loadSeasonRecipes(season) {
    fetch(`data/${season}.json`)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${season} recipes`);
        return response.json();
      })
      .then(data => {
        displayRecipes(data.recipes);
      })
      .catch(error => {
        console.error(error);
        recipeContainer.innerHTML = `<p>Error loading ${season} recipes.</p>`;
      });
  }