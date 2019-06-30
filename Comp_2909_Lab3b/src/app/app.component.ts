import { Component} from '@angular/core';
import { ChildComponent } from './app.child';

// This component consumes the re-usable service.
@Component({
  selector: 'app-root',
  template: `
  <form #myForm="ngForm">
    <div *ngFor="let op of operations">
      <child [childFuncRef]="parentFuncRef" [opType]="op"></child>
    </div>
  <br>
    Final Result: {{outputString}}
  </form>
  `
})
export class AppComponent {
  public parentFuncRef: Function;
  public operations:Array<any>;
  public outputString:string; 

  public ngOnInit() {
    // Create a reference to function within this component.
    this.parentFuncRef = this.myCallBackFunction.bind(this);
    this.operations = ['+','-','*', '/'];
  }
  // This function can be called by child.
  public myCallBackFunction(operation, firstInput, secondInput) { 
    var result = 0;
    firstInput = parseInt(firstInput);
    secondInput = parseInt(secondInput);
    switch(operation) {
      case '+':
        result = firstInput + secondInput;
        break;
      case '-':
        result = firstInput - secondInput;
        break;
      case '*':
        result = firstInput * secondInput;
        break;
      case '/':
        result = firstInput / secondInput;
        break;
      default:
        result = 0;
    }
    this.outputString = "A " + operation + " B = " + firstInput + " " + operation + " " + secondInput + " = "+ result;
  }
}

