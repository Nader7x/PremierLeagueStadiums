import { Component, Input, Output, EventEmitter , OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [
    NgStyle
  ],
  standalone: true
})
export class ButtonComponent {
  @Input() text: string |undefined;
  @Input() color: string| undefined;
  @Output() btnClick = new EventEmitter();

  constructor(){}
  // ngOnInit(): void{
  //   //like a promise
  //   console.log(`From on init text is ${this.text}`);
  // }
  onClick(){
    this.btnClick.emit();
  }
}
