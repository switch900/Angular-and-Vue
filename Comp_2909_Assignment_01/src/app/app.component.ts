import { Component } from '@angular/core';

export class Item {

  description: string;
  qty:number;
  unitPrice:number;
  amount: number;

  constructor(description: string,qty: number,unitPrice:number) {
    this.description = description;
    this.qty = qty;
    this.unitPrice = unitPrice;
    this.amount = qty * unitPrice;
  };
}

export class Customer {
 
  firstName: string;
  lastName:string;
  streetAddress:string;

  constructor(firstName:string,lastName: string,streetAddress: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.streetAddress = streetAddress;
  };
}

@Component({
  selector:'app-root',
  template: `<section>
  <form #myForm="ngForm">
  <table>
      <tr>
        <td>
          First Name
        </td>
        <td>
          <input type="text" pattern="[a-zA-Z-']*" required
          [(ngModel)]="firstName" name="fName" #fName="ngModel" >
        </td>
      </tr>
      <tr>
        <td>
          Last Name
        </td>
        <td>
          <input type="text" pattern="[a-zA-Z-']*" required
          [(ngModel)]="lastName" name="lName" #lName="ngModel" >
        </td>
      </tr>
      <tr>
        <td>
          Street Address
        </td>
        <td>
          <input type="text" minlength="1" required
          [(ngModel)]="streetAddress" name="address" #address="ngModel" >
        </td>
      </tr>
      <tr>
        <td>
          <button type="submit" class="btn btn-default"
          [disabled]="!address.valid || !fName.valid || !lName.valid" (click)="onSubmit(firstName, lastName, streetAddress)">Submit Address</button><br><br>
        </td>
        <td colspan="3">
          <p *ngIf="fName?.errors?.pattern">
            First Name only permits hyphens, apostrophes and letters.</p>        
          <p *ngIf="lName?.errors?.pattern">
          Last Name only permits hyphens, apostrophes and letters.</p>
          <p *ngIf="address?.errors?.required && (address.dirty || address.touched)">Address Required.</p>
        </td>
      </tr>
      <tr>
        <td>
          <button type="addItem" class="btn btn-default"
          [disabled]="!myForm.form.valid" (click)="onAddItem(selectedItems, qty)">Add Item</button>
        </td>
        <td>
          <select [(ngModel)]="selectedItems" name="first" style="width:175px" required>
          <option *ngFor="let fruit of fruits">{{fruit.name}}</option>
          </select>
        </td>
        <td style ="padding: 25px">
          Qty
        </td>
        <td>
          <input type="number" required
          [(ngModel)]="qty" name="quantity" #quantity="ngModel" ><br>
        </td>
      </tr>
      <tr> 
      <td><br><br><br></td>
        <td>
        <p *ngIf="quantity?.errors?.required && (quantity.dirty || quantity.touched)">Quantity Required</p>
        <p *ngIf="first?.errors?.required && (first.dirty || first.touched)">Quantity Required</p>
        </td>
      </tr>
      <th></th>
      <th></th>
      <th style="text-align:center;">
        Qty
      </th>
      <th style="text-align:center;">
        Unit Price
      </th>
      <th style="text-align:center;"> 
        Amount
      </th>
        <tr *ngFor="let item of items" >
      <td></td>
      <td> {{item.description}}</td>
      <td style="text-align:center;"> {{item.qty}}</td>
      <td style="text-align:center;"> {{item.unitPrice | number:'1.2-2'}}</td>
      <td style="text-align:right;"> {{item.amount | number:'1.2-2'}}</td>
      <td> 
        <button type="deleteItem" class="btn btn-default"
        [disabled]="!myForm.form.valid" (click)="onDeleteItem(item)">Delete</button> 
      </td>
    </tr>
    <tr>
      <td></td>
      <td>Subtotal</td>
      <td></td>
      <td></td>
      <td style="text-align:right; border-top: 2px solid currentColor;line-height: 0.85;border-bottom: 2px solid currentColor;line-height: 0.85;"> {{calculateSubTotal(items) | number:'1.2-2'}}</td>
    </tr>
    <tr>
      <td></td>
      <td>Taxes {{taxRate}}%</td>
      <td></td>
      <td></td>
      <td style="text-align:right;border-bottom: 2px solid currentColor;line-height: 0.85;">{{calculateTaxes(items) | number:'1.2-2'}}</td>
    </tr>
    <tr>
      <td></td>
      <td>Total</td>
      <td></td>
      <td></td>
      <td style="text-align:right;">{{calculateTotal(items) | currency:'USD':true}}</td>
    </tr>
    <tr>
      <td></td>
      <td colspan="3">
      <div *ngIf="selectedCustomer">
        <br>Order for {{selectedCustomer.firstName}} {{selectedCustomer.lastName}} at {{selectedCustomer.streetAddress}}
      </div>
      </td>
    <tr>
  </table>
</form>
</section>`
})

export class AppComponent {

  selectedCustomer: Customer;
  
  fruits = [
    { name: "Apples", value: 'Apples'},
    { name: "Peaches", value: 'Peaches' },
    { name: "Pears", value: 'Pears' },
    { name: "Plums", value: 'Plums' }
  ]

  items: Array<Item> = [];
  firstName = "";
  lastName ="";
  streetAddress ="";
  taxRate = 7;

  onSubmit(firstName:string,lastName: string, streetAddress: string) { 
    let newCustomer = new Customer(firstName,lastName, streetAddress)
    this.selectedCustomer = newCustomer;
  }

  onAddItem(description:string, quantity: number) {
    var price = 0;
    switch(description) {
      case 'Apples':
        price = 1.23;
        break;
      case 'Peaches':
        price = 1.39;
        break;
      case 'Pears':
        price = 1.49;
        break;
      case 'Plums':
        price = 1.59;
        break;
      default:
        price = 0.0;
    }
    let newItem = new Item(description, quantity, price);
    this.items.push(newItem);
  }

  onDeleteItem(item:Item) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  onSelect(customer: Customer) { 
    this.selectedCustomer = customer; 
  }

  calculateSubTotal(items){
    var subtotal = 0.00;
    items.forEach(element => {
      subtotal = subtotal + element.amount;     
    });
    return subtotal;
  }

  calculateTaxes(items){
    return (this.calculateSubTotal(items) * (this.taxRate/100));
  }

  calculateTotal(items){
    return (this.calculateSubTotal(items) + this.calculateTaxes(items));
  }
}