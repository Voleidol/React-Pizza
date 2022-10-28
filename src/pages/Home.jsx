import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/indes";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import AppContext from "../context";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const sortType = sort.sortProperty;

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const { searchValue } = React.useContext(AppContext);
  
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
    
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    const pageNumber = `page=${currentPage}&limit=4`;

    // fetch(
    //   `${urlMockapi}/items?${pageNumber}&${category}&sortBy=${sortBy}&order=${order}&${search}`
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setItems(json);
    //     setLoading(false);
    //   });

      axios.get(
        `${urlMockapi}/items?${pageNumber}&${category}&sortBy=${sortBy}&order=${order}&${search}`
      ).then(res => {
        setItems(res.data);
        setLoading(false);
      });
      
      window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  // const pizzas = items.filter((obj) => { подходит для статичного массива!!
  //   if(obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //     return true
  //   }
  //   return false
  // }).map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onClickCategory} categories={categories} />
        <Sort />
      </div>
      <h2 className="content__title">{categories[categoryId]} пиццы</h2>
      <div className="content__items">
        {loading ? skeletons : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  );
};

export default Home;
