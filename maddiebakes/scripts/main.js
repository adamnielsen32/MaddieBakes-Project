document.addEventListener("DOMContentLoaded", () => {
  const seasons = [
    {
      title: "Spring Sourdough Recipes",
      image: "images/spring.jpg",
      season: "spring",
      description: "Fresh and floral flavors like herbs, lemons, and strawberries."
    },
    {
      title: "Summer Sourdough Recipes",
      image: "images/summer.jpg",
      season: "summer",
      description: "Bright, picnic-ready bakes like sourdough buns and grilled flatbreads."
    },
    {
      title: "Fall Sourdough Recipes",
      image: "images/fall.jpg",
      season: "fall",
      description: "Warm, hearty loaves with pumpkin, cinnamon, and apples."
    },
    {
      title: "Winter Sourdough Recipes",
      image: "images/winter.jpg",
      season: "winter",
      description: "Comforting holiday bakes like chocolate loaves and sourdough stuffing."
    }
  ];

  const recipeContainer = document.getElementById("recipeContainer");
  const searchInput = document.getElementById("searchInput");
  const backButton = document.getElementById("backButton"); // optional back button

  // Display the season cards (homepage view)
  function displaySeasons() {
    recipeContainer.innerHTML = "";
    seasons.forEach(season => {
      const card = document.createElement("div");
      card.className = "recipe-card season-card";
      card.innerHTML = `
        <img src="${season.image}" alt="${season.title}">
        <h3>${season.title}</h3>
        <p>${season.description}</p>
      `;
      card.addEventListener("click", () => loadSeasonRecipes(season.season));
      recipeContainer.appendChild(card);
    });
  }

  // Display recipes for a selected season
  function displayRecipes(recipes) {
    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
      `;
      recipeContainer.appendChild(card);
    });

    // Add a back button to return to the main seasons view
    if (backButton) backButton.style.display = "block";
  }

  // Fetch and display seasonal recipes
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

  // Back button functionality
  if (backButton) {
    backButton.addEventListener("click", () => {
      backButton.style.display = "none";
      displaySeasons();
    });
  }

  // Search functionality (optional)
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    // Search through visible cards
    const cards = document.querySelectorAll(".recipe-card");
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(searchTerm) ? "" : "none";
    });
  });

  // Show the main page (seasons) on load
  displaySeasons();
});
