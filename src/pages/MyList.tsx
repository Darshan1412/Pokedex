import React from 'react'
import Wrapper from '../sections/Wrapper'
import { useAppSelector } from '../app/hooks';
import Login from '../components/Login';

function MyList() {
  const { userInfo } = useAppSelector(({ app }) => app);

  return <div className="list">
    <Login />
  </div>

}

export default Wrapper(MyList);