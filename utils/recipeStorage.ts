export interface Recipe {
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  history?: RecipeHistory[];
}

export interface RecipeHistory {
  version: number;
  date: string;
  recipe: Omit<Recipe, 'history'>;
}

const getRecipes = (): Recipe[] => {
  const user = localStorage.getItem('loggedUser');
  if (!user) {
    return [];
  }
  const recipes = localStorage.getItem(`recipes-${user}`);
  return recipes ? JSON.parse(recipes) : [];
};

const saveRecipe = (recipe: Recipe) => {
  const user = localStorage.getItem('loggedUser');
  if (!user) {
    throw new Error('사용자가 로그인되지 않았습니다.');
  }

  const recipes = getRecipes();
  const existingRecipeIndex = recipes.findIndex(
    (u) => u.title === recipe.title
  );

  if (existingRecipeIndex !== -1) {
    const existingRecipe = recipes[existingRecipeIndex];
    if (!existingRecipe.history) {
      existingRecipe.history = [];
    }
    const newHistory: RecipeHistory = {
      version: existingRecipe.history.length + 1,
      date: new Date().toISOString(),
      recipe: {
        title: existingRecipe.title,
        tags: [...existingRecipe.tags],
        ingredients: [...existingRecipe.ingredients],
        steps: [...existingRecipe.steps],
      },
    };
    existingRecipe.history.push(newHistory);
    recipes[existingRecipeIndex] = {
      ...recipe,
      history: existingRecipe.history,
    };
  } else {
    recipes.push({ ...recipe, history: [] });
  }

  localStorage.setItem(`recipes-${user}`, JSON.stringify(recipes));
};

const findRecipe = (title: string): Recipe | undefined => {
  const recipes = getRecipes();
  return recipes.find((recipe) => recipe.title === title);
};

const deleteRecipe = (title: string) => {
  const user = localStorage.getItem('loggedUser');
  if (!user) {
    throw new Error('사용자가 로그인되지 않았습니다.');
  }
  let recipes = getRecipes();
  recipes = recipes.filter((recipe) => recipe.title !== title);
  localStorage.setItem(`recipes-${user}`, JSON.stringify(recipes));
};

export { getRecipes, saveRecipe, findRecipe, deleteRecipe };
