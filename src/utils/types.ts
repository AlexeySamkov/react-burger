
export interface IIngredient {
  _id: string;
  name: string;
  type?: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  position?: 'top' | 'bottom';
  counter: number;
}

export interface IOrder {
  number: number;
}

export interface IProfileFormValues {
  name: string;
  email: string;
  password: string;
}


export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IForgotPasswordFormValues {
  email: string;
}


export interface IResetPasswordFormValues {
  password: string;
  token: string;
}


export interface IUser {
  name: string;
  email: string;
}

export interface IUserResponse {
  success: boolean;
  user: IUser;
}

export interface IErrorResponse {
  message: string;
}

export interface IUpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

// export interface IIngredientsResponse {
//   success: boolean;
//   data: IIngredient[];
// }


export interface IAuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}


export interface IngredientsState {
  ingredients: IIngredient[];
  groupTypes: { type: string; name: string }[];
  currentIngredient: IIngredient | null;
  constructorIngredients: (IIngredient & { uniqueId?: string; position?: 'top' | 'bottom' })[];
  order: any; // IOrder; 
  error: string | null;
  loading: boolean;
}

// export interface IAction<T = any> {
//   type: string;
//   payload?: T;
//   error?: string;
// }
