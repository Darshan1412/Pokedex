import React, { useEffect } from 'react'
import Wrapper from '../sections/Wrapper'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Login from '../components/Login';
import PokemonCardGrid from '../components/PokemonCardGrid';
import { getUserPokemons } from '../app/reducers/getUserPokemons';

function MyList() {
  const { userInfo } = useAppSelector(({ app }) => app);
  const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getUserPokemons());
  },[userInfo, dispatch]);

  useEffect(()=> {
    console.log({ userPokemons });
  }, [userPokemons]);

  return <div className="list">
      {userInfo ? <PokemonCardGrid pokemons={userPokemons}/> : <Login />}
  </div>

}

export default Wrapper(MyList);