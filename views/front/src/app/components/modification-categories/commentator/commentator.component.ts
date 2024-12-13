import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { CommentatorService } from 'src/app/services/objects/commentator.service';
import { ObjectId } from 'mongoose';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-commentator',
  templateUrl: './commentator.component.html',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
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
  commentators:{
    name: string,
    id: ObjectId
  }[] = [];
  selectedCommentator: string = '';

  constructor(private uiService: UiService, private commentatorService: CommentatorService){
  }

  ngOnInit():void{
    console.log(`from commentator the text is ${this.text}`);
    if(this.text === "Add")
      this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
    else if(this.text === "Delete"){
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
      this.commentatorService.getAllCommentators().subscribe((data)=>{
        for(let i=0; i<data.length; i++){
          // this.coaches.push(data[i]['name']);
          this.commentators.push({name: data[i]['name'], id: data[i]['_id']});
          // console.log('pushed');
          // console.log(this.commentator[i].id);
        }
      });

    }

  }

  static makeSound(event: string, commentatorName: string){
    let randomNum: number = Math.floor(Math.random() * (3 - 1) + 1);
    if(event === "win")
      event = `${event}${randomNum}`;

    const src: string = `../../../assets/audio/${commentatorName} ${event}.mp3`;
    let audio = new Audio(src);
    try{

      audio.play();
    }catch(err){
      console.log(err);
    }
  }


  onSubmit(): void{
    // console.log(this.age,this.name,this.nationality);

    if(this.text === "Add"){
      if(!this.name || !this.age || !this.nationality ){
        alert('Please Enter all fields!!!');
        return;
      }

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
      if(!this.name || !this.age || !this.nationality ){
        alert('Please Enter all fields!!!');
        return;
      }
    }else{
      let index: number = 0;
      for(let i=0; i<this.commentators.length; i++){
        if(this.commentators[i].name === this.selectedCommentator){
          index = i;
          break;
        }
      }
      this.onSubmitCommentator.emit(this.commentators[index].id);
    }

  }


}
