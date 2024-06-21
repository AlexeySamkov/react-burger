import React from 'react';
import stylesIngredients from './Ingredients.module.css'; 

const Ingredients = (props) => {

    // Фильтруем данные, выбирая только элементы с type "main"
 const main = props.data.filter(item => item.type === 'main');

   return (
    <div>
      <h2>Ингредиенты</h2>
       <div className={stylesIngredients.mainContainer}>        
       {main.map((item) => (
       <div key={item._id} className={stylesIngredients.mainItem}>         
         <img src={item.image} alt={item.name} />

         <p>{item.name}</p>         
       </div>
         ))}
       </div>
    </div>
   );
};

export default Ingredients;