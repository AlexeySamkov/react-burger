const apiServerUrl = 'https://norma.nomoreparties.space';

const selectors = {
  burgerHeader: '[class^="BurgerIngredients_burgerHeader"]',
  partsContainer: '[class^="BurgerParts_partsContainer"]',
  burgerTabs: '[class^="BurgerIngredients_burgerTabs"]',
  buttonPlaceOrder: '[class^=button]',
  modal: '[class^="Modal"]',
  modalCloseButton: '[class^="Modal_closeButton"]',
  constructorDropArea: '[class^="BurgerConstructor_burgerConstructor"]',
  partsItem: '[class^="BurgerParts_partsItem"]',
  draggableIngredient: '[class^="DraggableIngredient"]',
};


describe('Функциональность страницы со списком ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', `${apiServerUrl}/api/ingredients`).as('getIngredients');
    cy.visit('/'); //baseURL см конфиг
    cy.wait('@getIngredients'); // Ожидаем, пока данные будут загружены
  });


  it('Необходимо проверить начальные условия, загрузить список ингредиентов, проверить что кнопка не доступна для оформления заказа', () => {
    cy.get(selectors.burgerHeader).contains('Соберите бургер');
    cy.get(selectors.partsContainer).should('be.visible');
    cy.get(selectors.burgerTabs).contains('Булки');
    cy.get(selectors.burgerTabs).contains('Соусы');
    cy.get(selectors.burgerTabs).contains('Начинки');
    cy.get(selectors.buttonPlaceOrder).contains('Оформить заказ').should('be.disabled');
  });

  it('Должен произойти скролл на "Начинки"', function () {
    cy.get(`${selectors.burgerTabs} div`).contains('Начинки').click();
    cy.get('h2').contains('Начинки').scrollIntoView().should('be.visible');
  });

  it('Должен произойти скролл на "Соусы"', function () {
    cy.get(`${selectors.burgerTabs} div`).contains('Соусы').click();
    cy.get('h2').contains('Соусы').scrollIntoView().should('be.visible');
  });

  it('Должен произойти скролл на "Булки"', function () {
    // уводим скролл на соусы, так как булки уже активные, и клик и скролл не произойдет
    cy.get(`${selectors.burgerTabs} div`).contains('Соусы').click();
    cy.get(`${selectors.burgerTabs} div`).contains('Булки').click();
    cy.get('h2').contains('Булки').scrollIntoView().should('be.visible');
  });

  it('Должна открываться и закрываться модалка с ингредиентом', function () {
    cy.get(selectors.partsItem).first().click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get(`${selectors.modal} img`).should('be.visible');
    cy.get(selectors.modalCloseButton).should('be.visible').click();
    cy.get(selectors.modal).should('not.exist'); // закрылась
  });

  it('Должно осуществиться перетаскивание булки в конструктор, кнопка оформить заказ становится доступна, булочек две в конструкторе', () => {
    cy.get(selectors.partsContainer).contains('Флюоресцентная булка R2-D3').trigger('dragstart');
    // cy.addBunToConstructor('Флюоресцентная булка R2-D3');  
    cy.get(selectors.constructorDropArea).trigger('drop');
    cy.get(selectors.constructorDropArea).contains('Флюоресцентная булка R2-D3 (верх)');
    cy.get(selectors.constructorDropArea).contains('Флюоресцентная булка R2-D3 (низ)');
    cy.get(selectors.buttonPlaceOrder).contains('Оформить заказ').should('be.enabled');
  });


  it('Должно осуществиться перетаскивание компонентов в конструктор и увеличение счетчиков', function () {
    cy.get(selectors.constructorDropArea).as('constructorDropArea');
    cy.get(selectors.partsItem).contains('Флюоресцентная булка R2-D3').as('bun');
    cy.get('@bun').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@bun').closest(selectors.partsItem).find('p.counter__num').should('contain', '2');
    // Метод closest: После того как найден текст, с помощью closest возвращаемся к ближайшему родительскому элементу, который является компонентом булки, чтобы затем найти счетчик.
    // есть еще parent

    cy.get(selectors.partsItem).contains('Биокотлета из марсианской Магнолии').as('ingredient');
    cy.get('@ingredient').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@ingredient').closest(selectors.partsItem).find('p.counter__num').should('contain', '1');

    cy.get(selectors.partsItem).contains('Соус с шипами Антарианского плоскоходца').as('sauce');
    cy.get('@sauce').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@sauce').closest(selectors.partsItem).find('p.counter__num').should('contain', '1');

    // Проверяем, что ингредиенты добавлены в конструктор
    cy.get(selectors.draggableIngredient).contains('Биокотлета из марсианской Магнолии');
    cy.get(selectors.draggableIngredient).contains('Соус с шипами Антарианского плоскоходца');

  });


});


describe('Функциональность с авторизацией, оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('POST', `${apiServerUrl}/api/auth/login`, {
      fixture: 'login.json'
    }).as('loginRequest');
    cy.visit('/login');
    cy.get('[name=email]').type('alexeysamkov@gmail.com');
    cy.get('[name=password]').type('321');
    cy.get('button').contains('Войти').click();
    cy.wait('@loginRequest').its('response.statusCode').should('equal', 200);
    cy.window().then((win) => {
      const token = win.localStorage.getItem('accessToken');
      expect(token).to.exist;
    });
  });

  it('Необходимо перетащить булку, некоторые ингредиенты в конструктор, и оформить заказ', () => {
    cy.get(selectors.partsContainer).contains('Флюоресцентная булка R2-D3').trigger('dragstart');
    // cy.addBunToConstructor('Флюоресцентная булка R2-D3');  
    cy.get(selectors.constructorDropArea).trigger('drop');
    cy.get(selectors.constructorDropArea).contains('Флюоресцентная булка R2-D3 (верх)');
    cy.get(selectors.constructorDropArea).contains('Флюоресцентная булка R2-D3 (низ)');

    cy.get(selectors.partsContainer).contains('Биокотлета из марсианской Магнолии').trigger('dragstart');
    cy.get(selectors.constructorDropArea).trigger('drop');
    cy.get(selectors.draggableIngredient).contains('Биокотлета из марсианской Магнолии');

    cy.get(selectors.partsContainer).contains('Соус с шипами Антарианского плоскоходца').trigger('dragstart');
    cy.get(selectors.constructorDropArea).trigger('drop');
    cy.get(selectors.draggableIngredient).contains('Соус с шипами Антарианского плоскоходца');

    cy.intercept('POST', `${apiServerUrl}/api/orders`, {
      fixture: 'order.json'
    }).as('createOrder');

    cy.contains('button', 'Оформить заказ').should('not.be.disabled').click();
    cy.wait('@createOrder').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.have.property('success', true);
    });

    // Проверяем, что модальное окно заказа открылось
    cy.get('[class^="Modal_header"]').contains('Ваш заказ');
    cy.get('[class^="OrderDetails_order"]').should('be.visible');

    // Закрываем модальное окно
    cy.get('[class^="Modal_closeButton"]').click();
    cy.get(selectors.modal).should('not.exist');

  });
});