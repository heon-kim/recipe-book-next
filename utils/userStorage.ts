interface User {
  email: string;
  password: string;
}

const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const saveUser = (user: User) => {
  const users = getUsers();
  if (users.filter((u) => u.email == user.email).length < 1) {
    users.push(user);
  }
  localStorage.setItem('users', JSON.stringify(users));
};

const findUser = (email: string) => {
  const users = getUsers();
  return users.find((user) => user.email === email);
};

export { getUsers, saveUser, findUser };
