'use client';

import React, { useState, useEffect } from 'react';
import LoginPrompt from '../components/LoginPrompt';
import RecipeList from '../components/RecipeList';

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedUser');
    setIsLoggedIn(!!user);
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <RecipeList /> : <LoginPrompt />;
};

export default Home;
