'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import InputField from '../../components/InputField';
import { saveRecipe, findRecipe, Recipe } from '../../utils/recipeStorage';

const EditRecipe: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const recipeTitle = searchParams.get('recipeTitle') || '';
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('loggedUser') : null;

  const [title, setTitle] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [ingredient, setIngredient] = useState<string>('');
  const [step, setStep] = useState<string>('');

  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    if (typeof userId === 'string' && typeof recipeTitle === 'string') {
      const fetchedRecipe = findRecipe(decodeURIComponent(recipeTitle));
      if (fetchedRecipe) {
        setTitle(fetchedRecipe.title);
        setTags(fetchedRecipe.tags);
        setIngredients(fetchedRecipe.ingredients);
        setSteps(fetchedRecipe.steps);
      } else {
        alert('레시피를 찾을 수 없습니다.');
        router.push('/');
      }
    }
  }, [userId, recipeTitle, router]);

  const handleAddTag = () => {
    if (tag.trim()) {
      setTags((prevTags) => [...prevTags, tag.trim()]);
      setTag('');
    }
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        ingredient.trim(),
      ]);
      setIngredient('');
    }
  };

  const handleAddStep = () => {
    if (step.trim()) {
      setSteps((prevSteps) => [...prevSteps, step.trim()]);
      setStep('');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('레시피 제목을 입력하세요.');
      return;
    }

    if (tags.length === 0) {
      alert('태그를 하나 이상 추가하세요.');
      return;
    }

    if (ingredients.length === 0) {
      alert('재료를 하나 이상 추가하세요.');
      return;
    }

    if (steps.length === 0) {
      alert('조리 과정을 하나 이상 추가하세요.');
      return;
    }

    const updatedRecipe: Recipe = {
      title: title.trim(),
      tags,
      ingredients,
      steps,
      history: [],
    };

    saveRecipe(updatedRecipe);

    router.push(
      `/detail?recipeTitle=${encodeURIComponent(updatedRecipe.title)}`
    );
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleIngredientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  const handleStepChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStep(e.target.value);
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='font-bold text-2xl'>레시피 수정</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <InputField
          htmlFor='title'
          type='text'
          label='레시피 제목'
          placeholder='레시피 제목을 입력하세요'
          required={true}
          value={title}
          onChange={handleTitleChange}
          showButton={false}
        />

        <InputField
          htmlFor='tag'
          type='text'
          label='태그'
          placeholder='태그를 입력하세요'
          required={false}
          value={tag}
          onChange={handleTagChange}
          showButton={true}
          onAdd={handleAddTag}
        />
        {tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag, index) => (
              <div key={index}>
                <span className='text-sm text-blue-500'>#{tag}</span>
                <button
                  type='button'
                  onClick={() => handleRemoveTag(index)}
                  className='ml-1 text-red-500'
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}

        <InputField
          htmlFor='ingredient'
          type='text'
          label='재료 목록'
          placeholder='재료를 입력하세요'
          required={false}
          value={ingredient}
          onChange={handleIngredientChange}
          showButton={true}
          onAdd={handleAddIngredient}
        />
        {ingredients.length > 0 && (
          <div>
            <ul className='list-disc list-inside'>
              {ingredients.map((ing, index) => (
                <li key={index}>
                  <span>{ing}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveIngredient(index)}
                    className='ml-2 text-red-500'
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <InputField
          htmlFor='step'
          type='text'
          label='조리 과정'
          placeholder='조리 과정을 입력하세요'
          required={false}
          value={step}
          onChange={handleStepChange}
          showButton={true}
          onAdd={handleAddStep}
        />
        {steps.length > 0 && (
          <div>
            <ol className='list-decimal list-inside'>
              {steps.map((st, index) => (
                <li key={index}>
                  <span>{st}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveStep(index)}
                    className='ml-2 text-red-500'
                  >
                    X
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}

        <button
          type='submit'
          className='mt-3 bg-blue-500 w-fit px-6 py-2 rounded-md text-white'
        >
          레시피 수정
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
