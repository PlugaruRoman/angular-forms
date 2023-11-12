import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface SalesTaxType {
  id: number;
  value: number;
  title: string;
}

export interface ItemsListType {
  id: number;
  name: string;
  glCode: number;
  amount: number;
  salesTax: SalesTaxType;
}

export interface localItemsType {
  id: number;
  name: string;
  items: ItemsListType[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  totalAmount: number = 0;
  totalTaxes: number = 0;

  tableTitles = [
    'Category',
    'Items',
    'Gl code',
    'Amount',
    'Sales Tax',
    'Total',
  ];

  localItems: localItemsType[] = [
    {
      id: 1,
      name: 'Category',
      items: [
        {
          id: 1,
          name: 'Item',
          glCode: 0,
          amount: 0,
          salesTax: { id: 0, value: 0, title: '' },
        },
      ],
    },
  ];

  salesTaxList: SalesTaxType[] = [
    {
      id: 1,
      title: 'no tax',
      value: 0,
    },
    {
      id: 2,
      title: 'USA',
      value: 10,
    },
    {
      id: 3,
      title: 'Germany',
      value: 20,
    },
  ];

  onSubmitForm(form: NgForm) {
    console.log(form);
  }

  onAddCategory() {
    this.localItems.push({
      id: new Date().getTime(),
      name: 'Category',
      items: [
        {
          id: new Date().getTime(),
          name: 'Item',
          glCode: 0,
          amount: 0,
          salesTax: { id: 0, value: 0, title: '' },
        },
      ],
    });
  }

  onRemoveCategory(id: number) {
    this.localItems = this.localItems.filter((category) => category.id !== id);
  }

  addItemToCategory(categoryId: number) {
    this.localItems.find((item) => {
      if (item.id === categoryId) {
        item.items.push({
          id: new Date().getTime(),
          name: 'Item',
          glCode: 0,
          amount: 0,
          salesTax: { id: 0, value: 0, title: '' },
        });
      }
    });
  }

  onRemoveCategoryItem(categoryId: number, itemId: number) {
    this.localItems.find((item) => {
      const idx = item['items'].findIndex((item) => item.id === itemId);
      if (idx !== -1) {
        item['items'].splice(idx, 1);
      }
    });
  }

  getTotal(isAmout: boolean) {
    let total = 0;
    this.localItems.forEach((item) => {
      total = item.items.reduce((acc, curr) => {
        if (isAmout) {
          return acc + curr.amount;
        } else {
          return acc + curr.salesTax.value;
        }
      }, total);
    });

    if (isAmout) this.totalAmount = total;
    else this.totalTaxes = total;
  }
}
