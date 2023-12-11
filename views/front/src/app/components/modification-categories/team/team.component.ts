import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
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
  else
    this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showModifyComponent = value);
  }
}
