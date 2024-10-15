'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getRecipes } from '../utils/recipeStorage';

// getRecipes 함수 import

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const user = localStorage.getItem('loggedUser'); // 사용자 ID 가져오기

  useEffect(() => {
    const recipes = getRecipes(); // 로컬 스토리지에서 레시피 목록 가져오기
    setRecipes(recipes);
  }, []);

  const handleDetailClick = (recipeTitle) => {
    router.push(`/detail/${user}/${encodeURIComponent(recipeTitle)}`);
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
              {/* 레시피 제목 */}
              <h2 className='text-xl font-bold'>{recipe.title}</h2>

              {/* 태그 목록 */}
              <div className='text-sm text-gray-500'>
                {recipe.tags.map((tag, idx) => (
                  <span key={idx} className='mr-2'>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 자세히 보기 버튼 */}
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
