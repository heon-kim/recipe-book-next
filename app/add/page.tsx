'use client';

import React from 'react';
import { useState } from 'react';
import InputField from '../../components/InputField';

export default function Add() {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [step, setStep] = useState('');

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='font-bold text-2xl'>새 레시피 추가</h1>
      <form action='' className='flex flex-col gap-3'>
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
          required={true}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          showButton={true}
        ></InputField>

        <InputField
          htmlFor='ingredient'
          type='text'
          label='재료 목록'
          placeholder='재료를 입력하세요'
          required={true}
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          showButton={true}
        ></InputField>

        <InputField
          htmlFor='step'
          type='text'
          label='조리 과정'
          placeholder='조리 과정을 입력하세요'
          required={true}
          value={step}
          onChange={(e) => setStep(e.target.value)}
          showButton={true}
        ></InputField>

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
