import React from 'react';

function Categories() {

  const [activeindex, setActiveIndex] = React.useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые"
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => {
          return (
            <li
              onClick={() => onClickCategory(i)}
              className={activeindex === i ? "active" : ""}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
