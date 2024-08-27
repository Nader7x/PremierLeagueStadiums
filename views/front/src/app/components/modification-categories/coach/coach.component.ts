import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { CoachService } from 'src/app/services/objects/coach.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent {
  showModifyComponent: boolean = false;
  subscription!: Subscription;
  @Input() text!: string;
  @Output() onSubmitCoach: EventEmitter<any> = new EventEmitter();
  name!: string;
  age!: number;
  nationality!: string;
  coaches:{
    name: string,
    id: Object
  }[] = [];
  selectedCoach: string = '';

  constructor(private uiService: UiService, private coachService: CoachService){
  }

  ngOnInit(){
    if(this.text === "Add")
    this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
    else if(this.text ==="Delete"){
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
      this.coachService.getAllCoaches().subscribe((data)=>{
        for(let i=0; i<data.length; i++)
          this.coaches.push({name: data[i]['name'], id: data[i]['_id']});
      });
    }
    else
      this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showModifyComponent = value);
  }

  onSubmit(): void{
    // console.log(this.age,this.name,this.nationality);
    if(this.text === "Add"){
      if(!this.name || !this.age || !this.nationality ){
        alert('Please Enter all fields!!!');
        return;
      }
      const newCoach = {
        name: this.name,
        nationality : this.nationality,
        age: this.age
      }
      this.onSubmitCoach.emit(newCoach);
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
      for(let i=0; i<this.coaches.length; i++){
        if(this.coaches[i].name === this.selectedCoach){
          index = i;
          break;
        }
      }
      this.onSubmitCoach.emit(this.coaches[index].id);
    }

  }

}
