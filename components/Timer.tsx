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
    <div className='mt-2 flex items-center space-x-2'>
      <input
        type='number'
        min='1'
        placeholder='시간 (초)'
        value={inputTime}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onTimeChange(index, e.target.value)
        }
        className='border rounded px-2 py-1 w-32'
      />
      <button
        onClick={() => onStartTimer(index)}
        className='bg-slate-500 text-white px-4 py-1 rounded'
      >
        타이머 시작
      </button>
      {timer > 0 && (
        <span className='text-red-500'>
          {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
        </span>
      )}
    </div>
  );
};

export default Timer;
