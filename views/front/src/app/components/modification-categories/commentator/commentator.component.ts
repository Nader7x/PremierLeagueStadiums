import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-commentator',
  templateUrl: './commentator.component.html',
  styleUrls: ['./commentator.component.css']
})
export class CommentatorComponent {
  @Output() onSubmitCommentator: EventEmitter<any> = new EventEmitter();
  showModifyComponent: boolean = false;
  subscription!: Subscription;
  @Input() text!: string;
  name!: string;
  age!: number;
  nationality!: string;
  
  constructor(private uiService: UiService){
  }

  ngOnInit():void{
    console.log(`from commentator the text is ${this.text}`);
    if(this.text === "Add")
      this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
    else if(this.text === "Delete")
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
  }

  onSubmit(): void{
    console.log(this.age,this.name,this.nationality);
    if(!this.name || !this.age || !this.nationality ){
      alert('Please Enter all fields!!!');
      return;
    }



    if(this.text === "Add"){
      const newCommentator = {
        name: this.name,
        nationality : this.nationality,
        age: this.age
      }
      this.onSubmitCommentator.emit(newCommentator);
      this.name = '';
      this.age = 0;
      this.nationality = '';
    }else if(this.text === "Update"){

    }else{

    }

  }


}
