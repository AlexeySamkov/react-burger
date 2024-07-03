export const getHeading = (type) => {
    switch (type) {
      case 'bun':
        return 'Булки';
      case 'sauce':
        return 'Соусы';
      case 'main':
        return 'Начинки';
      default:
        return 'UFO';
    }
  };
  