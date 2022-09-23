import React from 'react';
import Skeleton from './components/PizzaBlock/Skeleton';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://632d6dfe0d7928c7d24ae553.mockapi.io/items")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              loading ? [...Array(6)].map((_, index) => <Skeleton  key={index}/>) :
              items.map((obj) =>
                <PizzaBlock key={obj.id} {...obj} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;