import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import AppContext from "../context";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const { searchValue, setSearchValue } = React.useContext(AppContext);
  
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

    const urlMockapi = 'https://632d6dfe0d7928c7d24ae553.mockapi.io';
    
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(
      `${urlMockapi}/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoading(false);
      });
      window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const pizzas = items.filter((obj) => {
    return (
      obj.title.includes = searchValue
    )
  }).map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} categories={categories} />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">{categories[categoryId]} пиццы</h2>
      <div className="content__items">
        {loading ? skeletons : pizzas}
      </div>
    </div>
  );
};

export default Home;
