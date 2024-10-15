'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import InputField from '../../components/InputField';
import { saveRecipe } from '../../utils/recipeStorage';

export default function Add() {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [step, setStep] = useState('');

  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  const router = useRouter();

  const handleAddTag = () => {
    if (tag.trim()) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const handleAddStep = () => {
    if (step.trim()) {
      setSteps([...steps, step]);
      setStep('');
    }
  };

  const handleSubmit = (e) => {
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

    const newRecipe = {
      title,
      tags,
      ingredients,
      steps,
    };

    saveRecipe(newRecipe);

    router.push('/');
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
          onChange={(e) => setTitle(e.target.value)}
          showButton={false}
        ></InputField>

        <InputField
          htmlFor='tag'
          type='text'
          label='태그'
          placeholder='태그를 입력하세요'
          required={false}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          showButton={true}
          onAdd={handleAddTag}
        ></InputField>
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
          onChange={(e) => setIngredient(e.target.value)}
          showButton={true}
          onAdd={handleAddIngredient}
        ></InputField>
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
          onChange={(e) => setStep(e.target.value)}
          onAdd={handleAddStep}
          showButton={true}
        ></InputField>
        {steps.length > 0 && (
          <div>
            <ul className='list-disc pl-5'>
              {steps.map((t, index) => (
                <li key={index}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          type='submit'
          className='bg-slate-500 text-left w-fit px-4 py-2 rounded-md text-white'
        >
          레시피 저장
        </button>
      </form>
    </div>
  );
}
