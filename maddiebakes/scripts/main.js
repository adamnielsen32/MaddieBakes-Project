document.addEventListener("DOMContentLoaded", () => {
  const seasons = [
    { 
      title: "Spring Sourdough Recipes",
      url: "spring-recipies.html",
      image: "images/spring.jpg",
      season: "spring",
      description: "Fresh and floral flavors like herbs, lemons, and strawberries."
    },
    {
      title: "Summer Sourdough Recipes",
      url: "summer-recipies.html",
      image: "images/summer.jpg",
      season: "summer",
      description: "Bright, picnic-ready bakes like sourdough buns and grilled flatbreads."
    },
    {
      title: "Fall Sourdough Recipes",
      url: "fall-recipies.html",
      image: "images/fall.jpg",
      season: "fall",
      description: "Warm, hearty loaves with pumpkin, cinnamon, and apples."
    },
    {
      title: "Winter Sourdough Recipes",
      url: "winter-recipies.html",
      image: "images/winter.jpg",
      season: "winter",
      description: "Comforting holiday bakes like chocolate loaves and sourdough stuffing."
    }
  ];

  const recipeContainer = document.getElementById("recipeContainer");
  const searchInput = document.getElementById("searchInput");
  const backButton = document.getElementById("backButton"); 
  const status = document.getElementById("status");

  // Ensure the initial state is clean
  if (!window.location.search) {
    history.replaceState({}, "", "index.html");
  }

  // --- Handle initial page load based on URL ---
  function handleInitialLoad() {
    const params = new URLSearchParams(window.location.search);
    const season = params.get("season");
    if (season) {
      loadSeasonRecipes(season);
    } else {
      displaySeasons();
    }
  }

  // --- Display the main season cards ---
  function displaySeasons() {
    recipeContainer.innerHTML = "";
    if (status) status.textContent = "Showing all seasons.";
    seasons.forEach(season => {
      const card = document.createElement("div");
      card.className = "recipe-card season-card";
      // card.setAttribute("aria-label", recipe.attribute);
      card.innerHTML = `
        <img src="${season.image}" alt="${season.title}">
        <h3>${season.title}</h3>
        <p>${season.description}</p>
      `;

      
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
  function displayRecipes(recipes) {
    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      
      card.innerHTML = `
        <div class="recipe-content">
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <h3>${recipe.price}</h3>
        </div>
        <button class="addCart">Add to Cart</button>
      `;
      recipeContainer.appendChild(card);
    });

    if (backButton) backButton.style.display = "block";
    if (status) status.textContent = `${recipes.length} recipes displayed.`;
    if (recipeContainer) recipeContainer.focus();
  }

  // --- Load and display seasonal recipes from JSON ---
  function loadSeasonRecipes(season) {
    fetch(`data/${season}.json`)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${season} recipes`);
        return response.json();
      })
      .then(data => {
        displayRecipes(data.recipes);
        if (status) status.textContent = `Loaded ${data.recipes.length} recipes for ${season}.`;
        if (recipeContainer) recipeContainer.focus();
      })
      .catch(error => {
        console.error(error);
        recipeContainer.innerHTML = `<p>Error loading ${season} recipes.</p>`;
      });
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
  } else {
    // First option selected → go to home page
    window.location.href = "index.html";
  }
});

  // --- Initialize page view ---
  handleInitialLoad();
});


const form = document.getElementById("signupForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("emailInput");
const errorMessage = document.getElementById("errorMessage");
const modal = document.getElementById("emailModal");
const closeBtn = document.getElementById("closeModal");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const first = firstNameInput.value.trim();
  const last = lastNameInput.value.trim();
  const email = emailInput.value.trim();

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation: ensure all fields are filled
  if (first === "" || last === "" || email === "") {
    errorMessage.textContent = "Please fill out all fields.";
    return;
  }

  if (!emailRegex.test(email)) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  // If valid
  errorMessage.textContent = "";
  modal.style.display = "flex";
  form.reset();
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

