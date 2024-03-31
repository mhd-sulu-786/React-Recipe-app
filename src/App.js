// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Cards from './Components/Content/Cards';
import { Row } from 'react-bootstrap';

function App() {
    const [datas, setDatas] = useState(null);
    const [error, setError] = useState(null);
    const [click, setClick] = useState({
        key: '',
        clicked: false
    });
  //   const [input, setInput] = useState({
  //     key: '',
  //     clicked: false
  // });

    useEffect(() => {
        if (!click.clicked) {
            fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
                .then(res => res.json())
                .then(data => setDatas(data))
                .catch(err => {
                  console.log(err);
                  setError(err)
                });
        }  else {
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${click.key}`)
                .then(res => res.json())
                .then(data => setDatas(data))
                .catch(error => setError(error));
        }
    }, [click]);

    const handleCategoryClick = category => {
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
          setDatas(data);
          console.log(data);
        })
        .catch(error => {
          setError(error);
        });
    };
    

   

    return (
        <div className="App">
            
              <Navbar handleCategoryClick={handleCategoryClick} search={search}  />
              <Row className='row d-flex wrap-nowrap p-0 m-0' style={{ width: '100%' }}>

            {datas && datas.meals && datas.meals.map(item => (
                <Cards 
                    key={item.idMeal}  
                    strMeal={item.strMeal} 
                    strCategory={item.strCategory} 
                    strMealThumb={item.strMealThumb}
                    strYoutube={item.strYoutube} 
                    strInstructions={item.strInstructions}
                />
            ))}
            </Row>
            {error && <p style={{ color: 'red' }}>wrong try again or correct your spelling </p>}

        </div>
    );
}

export default App;
