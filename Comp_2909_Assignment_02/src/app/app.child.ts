import { Component, Input} from '@angular/core';

@Component({
  selector: 'child',
  templateUrl: './app.child.html',
})

export class ChildComponent {

    @Input()
    _childMovieArray;

    ngOnInit(){
    }
}
