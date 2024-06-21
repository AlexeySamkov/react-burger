import React from 'react';
import stylesSauces from './Sauces.module.css'; 
import subtract from './../images/subtract.svg'


const Sauces = (props) => {

    // Фильтруем данные, выбирая только элементы с type "sauce"
 const sauce = props.data.filter(item => item.type === 'sauce');

   return (
    <div>
      <h2>Соусы</h2>
       <div className={stylesSauces.saucesContainer}>        
       {sauce.map((item) => (
       <div key={item._id} className={stylesSauces.sauceItem}>         
         <img src={item.image} alt={item.name} />

         <p>{item.name}</p>         
       </div>
         ))}
       </div>
    </div>
   );
};

export default Sauces;