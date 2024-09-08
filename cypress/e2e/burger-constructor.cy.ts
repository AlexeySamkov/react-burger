describe('Функциональность страницы со списком ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients').as('getIngredients');
    cy.visit('http://localhost:3000');
    cy.wait('@getIngredients'); // Ожидаем, пока данные будут загружены
  });


  it('Необходимо проверить начальные условия, загрузить список ингредиентов, проверить что кнопка не доступна для оформления заказа', () => {
    cy.get('[class^="BurgerIngredients_burgerHeader"]').contains('Соберите бургер');
    cy.get('[class^="BurgerParts_partsContainer"]').should('be.visible');
    cy.get('[class^="BurgerIngredients_burgerTabs"]').contains('Булки');
    cy.get('[class^="BurgerIngredients_burgerTabs"]').contains('Соусы');
    cy.get('[class^="BurgerIngredients_burgerTabs"]').contains('Начинки');
    cy.get('[class^=button]').contains('Оформить заказ').should('be.disabled');
  });

  it('Должен произойти скролл на "Начинки"', function () {
    cy.get('[class^="BurgerIngredients_burgerTabs"] div').contains('Начинки').click();
    cy.get('h2').contains('Начинки').scrollIntoView().should('be.visible');
  });

  it('Должен произойти скролл на "Соусы"', function () {
    cy.get('[class^="BurgerIngredients_burgerTabs"] div').contains('Соусы').click();
    cy.get('h2').contains('Соусы').scrollIntoView().should('be.visible');
  });

  it('Должен произойти скролл на "Булки"', function () {
    // уводим скролл на соусы, так как булки уже активные, и клик и скролл не произойдет
    cy.get('[class^="BurgerIngredients_burgerTabs"] div').contains('Соусы').click();
    cy.get('[class^="BurgerIngredients_burgerTabs"] div').contains('Булки').click();
    cy.get('h2').contains('Булки').scrollIntoView().should('be.visible');
  });

  it('Должна открываться и закрываться модалка с ингредиентом', function () {
    cy.get('[class^="BurgerParts_partsItem"]').first().click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.get('[class^="Modal"] img').should('be.visible');
    cy.get('[class^="Modal_closeButton"]').should('be.visible').click();
    cy.get('[class^="Modal"]').should('not.exist'); // закрылась
  });

  it('Должно осуществиться перетаскивание булки в конструктор, кнопка оформить заказ становится доступна, булочек две в конструкторе', () => {
    cy.get('[class^="BurgerParts_partsContainer"]').contains('Флюоресцентная булка R2-D3').trigger('dragstart');
    cy.get('[class^="BurgerConstructor_burgerConstructor"]').trigger('drop');
    cy.get('[class^="BurgerConstructor_burgerConstructor"]').contains('Флюоресцентная булка R2-D3 (верх)');
    cy.get('[class^="BurgerConstructor_burgerConstructor"]').contains('Флюоресцентная булка R2-D3 (низ)');
    cy.get('[class^=button]').contains('Оформить заказ').should('be.enabled');
  });


  it('Должно осуществиться перетаскивание компонентов в конструктор и увеличение счетчиков', function () {
    cy.get('[class^=BurgerConstructor_burgerConstructor]').as('constructorDropArea');
    cy.get('[class^=BurgerParts_partsItem]').contains('Флюоресцентная булка R2-D3').as('bun');
    cy.get('@bun').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@bun').closest('[class^=BurgerParts_partsItem]').find('p.counter__num').should('contain', '2');
    // Метод closest: После того как найден текст, с помощью closest возвращаемся к ближайшему родительскому элементу, который является компонентом булки, чтобы затем найти счетчик.
    // есть еще parent

    // Ищем и перетаскиваем биокотлету
    cy.get('[class^=BurgerParts_partsItem]').contains('Биокотлета из марсианской Магнолии').as('ingredient');
    cy.get('@ingredient').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@ingredient').closest('[class^=BurgerParts_partsItem]').find('p.counter__num').should('contain', '1');

    // Ищем и перетаскиваем соус
    cy.get('[class^=BurgerParts_partsItem]').contains('Соус с шипами Антарианского плоскоходца').as('sauce');
    cy.get('@sauce').trigger('dragstart');
    cy.get('@constructorDropArea').trigger('drop');
    cy.get('@sauce').closest('[class^=BurgerParts_partsItem]').find('p.counter__num').should('contain', '1');

    // Проверяем, что ингредиенты добавлены в конструктор
    cy.get('[class^="DraggableIngredient"]').contains('Биокотлета из марсианской Магнолии');
    cy.get('[class^="DraggableIngredient"]').contains('Соус с шипами Антарианского плоскоходца');

  });


});


describe('Функциональность с авторизацией, оформление заказа', () => {
  beforeEach(() => {
    // Интерсепт запроса авторизации
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
      fixture: 'login.json'
    }).as('loginRequest');

    // Переход на страницу логина
    cy.visit('http://localhost:3000/login');

    // Ввод данных авторизации
    cy.get('[name=email]').type('alexeysamkov@gmail.com');
    cy.get('[name=password]').type('321');

    // Клик на "Войти"
    cy.get('button').contains('Войти').click();

    // Ждем завершения запроса авторизации
    cy.wait('@loginRequest').its('response.statusCode').should('equal', 200);

    // Проверка, что логин успешен
    cy.window().then((win) => {
      const token = win.localStorage.getItem('accessToken');
      expect(token).to.exist;
    });
  });

  it('Необходимо перетащить булку, некоторые ингредиенты в конструктор, и оформить заказ', () => {
    // Перетаскивание ингредиентов
    cy.get('[class^="BurgerParts_partsContainer"]').contains('Флюоресцентная булка R2-D3').trigger('dragstart');
    cy.get('[class^="BurgerConstructor_burgerConstructor"]').trigger('drop');
    cy.get('[class^="BurgerConstructor_burgerConstructor"]').contains('Флюоресцентная булка R2-D3 (верх)');
    cy.get('[class^="BurgerConstructor_burgerConstructor"]').contains('Флюоресцентная булка R2-D3 (низ)');

    cy.get('[class^="BurgerParts_partsContainer"]').contains('Биокотлета из марсианской Магнолии').trigger('dragstart');
    cy.get('[class^="BurgerConstructor_burgerConstructor"]').trigger('drop');
    cy.get('[class^="DraggableIngredient"]').contains('Биокотлета из марсианской Магнолии');

    cy.get('[class^="BurgerParts_partsContainer"]').contains('Соус с шипами Антарианского плоскоходца').trigger('dragstart');
    cy.get('[class^="BurgerConstructor_burgerConstructor"]').trigger('drop');
    cy.get('[class^="DraggableIngredient"]').contains('Соус с шипами Антарианского плоскоходца');

    // Перехватываем POST-запрос на сервер для создания заказа
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    // Проверяем, что кнопка "Оформить заказ" активна и нажимаем на неё
    cy.contains('button', 'Оформить заказ').should('not.be.disabled').click();

    // Ожидание перехвата POST-запроса
    cy.wait('@createOrder').then((interception) => {
      // Проверяем, что сервер вернул успешный ответ
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.have.property('success', true);
    });

    // Проверяем, что модальное окно заказа открылось
    cy.get('[class^="Modal_header"]').contains('Ваш заказ');
    cy.get('[class^="OrderDetails_order"]').should('be.visible');

    // Закрываем модальное окно
    cy.get('[class^="Modal_closeButton"]').click(); 
    cy.get('[class^="Modal"]').should('not.exist'); 

  });
});