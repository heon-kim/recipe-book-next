'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Timer from '../../components/Timer';
import {
  findRecipe,
  Recipe,
  saveRecipe,
  deleteRecipe,
} from '../../utils/recipeStorage';

interface Modification {
  version: number;
  date: string;
  recipe: Recipe;
}

const Detail: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const recipeTitle = searchParams.get('recipeTitle') || '';
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('loggedUser') : null;

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
        const currentTime = prev[index];
        const newTime = currentTime - 1;
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
      setRecipe(findRecipe(recipeTitle) || null);
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
    router.push(`/edit?recipeTitle=${encodeURIComponent(recipeTitle)}`);
  };

  const handleBack = () => {
    router.push('/');
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gray-50 p-8 rounded-lg shadow-xl max-w-7xl mx-auto'>
      <h1 className='text-3xl font-extrabold text-gray-800 mb-6 tracking-wide'>
        {recipe.title}
      </h1>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>조리 과정</h2>
        <ol className='list-decimal list-inside space-y-6 text-lg'>
          {recipe.steps.map((step, index) => (
            <li
              key={index}
              className='flex flex-col bg-white p-4 rounded-lg shadow-sm'
            >
              <span>{step}</span>
              <Timer
                index={index}
                inputTime={inputTimes[index] || ''}
                timer={timers[index] || 0}
                onTimeChange={handleTimeChange}
                onStartTimer={handleStartTimer}
              />
            </li>
          ))}
        </ol>
      </div>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>태그</h2>
        <div className='flex flex-wrap gap-3'>
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className='bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full'
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>재료 목록</h2>
        <ul className='list-disc list-inside space-y-2 text-lg'>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className='bg-gray-100 p-2 rounded-md'>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>조리 과정</h2>
        <ol className='list-decimal list-inside space-y-2 text-lg'>
          {recipe.steps.map((step, index) => (
            <li key={index} className='bg-gray-100 p-2 rounded-md'>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>수정 기록</h2>
        {!recipe.history || recipe.history.length === 0 ? (
          <p className='text-gray-500'>수정 기록이 없습니다.</p>
        ) : (
          <ul className='space-y-4'>
            {recipe.history?.map((mod, index) => (
              <li
                key={index}
                className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm'
              >
                <span className='text-gray-600'>
                  버전 {mod.version} (수정일:{' '}
                  {new Date(mod.date).toLocaleString()})
                </span>
                <button
                  onClick={() => handleRestore(mod)}
                  className='bg-slate-500 hover:bg-slate-600 text-white px-3 py-1 rounded transition duration-200 ease-in-out'
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
          className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition duration-200 ease-in-out shadow-md'
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition duration-200 ease-in-out shadow-md'
        >
          삭제
        </button>
        <button
          onClick={handleBack}
          className='bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-md transition duration-200 ease-in-out shadow-md'
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default Detail;
