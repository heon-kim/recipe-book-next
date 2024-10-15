'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getRecipes } from '../utils/recipeStorage';

interface Recipe {
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();
  const user =
    typeof window !== 'undefined' ? localStorage.getItem('loggedUser') : '';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recipes = getRecipes();
      setRecipes(recipes);
    }
  }, []);

  const handleDetailClick = (recipeTitle: string) => {
    if (user) {
      router.push(`/detail/${user}/${encodeURIComponent(recipeTitle)}`);
    } else {
      alert('로그인한 사용자만 레시피를 볼 수 있습니다.');
    }
  };

  return (
    <div className='flex flex-col gap-6'>
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
}
