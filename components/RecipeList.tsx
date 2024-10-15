'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getRecipes, Recipe } from '../utils/recipeStorage';

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    setUser(loggedUser);
    if (loggedUser) {
      const fetchedRecipes = getRecipes();
      setRecipes(fetchedRecipes);
    }
  }, []);

  const handleDetailClick = (recipeTitle: string) => {
    if (user) {
      router.push(`/detail/${user}/${encodeURIComponent(recipeTitle)}`);
    }
  };

  return (
    <div className='flex flex-col gap-6 p-6'>
      <h1 className='font-bold text-2xl'>레시피 목록</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {recipes.length === 0 ? (
          <p>저장된 레시피가 없습니다.</p>
        ) : (
          recipes.map((recipe, index) => (
            <div
              key={index}
              className='border p-4 rounded-md shadow-md flex flex-col gap-4'
            >
              <h2 className='text-xl font-bold'>{recipe.title}</h2>

              <div className='text-sm text-gray-500'>
                {recipe.tags.map((tag, idx) => (
                  <span key={idx} className='mr-2'>
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md'
                onClick={() => handleDetailClick(recipe.title)}
              >
                자세히 보기
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeList;
