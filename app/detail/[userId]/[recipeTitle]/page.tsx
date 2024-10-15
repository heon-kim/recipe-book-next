'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  findRecipe,
  Recipe,
  saveRecipe,
  deleteRecipe,
} from '@/utils/recipeStorage';

interface Modification {
  version: number;
  date: string;
  recipe: Recipe;
}

const Detail: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname?.split('/') || [];
  const userId = pathSegments[2];
  const recipeTitle = decodeURIComponent(pathSegments[3] || '');

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [timers, setTimers] = useState<{ [key: number]: number }>({});
  const [inputTimes, setInputTimes] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (userId && recipeTitle) {
      const fetchedRecipe = findRecipe(recipeTitle);
      if (fetchedRecipe) {
        setRecipe(fetchedRecipe);
      } else {
        alert('레시피를 찾을 수 없습니다.');
        router.push('/');
      }
    }
  }, [userId, recipeTitle, router]);

  const handleTimeChange = (index: number, value: string) => {
    setInputTimes((prev) => ({ ...prev, [index]: value }));
  };

  const handleStartTimer = (index: number) => {
    const time = parseInt(inputTimes[index], 10);
    if (isNaN(time) || time <= 0) {
      alert('유효한 시간을 입력하세요.');
      return;
    }

    setTimers((prev) => ({ ...prev, [index]: time }));

    const interval = setInterval(() => {
      setTimers((prev) => {
        const newTime = prev[index] - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          alert(`"${recipe?.steps[index]}" 타이머가 완료되었습니다.`);
          return { ...prev, [index]: 0 };
        }
        return { ...prev, [index]: newTime };
      });
    }, 1000);
  };

  const handleRestore = (modification: Modification) => {
    if (window.confirm(`버전 ${modification.version}로 복원하시겠습니까?`)) {
      saveRecipe(modification.recipe);
      setRecipe(findRecipe(recipeTitle));
      alert('레시피가 복원되었습니다.');
    }
  };

  const handleDelete = () => {
    if (window.confirm('레시피를 삭제하시겠습니까?')) {
      deleteRecipe(recipeTitle);
      alert('레시피가 삭제되었습니다.');
      router.push('/');
    }
  };

  const handleEdit = () => {
    router.push(`/edit/${userId}/${encodeURIComponent(recipeTitle)}`);
  };

  const handleBack = () => {
    router.push('/');
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>{recipe.title}</h1>

      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-2'>조리 과정</h2>
        <ol className='list-decimal list-inside space-y-4'>
          {recipe.steps.map((step, index) => (
            <li key={index} className='flex flex-col'>
              <span>{step}</span>
              <div className='mt-2 flex items-center space-x-2'>
                <input
                  type='number'
                  min='1'
                  placeholder='시간 (초)'
                  value={inputTimes[index] || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleTimeChange(index, e.target.value)
                  }
                  className='border rounded px-2 py-1 w-32'
                />
                <button
                  onClick={() => handleStartTimer(index)}
                  className='bg-slate-500 text-white px-4 py-1 rounded'
                >
                  타이머 시작
                </button>
                {timers[index] > 0 && (
                  <span className='text-red-500'>
                    {new Date(timers[index] * 1000).toISOString().substr(14, 5)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-2'>태그</h2>
        <div className='flex flex-wrap gap-2'>
          {recipe.tags.map((tag, index) => (
            <span key={index} className='text-sm text-blue-500'>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-2'>재료 목록</h2>
        <ul className='list-disc list-inside'>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-2'>조리 과정</h2>
        <ol className='list-decimal list-inside space-y-2'>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-2'>수정 기록</h2>
        {!recipe.history || recipe.history.length === 0 ? (
          <p>수정 기록이 없습니다.</p>
        ) : (
          <ul className='space-y-2'>
            {recipe.history?.map((mod, index) => (
              <li key={index} className='flex items-center justify-between'>
                <span>
                  버전 {mod.version} (수정일:{' '}
                  {new Date(mod.date).toLocaleString()})
                </span>
                <button
                  onClick={() => handleRestore(mod)}
                  className='bg-slate-500 text-white px-3 py-1 rounded'
                >
                  이 버전으로 복원
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='flex space-x-4'>
        <button
          onClick={handleEdit}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className='bg-slate-700 text-white px-4 py-2 rounded'
        >
          삭제
        </button>
        <button
          onClick={handleBack}
          className='bg-slate-500 text-white px-4 py-2 rounded'
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default Detail;
