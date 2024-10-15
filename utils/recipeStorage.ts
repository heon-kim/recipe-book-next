interface Recipe {
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
}

const getRecipes = (): Recipe[] => {
  const user = localStorage.getItem('loggedUser');
  const recipes = localStorage.getItem(`recipes-${user}`);
  return recipes ? JSON.parse(recipes) : [];
};

const saveRecipe = (recipe: Recipe) => {
  const user = localStorage.getItem('loggedUser');
  const recipes = getRecipes();
  if (recipes.filter((u) => u.title == recipe.title).length < 1) {
    recipes.push(recipe);
  }
  localStorage.setItem(`recipes-${user}`, JSON.stringify(recipes));
};

const findRecipe = (title: string) => {
  const recipes = getRecipes();
  return recipes.find((recipe) => recipe.title === title);
};

export { getRecipes, saveRecipe, findRecipe };
