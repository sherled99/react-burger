export interface IIngredientDrop {
  id?: string;
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  index?: number;
}

export type TIngredient = IIngredient | {};

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  image_large: string;
  image_mobile?: string;
  proteins: number;
  __v?: number;
}

export interface IOrder {
  createdAt: Date;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: Date;
  _id: string;
}

export interface IMessages {
  timestamp: number;
  total: number;
  totalToday: number;
  orders: Array<IOrder>;
}

export interface IOrderResolve {
  name: string;
  success: boolean;
  order: IOrder;
}

export interface IUser {
  email: string;
  name: string;
}

export type TOrder = IOrder | {};

export interface IOrderSuccess {
  name: string;
  number?: number;
}
