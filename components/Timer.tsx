'use client';

import React, { ChangeEvent } from 'react';

interface TimerProps {
  index: number;
  inputTime: string;
  timer: number;
  onTimeChange: (index: number, value: string) => void;
  onStartTimer: (index: number) => void;
}

const Timer: React.FC<TimerProps> = ({
  index,
  inputTime,
  timer,
  onTimeChange,
  onStartTimer,
}) => {
  return (
    <div className='mt-4 flex items-center space-x-4'>
      <input
        type='number'
        min='1'
        placeholder='시간 (초)'
        value={inputTime}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onTimeChange(index, e.target.value)
        }
        className='border border-gray-300 rounded-md px-4 py-2 w-36 shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out'
      />

      <button
        onClick={() => onStartTimer(index)}
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md shadow-sm transition duration-200 ease-in-out'
      >
        타이머 시작
      </button>

      {timer > 0 && (
        <span className='text-2xl font-semibold text-red-600'>
          {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
        </span>
      )}
    </div>
  );
};

export default Timer;
