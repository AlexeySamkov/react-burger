
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