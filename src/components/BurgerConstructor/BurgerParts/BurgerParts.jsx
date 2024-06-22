import React from 'react';
import stylesBurgerParts from './BurgerParts.module.css'; 
import subtract from './../../../images/subtract.svg'
import { useInView } from 'react-intersection-observer';

const BurgerParts = ( { burgerpart, setCurrent }) => {
    const { ref, inView } = useInView({
      triggerOnce: false, // Наблюдать за входом/выходом из видимости, а не только за первым входом
    });
  
    React.useEffect(() => {
      if (inView) {
        setCurrent(burgerpart[0].type);
      }
    }, [inView, burgerpart, setCurrent]);
  

    const getHeading = (type) => {
        switch(type) {
        case 'bun':
            return 'Булки';
        case 'sauce':
            return 'Соусы';
        case 'main':
            return 'Начинки';
        default:
            return 'UFO';
        }
      }

      //ref={ref}

   return (
    <div>
      <h2>{getHeading(burgerpart[0].type)}</h2>
       <div className={stylesBurgerParts.partsContainer}>        
       {burgerpart.map((item) => (
        
       <div ref={ref} key={item._id} className={stylesBurgerParts.partsItem}>         
         <img  src={item.image} alt={item.name} />
            <div className={stylesBurgerParts.priceContainer}>
                <p>{item.price}</p>
                <img src={subtract} alt={item.name} />
            </div>
            <div className={stylesBurgerParts.nameContainer}>
                <p>{item.name}</p>         
            </div>
       </div>
         ))}
       </div>
    </div>
   );
};

export default BurgerParts;