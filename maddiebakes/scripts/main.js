document.addEventListener("DOMContentLoaded", () => {
  const recipes = [
    {
      title: "Spring Sourdough Recipes",
      image: "images/spring.jpg",
      description: "Fresh and floral flavors like herbs, lemons, and strawberries."
    },
    {
      title: "Summer Sourdough Recipes",
      image: "images/summer.jpg",
      description: "Bright, picnic-ready bakes like sourdough buns and grilled flatbreads."
    },
    {
      title: "Fall Sourdough Recipes",
      image: "images/fall.jpg",
      description: "Warm, hearty loaves with pumpkin, cinnamon, and apples."
    },
    {
      title: "Winter Sourdough Recipes",
      image: "images/winter.jpg",
      description: "Comforting holiday bakes like chocolate loaves and sourdough stuffing."
    }
  ];

  const recipeContainer = document.getElementById("recipeContainer");
  const searchInput = document.getElementById("searchInput");

  function displayRecipes(filteredRecipes) {
    recipeContainer.innerHTML = "";

    if (filteredRecipes.length === 0) {
      recipeContainer.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    filteredRecipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
      `;
      recipeContainer.appendChild(card);
    });
  }

  displayRecipes(recipes);

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm)
    );
    displayRecipes(filtered);
  });
});

