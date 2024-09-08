https://alexeysamkov.github.io/react-burger

<h2>Космическая бургерная</h2>

```arduino 
src/
├── components/
│   ├── AppHeader/
│   │   ├── AppHeader.jsx
│   │   └── AppHeader.module.css
│   ├── BurgerIngredients/
│   │   ├── IngredientDetails/
│   │   │   ├── IngredientDetails.jsx
│   │   │   └── IngredientDetails.module.css
│   │   └── BurgerIngredients.jsx
│   ├── Modal/
│   │   ├── Modal.jsx
│   │   └── Modal.module.css
│   ├── Profile/
│   │   ├── Profile.jsx
│   │   └── Profile.module.css
│   └── App.jsx
│       └── App.module.css
├── hooks/
│   └── useModal.js
├── pages/
│   ├── ForgotPassword/
│   │   ├── ForgotPassword.jsx
│   │   └── ForgotPassword.module.css
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.module.css
│   ├── IngredientDetailsPage/
│   │   ├── IngredientDetailsPage.jsx
│   │   └── IngredientDetailsPage.module.css
│   ├── LoginPage/
│   │   ├── LoginPage.jsx
│   │   └── LoginPage.module.css
│   ├── NotFoundPage/
│   │   ├── NotFoundPage.jsx
│   │   └── NotFoundPage.module.css
│   ├── RegisterPage/
│   │   ├── RegisterPage.jsx
│   │   └── RegisterPage.module.css
│   └── ResetPassword/
│       ├── ResetPassword.jsx
│       └── ResetPassword.module.css
├── services/
│   ├── actions/
│   │   ├── currentIngredientActions.js
│   │   ├── ingredientsActions.js
│   │   ├── orderActions.js
│   │   └── passwordActions.js
│   ├── reducers/
│   │   ├── currentIngredientReducer.js
│   │   ├── ingredientsReducer.js
│   │   ├── orderReducer.js
│   │   └── passwordReducer.js
│   ├── store.js
│   └── types.js
├── utils/
│   ├── checkResponse.js
│   ├── const.js
│   └── request.js
└── index.js
```

* components/: Содержит компоненты, используемые в приложении.

* AppHeader/: Компонент заголовка приложения.
* BurgerIngredients/: Компонент для отображения ингредиентов бургера и их деталей.
* Modal/: Компонент модального окна.
* Profile/: Компонент профиля пользователя.
* App.jsx: Основной компонент приложения.
* hooks/: Содержит кастомные хуки.

* useModal.js: Кастомный хук для управления состоянием модального окна.
* pages/: Содержит страницы приложения.

* ForgotPassword/: Страница восстановления пароля.
* Home/: Главная страница.
* IngredientDetailsPage/: Страница деталей ингредиента.
* LoginPage/: Страница входа.
* NotFoundPage/: Страница ошибки 404.
* RegisterPage/: Страница регистрации.
* ResetPassword/: Страница сброса пароля.
* services/: Содержит Redux-акции, редьюсеры и конфигурацию магазина.

* actions/: Содержит файлы с определением экшенов.
* reducers/: Содержит файлы с определением редьюсеров.
* store.js: Конфигурация Redux-хранилища.
* types.js: Содержит типы экшенов.
* utils/: Содержит утилиты.

* checkResponse.js: Утилита для проверки ответа сервера.
* const.js: Содержит константы.
* request.js: Утилита для выполнения HTTP-запросов.
* index.js: Входная точка приложения.
