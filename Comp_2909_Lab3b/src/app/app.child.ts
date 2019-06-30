import { Component, Input } from '@angular/core';

@Component({
    selector: 'child',
    template: `
    <form name="form" (ngSubmit)="f.form.valid && callParent() && onSubmit()" #f="ngForm" novalidate>
    <table>
        <tr>
            <td>
                A:
            </td>
            <td>
                <div class = "form-group">
                    <input type="text" pattern="[-0-9]*" required [(ngModel)]="model.firstInput" name="fInput" #fInput="ngModel">
                </div>
            </td>
            <td>
                B: 
            </td>
            <td>
                <div class = "form-group">
                    <input type="text" pattern="[-0-9]*" required [(ngModel)]="model.secondInput" name="sInput" #sInput="ngModel" >
                </div>
            </td>
            <td>
                <input type="submit" id="calculate" value="{{opType}}"/>
            </td>    
            <div style = "color:red" >
                <td >
                      <div *ngIf="f.submitted && fInput?.invalid" class="invalid-feedback" [hidden]="!submitted">
                        <div *ngIf="fInput?.errors?.required"> * A is Required.</div> 
                    </div>
                </td>                    
                <td>
                    <div *ngIf="fInput?.errors?.pattern">A must be a number.</div> 
                </td>
                <td>
                    <div *ngIf="f.submitted && sInput?.invalid" class="invalid-feedback" [hidden]="!submitted">
                        <div *ngIf="sInput?.errors?.required"> * B is Required.</div> 
                    </div>
                </td>
                  <td>
                    <div *ngIf="sInput?.errors?.pattern">B must be a number.</div> 
                </td>
            </div>
        </tr>
    </table>
    </form>
    `
})
export class ChildComponent {
    @Input()  // Reference to parent function. Ref provided by parent.
    public childFuncRef: Function;

    @Input()  // Store string provided by parent.
    public opType:string;

    model: any = {        
    };

    submitted = true;

    constructor() {       
    }

    public ngOnInit() {
        this.model.firstInput= '';
        this.model.secondInput= '';
    }

    callParent() {        
        this.childFuncRef(this.opType,this.model.firstInput,this.model.secondInput); 
        this.ngOnInit();
        this.submitted=false;
    }
    
    onSubmit() { 
        this.submitted = false; 
    }
}

