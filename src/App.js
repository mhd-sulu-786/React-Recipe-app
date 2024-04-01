import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import RecipeCard from './Components/Content/Card'; // Import RecipeCard component
import { Row } from 'react-bootstrap';
import Cards from './Components/Content/Cards'

function App() {
  const [datas, setDatas] = useState(null);
  const [error, setError] = useState(null);
  const [click, setClick] = useState({
    key: '',
    clicked: false
  });
  const [input, setInput] = useState({
    key: '',
    clicked: false
  });

  useEffect(() => {
    if (!click.clicked) {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
        .then(res => res.json())
        .then(data => setDatas(data))
        .catch(err => {
          console.log(err);
          setError(err)
        });
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${click.key}`)
        .then(res => res.json())
        .then(data =>{
          setInput({
            clicked: false
          });
          setDatas(data)
        })
        .catch(error => setError(error));
    }
  }, [click]);

  const handleCategoryClick = category => {
    setInput({
      clicked: false
    });
    setClick({ key: category, clicked: true });
  };

  const search = (data) => {
    if (!data) return;

    const endpoints = {
      'Category': `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`,
      'Name': `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`,
      'First Letter': `https://www.themealdb.com/api/json/v1/1/search.php?f=${data[0] || 'a'}`,
      'Ingredient': `https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`,
      'Area': `https://www.themealdb.com/api/json/v1/1/filter.php?a=${data}`,
    };

    fetch(endpoints[data] || endpoints['First Letter']) // Default to first letter search if data doesn't match any endpoint
      .then(res => res.json())
      .then(data => {
        setInput({
          clicked: false
        });
        setDatas(data);
        console.log(data);
       
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleCardClick = (idMeal) => {
    setInput({
      key: idMeal,
      clicked: true
    });
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((res) => res.json())
      .then((data) => setDatas(data))
      .catch((error) => setError(error))
  }

  return (
    <div className="App">
      <Navbar handleCategoryClick={handleCategoryClick} search={search} />
      {input.clicked ? (
        datas && datas.meals && datas.meals.length > 0 ? (
          <RecipeCard
            key={datas.meals[0].idMeal}
            idMeal={datas.meals[0].idMeal}
            strMeal={datas.meals[0].strMeal}
            strCategory={datas.meals[0].strCategory}
            strMealThumb={datas.meals[0].strMealThumb}
            strYoutube={datas.meals[0].strYoutube}
            strInstructions={datas.meals[0].strInstructions}
            handleCardClick={handleCardClick}
          />
        ) : (
          <p>No meal data available</p>
        )
      ) : (
        <Row className='row d-flex flex-wrap justify-content-start p-0 m-0' id='main' style={{ width: '100%' }}>
          {datas && datas.meals && datas.meals.map(item => (
            <Cards
              key={item.idMeal}
              idMeal={item.idMeal}
              strMeal={item.strMeal}
              strCategory={item.strCategory}
              strMealThumb={item.strMealThumb}
              strYoutube={item.strYoutube}
              strInstructions={item.strInstructions}
              handleCardClick={handleCardClick}
            />
          ))}
        </Row>

      )}
      {error && <p style={{ color: 'red' }}>wrong try again or correct your spelling </p>}
    </div>
  );
}

export default App;
