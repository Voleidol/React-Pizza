import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);
  
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые"
  ];

  React.useEffect(() => {
    setLoading(true);
    fetch(categoryId ? `https://632d6dfe0d7928c7d24ae553.mockapi.io/items?category=${categoryId}` : `https://632d6dfe0d7928c7d24ae553.mockapi.io/items`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
      window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} categories={categories} />
        <Sort sortValue={sortType} onChangeSort={(id) => setSortType(id)}/>
      </div>
      <h2 className="content__title">{categories[categoryId]} пиццы</h2>
      <div className="content__items">
        {loading
          ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
