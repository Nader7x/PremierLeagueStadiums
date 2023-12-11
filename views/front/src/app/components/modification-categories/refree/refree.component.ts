import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-refree',
  templateUrl: './refree.component.html',
  styleUrls: ['./refree.component.css']
})
export class RefreeComponent {
  showModifyComponent: boolean = false;
  subscription!: Subscription;
  @Input() text!: string;
  constructor(private uiService: UiService){

  }
  ngOnInit(){
    if(this.text === "Add")
    this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
  else if(this.text === "Delete")
    this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
  }
}
