'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import InputField from '../../components/InputField';
import { saveRecipe } from '../../utils/recipeStorage';
import { Recipe } from '../../utils/recipeStorage';

export default function Add() {
  const [title, setTitle] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [ingredient, setIngredient] = useState<string>('');
  const [step, setStep] = useState<string>('');

  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const router = useRouter();

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

    const newRecipe: Recipe = {
      title: title.trim(),
      tags,
      ingredients,
      steps,
    };

    saveRecipe(newRecipe);

    router.push('/');
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

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    console.log('tags', tags);
  }, [tags]);

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='font-bold text-2xl'>새 레시피 추가</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
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
          <div>
            <ul className='list-disc pl-5'>
              {tags.map((t, index) => (
                <li key={index}>{t}</li>
              ))}
            </ul>
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
            <ul className='list-disc pl-5'>
              {ingredients.map((t, index) => (
                <li key={index}>{t}</li>
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
          onAdd={handleAddStep}
          showButton={true}
        />
        {steps.length > 0 && (
          <div>
            <ol className='list-decimal pl-5'>
              {steps.map((t, index) => (
                <li key={index}>{t}</li>
              ))}
            </ol>
          </div>
        )}

        <button
          type='submit'
          className='mt-3 bg-slate-500 w-fit px-6 py-2 rounded-md text-white'
        >
          레시피 저장
        </button>
      </form>
    </div>
  );
}
