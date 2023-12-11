import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { CommentatorService } from 'src/app/services/objects/commentator.service';

@Component({
  selector: 'app-admin-dropdown',
  templateUrl: './admin-dropdown.component.html',
  styleUrls: ['./admin-dropdown.component.css']
})
export class AdminDropdownComponent {
  @Input() text!:string;
  subscription!: Subscription;
  showForm: boolean = false;
  selectedCategory: string = '';

  constructor(private uiService: UiService, private commentatorService: CommentatorService){
    console.log(this.text);
  }

  toggleAddTask(){
    console.log(`Toggling task for ${this.text}`);
    switch(this.text){
      case "Add":
        this.uiService.toggleModifyComponentAdd();
        break;
      case "Update":
        this.uiService.toggleModifyComponentUpdate();
        break;
      case "Delete":
        this.uiService.toggleDeleteModifyComponent();
        break;
    }
  }

  categories: string[] = [
    "Player", "Stadium", "Team", "Coach",
  ];

  ngOnInit(): void{
    //like a promise
    if(this.text !== "Update"){
      this.categories.push("Commentator");
      this.categories.push("Refree");
    }
    switch(this.text){
      case "Add":
        this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showForm = value);
        break;
      case "Update":
        this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showForm = value);
        break;
      case "Delete":
        this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showForm = value);
        break;
    }
  }

  submitCommentator(commentator: any){
    console.log('addd');
    if(this.text === 'Add'){
      console.log("Going to the service to post");
      this.commentatorService.addCommentator(commentator).subscribe();
    }
      
  }
  
}
