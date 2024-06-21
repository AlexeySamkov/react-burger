import React from 'react';
import stylesBuns from './Buns.module.css'; 
import subtract from './../images/subtract.svg'


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
         <p>{item.price}<img src={subtract} alt="React Logo" /></p>
         <p>{item.name}</p>         
       </div>
         ))}
       </div>
    </div>
   );
};

export default Buns;