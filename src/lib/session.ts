import { SessionOptions } from 'iron-session';

export interface SessionCardProduct {
    title: string,
    pid: string,
    image: string,
    qty: number,
    price: number,
}

export interface CartData {
    [productId: string]: SessionCardProduct;
  }

export interface SessionCardData {
    cart_data_obj?: CartData
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: 'cart_session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  };