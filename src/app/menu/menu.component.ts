import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: Menu[] = [];
  newMenuItem: Menu = { quantity:0,id: 0, itemName: '', itemPrice: 0 };
  editMenuItem: Menu | null = null; // Define editMenuItem

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(): void {
    this.menuService.getMenu().subscribe(data => {
      this.menu = data;
    });
  }

  addMenu(): void {
    this.menuService.addMenu(this.newMenuItem).subscribe(() => {
      this.getMenu();
      this.newMenuItem = { quantity:0,id: 0, itemName: '', itemPrice: 0 };
    });
  }

  updateMenu(menu: Menu): void {
    this.editMenuItem = { ...menu }; // Assign the menu item to edit
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
