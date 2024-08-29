
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
  uniqueId: string; 
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
  constructorIngredients: IIngredient [];
  order: IOrder | null; 
  error: string | null;
  loading: boolean;
}

export type TWSState = {
  wsConnected: boolean;
  responseData: any;
  wsError?: Event;
  currentFeedId: string | null;
  orderFeedModalVisibility: boolean
}

// ws 
export interface IOrderHistory {
  _id: string;
  ingredients: string[];
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface TResponseData {
  success: boolean;
  orders: IOrderHistory[];
  total: number;
  totalToday: number;
}

export interface IOrderCardProps {
  order: IOrderHistory;
  ingredients: IIngredient[]; 
}


// export type TWSOrders = IOrderCardProps & {
//   owner?: object;
//   price?: number;
// };

// export type TResponseData = {
//   success: boolean;
//   orders: Array<TWSOrders>;
//   total: number;
//   totalToday: number;
// }


// export interface IOrderCardProps {
//   order: {
//       _id: string;
//       number: number;
//       name: string;
//       status: string;
//       ingredients: string[];
//       createdAt: string;
//       updatedAt: string;
//   };
// }
