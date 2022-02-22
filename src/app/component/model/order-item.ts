import { Cartitem } from "./cartitem";

export class OrderItem {

  imageUrl: string;
  productPrice: number;
  quantity: number;
  productId: number;
  constructor(cartItem: Cartitem) {
      this.imageUrl = cartItem.imageUrl;
      this.quantity = cartItem.quantity;
      this.productPrice = cartItem.productPrice;
      this.productId = cartItem.id;
  }
}
