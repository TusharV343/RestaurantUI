import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = { menu: [], totalPrice: 0 };
  itemIds: number[] = [];
  itemIdsStr: string = '';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  addItemToCart(): void {
    this.itemIds = this.itemIdsStr.split(',').map(id => Number(id.trim()));
    this.menuService.addItemToCart(this.itemIds).subscribe(data => {
      this.cart = data;
    });
  }
}
