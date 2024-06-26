// import { Component } from '@angular/core';
// import { MenuService } from '../menu.service';
// import { Menu } from '../menu';
// import { Cart } from '../cart';
// import { CartComponent } from '../cart/cart.component';

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent {

//   // menu: any[] = [];
//   // cart: any[] = [];

//   // constructor(private menuService: MenuService) {
//   //   this.loadItems();
//   // }

//   // loadItems() {
//   //   this.menuService.getMenu().subscribe(data => {
//   //     this.menu = data;
//   //   });
//   // }

//   // addToCart(item: any) {
//   //   this.cart.push(item);
//   // }

//   menu: Menu[] = [];
//   newMenuItem: Menu = {quantity:0, id: 0, itemName: '', itemPrice: 0 };
//   editMenuItem: Menu | null = null; // Define editMenuItem

//   constructor(private menuService: MenuService) {}

//   ngOnInit(): void {
//     this.getMenu();
//   }

//   getMenu(): void {
//     this.menuService.getMenu().subscribe(data => {
//       this.menu = data;
//     });
//   }

//   addMenu(): void {
//     this.menuService.addMenu(this.newMenuItem).subscribe(() => {
//       this.getMenu();
//       this.newMenuItem = { quantity:0,id: 0, itemName: '', itemPrice: 0 };
//     });
//   }

//   updateMenu(menu: Menu): void {
//     this.editMenuItem = { ...menu }; // Assign the menu item to edit
//   }

//   saveMenu(): void {
//     if (this.editMenuItem) {
//       this.menuService.updateMenu(this.editMenuItem).subscribe(() => {
//         this.getMenu();
//         this.editMenuItem = null;
//       });
//     }
//   }

//   cancelEdit(): void {
//     this.editMenuItem = null;
//   }

//   deleteMenu(menu: Menu): void {
//     this.menuService.deleteMenu(menu).subscribe(() => {
//       this.getMenu();
//     });
//   }
//   cart: Cart = { menu: [], totalPrice: 0 };
//   cart1: Menu[] = [];
//   // cart: Cart[] = {menu:[]};
//   itemIds: number[] = [];
//   itemIdsStr: string = '';

//   // constructor(private menuService: MenuService) {}

//   // ngOnInit(): void {}

//   addItemToCart(): void {
//     this.itemIds = this.itemIdsStr.split(',').map(id => Number(id.trim()));
//     this.menuService.addItemToCart(this.itemIds).subscribe(data => {
//       this.cart = data;
//     });
//   }

  
//   addToCart(item: Menu): void {
//     const existingItem = this.cart.menu.find(i => i.id === item.id);
//     if (existingItem) {
//       existingItem.quantity++;
//     } else {
//       this.cart.menu.push({ ...item, quantity: 1 });
//     }
//   }

//   removeFromCart(item: Menu): void {
//     const existingItem = this.cart.menu.find(i => i.id === item.id);
//     if (existingItem) {
//       if (existingItem.quantity > 1) {
//         existingItem.quantity--;
//       } else {
//         this.cart.menu = this.cart.menu.filter(i => i.id !== item.id);
//       }
//     }
//   }

//   getTotalPrice(): number {
//     return this.cart.menu.reduce((total, item) => total + (item.itemPrice * item.quantity), 0);
//   }
  
// }

import { Component } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';
import { Cart } from '../cart';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  menu: Menu[] = [];
  editMenuItem: Menu | null = null;
  cart: Cart = { menu: [], totalPrice: 0 };
  itemIdsStr: string = '';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(): void {
    this.menuService.getMenu().subscribe(data => {
      this.menu = data;
    });
  }

  addToCart(item: Menu): void {
    const existingItem = this.cart.menu.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.menu.push({ ...item, quantity: 1 });
    }
    this.updateCartTotalPrice();
  }

  removeFromCart(item: Menu): void {
    const existingItem = this.cart.menu.find(i => i.id === item.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        this.cart.menu = this.cart.menu.filter(i => i.id !== item.id);
      }
      this.updateCartTotalPrice();
    }
  }

  addItemToCart(): void {
    this.menuService.addItemToCart(this.itemIdsStr.split(',').map(id => Number(id.trim()))).subscribe(data => {
      this.cart = data;
      this.updateCartTotalPrice();
    });
  }

  updateCartTotalPrice(): void {
    this.cart.totalPrice = this.cart.menu.reduce((total, item) => total + (item.itemPrice * item.quantity), 0);
  }

  updateMenu(menu: Menu): void {
    this.editMenuItem = { ...menu };
  }

  saveMenu(): void {
    if (this.editMenuItem) {
      this.menuService.updateMenu(this.editMenuItem).subscribe(() => {
        this.getMenu();
        this.editMenuItem = null;
      });
    }
  }

  cancelEdit(): void {
    this.editMenuItem = null;
  }

  deleteMenu(menu: Menu): void {
    this.menuService.deleteMenu(menu).subscribe(() => {
      this.getMenu();
    });
  }

}
