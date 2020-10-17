import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { giveMeCards } from './store/actions'
import './App.css'
import Error from './components/Error';
import Loader from './components/Loader';
import Card from './components/Card';

function App() {
  const {cards, loading, error} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(giveMeCards())
    // eslint-disable-next-line
  }, [])

  return (
    <div className='app'>
      <h1 className="title">Ты сегодня покормил кота?</h1>
      <div className="cards-wrap">
        {error && loading 
        ? <Error /> 
        : cards.length && !loading 
          ? cards.map(card => <Card card={card} key={card.title.subname} />)
          : <Loader />}
      </div>
    </div>
  );
}

export default App;
