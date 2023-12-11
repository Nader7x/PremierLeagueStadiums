import { Component, Input, Output, EventEmitter , OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() text: string |undefined;
  @Input() color: string| undefined;
  @Output() btnClick = new EventEmitter();

  constructor(){
    console.log(`From button text is ${this.text}`);
  }
  // ngOnInit(): void{
  //   //like a promise
  //   console.log(`From on init text is ${this.text}`);
  // }
  onClick(){
    this.btnClick.emit();
  }
}
