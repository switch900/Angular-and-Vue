import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var Item = /** @class */ (function () {
    function Item(description, qty, unitPrice) {
        this.description = description;
        this.qty = qty;
        this.unitPrice = unitPrice;
        this.amount = qty * unitPrice;
    }
    ;
    return Item;
}());
export { Item };
var Customer = /** @class */ (function () {
    function Customer(firstName, lastName, streetAddress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetAddress = streetAddress;
    }
    ;
    return Customer;
}());
export { Customer };
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.fruits = [
            { name: "Apples", value: 'Apples' },
            { name: "Peaches", value: 'Peaches' },
            { name: "Pears", value: 'Pears' },
            { name: "Plums", value: 'Plums' }
        ];
        this.items = [];
        this.firstName = "";
        this.lastName = "";
        this.streetAddress = "";
    }
    AppComponent.prototype.onSubmit = function (firstName, lastName, streetAddress) {
        var newCustomer = new Customer(firstName, lastName, streetAddress);
        this.selectedCustomer = newCustomer;
    };
    AppComponent.prototype.onAddItem = function (description, quantity) {
        var newItem = new Item(description, quantity, 12);
        this.items.push(newItem);
    };
    AppComponent.prototype.onDeleteItem = function (item) {
        var index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    };
    AppComponent.prototype.onSelect = function (customer) {
        this.selectedCustomer = customer;
    };
    AppComponent.prototype.calculateSubTotal = function (items) {
        var subtotal = 0;
        items.forEach(function (element) {
            subtotal = subtotal + element.amount;
        });
        return subtotal;
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            template: "<section>\n  <form #myForm=\"ngForm\">\n    <table>\n      <tr>\n        <td>\n          First Name\n        </td>\n        <td>\n          <input type=\"text\" pattern=\"[a-zA-Z-']*\" required\n          [(ngModel)]=\"firstName\" name=\"fName\" #fName=\"ngModel\" >\n        </td>\n      </tr>\n      <tr>\n        <td>\n          Last Name\n        </td>\n        <td>\n          <input type=\"text\" pattern=\"[a-zA-Z-']*\" required\n          [(ngModel)]=\"lastName\" name=\"lName\" #lName=\"ngModel\" >\n        </td>\n      </tr>\n      <tr>\n        <td>\n          Street Address\n        </td>\n        <td>\n          <input type=\"text\" minlength=\"1\" required\n          [(ngModel)]=\"streetAddress\" name=\"address\" #address=\"ngModel\" >\n        </td>\n      </tr>\n      <tr>\n        <td>\n          <button type=\"submit\" class=\"btn btn-default\"\n          [disabled]=\"!myForm.form.valid\" (click)=\"onSubmit(firstName, lastName, streetAddress)\">Submit Address</button><br><br>\n        </td>\n        <td>\n          <p *ngIf=\"fName?.errors?.pattern\">\n            First Name only permits hyphens, apostrophes and letters.</p>        \n          <p *ngIf=\"lName?.errors?.pattern\">\n          Last Name only permits hyphens, apostrophes and letters.</p>\n          <p *ngIf=\"address?.errors?.required && (address.dirty || address.touched)\">Address Required.</p>\n        </td>\n      </tr>\n      <tr>\n        <td>\n          <button type=\"addItem\" class=\"btn btn-default\"\n          [disabled]=\"!myForm.form.valid\" (click)=\"onAddItem(selectedItems, qty)\">Add Item</button>\n        </td>\n        <td>\n          <select [(ngModel)]=\"selectedItems\" name=\"first\" style=\"width:175px\" required>\n          <option *ngFor=\"let fruit of fruits\">{{fruit.name}}</option>\n          </select>\n        </td>\n        <td>\n          Qty\n        </td>\n        <td>\n          <input type=\"number\" required\n          [(ngModel)]=\"qty\" name=\"quantity\" #quantity=\"ngModel\" ><br>\n        </td>\n      </tr>\n      <tr> \n        <td>\n        <p *ngIf=\"quantity?.errors?.required && (quantity.dirty || quantity.touched)\">Quantity Required</p>\n        <p *ngIf=\"first?.errors?.required && (first.dirty || first.touched)\">Quantity Required</p>\n        </td>\n      </tr>\n      <th></th>\n      <th></th>\n      <th>\n        Qty\n      </th>\n      <th>\n        Unit Price\n      </th>\n      <th> \n        Amount\n      </th>\n        <tr *ngFor=\"let item of items\">\n      <td></td>\n      <td> {{item.description}}</td>\n      <td> {{item.qty}}</td>\n      <td> {{item.unitPrice}}</td>\n      <td> {{item.amount}}</td>\n      <td> \n        <button type=\"deleteItem\" class=\"btn btn-default\"\n        [disabled]=\"!myForm.form.valid\" (click)=\"onDeleteItem(item)\">Delete</button> \n      </td>\n    </tr>\n    <tr>\n      <td></td>\n      <td>Subtotal</td>\n      <td></td>\n      <td></td>\n      <td>$13.10</td>\n    </tr>\n    <tr>\n      <td></td>\n      <td>Taxes 7%</td>\n      <td></td>\n      <td></td>\n      <td>.92</td>\n    </tr>\n    <tr>\n      <td></td>\n      <td>Total</td>\n      <td></td>\n      <td></td>\n      <td>$14.02</td>\n    </tr>\n    <tr>\n      <td></td>\n      <td>\n      <div *ngIf=\"selectedCustomer\">\n        <br>Order for {{selectedCustomer.firstName}} {{selectedCustomer.lastName}} at {{selectedCustomer.streetAddress}}\n      </div>\n      </td>\n    <tr>\n  </table>\n</form>\n</section>"
        })
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map