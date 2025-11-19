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
  const backButton = document.getElementById("backButton"); // optional back button

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
  function displayRecipes(recipes) {
    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
      <a href="${recipe.url}">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
      </a>
      <button class="addCart">Add to Cart</button>
      `;
      recipeContainer.appendChild(card);
    });

    if (backButton) backButton.style.display = "block";
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

  // --- Search functionality ---
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".recipe-card");
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(searchTerm) ? "" : "none";
    });
  });

  // --- Initialize page view ---
  handleInitialLoad();
});
