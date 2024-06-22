import React from 'react';
import stylesBurgerParts from './BurgerParts.module.css'; 
import subtract from './../../../images/subtract.svg'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from './../../Modal/Modal'

const BurgerParts = ( { burgerpart }) => {
  const [isModal1Open, setIsModal1Open] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState(null);


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

      const handleOpenModal = (ingredient) => {
        setCurrentIngredient(ingredient);
        setIsModal1Open(true);
    }

    return (
      <div>
          <h2>{getHeading(burgerpart[0].type)}</h2>
          <div className={stylesBurgerParts.partsContainer}>        
              {burgerpart.map((item) => (             
                  <div key={item._id} 
                       className={stylesBurgerParts.partsItem} 
                       onClick={() => handleOpenModal(item)}>                
                      <img  src={item.image} alt={item.name} />
                      <div className={stylesBurgerParts.priceContainer}>
                          <p>{item.price}</p>
                          <img src={subtract} alt={item.name} />
                      </div>
                      <div className={stylesBurgerParts.nameContainer}>
                          <p>{item.name}</p>         
                      </div>
                      <Counter count={1} size="default" extraClass="m-1 counter" />   
                  </div>
              ))}
          </div>
          {isModal1Open && (
              <Modal isOpen={isModal1Open} onClose={() => setIsModal1Open(false)}>
                  {currentIngredient && (
                      <div className={stylesBurgerParts.modalContent}>
                        <h2>Детали ингредиента</h2>
                          <h2>{currentIngredient.name}</h2>
                          <p>Price: {currentIngredient.price}</p>
                          <img src={currentIngredient.image} alt={currentIngredient.name} />
                      </div>
                  )}
              </Modal>
          )}
      </div>
  );
}
export default BurgerParts;