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
      router.push(`/detail?recipeTitle=${encodeURIComponent(recipeTitle)}`);
    }
  };

  return (
    <div className='flex flex-col gap-8 p-8 max-w-7xl mx-auto'>
      <h1 className='font-extrabold text-3xl text-gray-800 tracking-wide'>
        레시피 목록
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {recipes.length === 0 ? (
          <p className='text-gray-500 text-lg'>저장된 레시피가 없습니다.</p>
        ) : (
          recipes.map((recipe, index) => (
            <div
              key={index}
              className='border border-gray-200 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'
            >
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                {recipe.title}
              </h2>

              <div className='text-sm text-gray-500 mb-6'>
                {recipe.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className='bg-blue-50 text-blue-600 px-2 py-1 rounded-full mr-2'
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200 ease-in-out shadow-sm'
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
