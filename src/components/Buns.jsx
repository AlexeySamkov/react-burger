import React from 'react';
import stylesBuns from './Buns.module.css'; 


const Buns = (props) => {

    // Фильтруем данные, выбирая только элементы с type "bun"
 const buns = props.data.filter(item => item.type === 'bun');

   return (
    <div>
      <h2>Булки</h2>
       <div className={stylesBuns.bunsContainer}>        
       {buns.map((item) => (
       <div key={item._id} className={stylesBuns.bunItem}>         
         <img src={item.image} alt={item.name} />
         <p>Price: {item.price}</p>
         <p>Proteins: {item.proteins}</p>
         <p>Fat: {item.fat}</p>
         <p>Carbohydrates: {item.carbohydrates}</p>
         <p>Calories: {item.calories}</p>
         <h2>{item.name}</h2>         
       </div>
         ))}
       </div>
    </div>
   );
};

export default Buns;