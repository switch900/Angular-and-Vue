import { Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template:` 
    <div style="padding:50px 50px 500px 32px;">  
        {{output}}
    </div>
    `
})
export class AboutPage {
    output : string

    ngOnInit(){
        this.output = "By Andrew Hewitson";
    }
}