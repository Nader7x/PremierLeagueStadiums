import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { RefreeService } from 'src/app/services/objects/refree.service';

@Component({
  selector: 'app-refree',
  templateUrl: './refree.component.html',
  styleUrls: ['./refree.component.css']
})
export class RefreeComponent {
  showModifyComponent: boolean = false;
  subscription!: Subscription;
  @Input() text!: string;
  @Output() onSubmitReferee: EventEmitter<any> = new EventEmitter();
  name!: string;
  age!: number;
  nationality!: string;
  referees:{
    name: string,
    id: Object
  }[] = [];
  selectedReferees: string = '';

  constructor(private uiService: UiService, private refereeService: RefreeService){

  }
  ngOnInit(){
    if(this.text === "Add")
    this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
    else if(this.text === "Delete"){
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
      this.refereeService.getAllReferees().subscribe((data)=>{
        for(let i=0; i<data.length; i++){
          // this.coaches.push(data[i]['name']);
          this.referees.push({name: data[i]['name'], id: data[i]['_id']});
          // console.log('pushed');
          // console.log(this.commentator[i].id);
        }
      });
    }
    
  }


  onSubmit(): void{
    // console.log(this.age,this.name,this.nationality);

    if(this.text === "Add"){
      if(!this.name || !this.age || !this.nationality ){
        alert('Please Enter all fields!!!');
        return;
      }
      const newReferee = {
        name: this.name,
        nationality : this.nationality,
        age: this.age
      }
      this.onSubmitReferee.emit(newReferee);
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
      for(let i=0; i<this.referees.length; i++){
        if(this.referees[i].name === this.selectedReferees){
          index = i;
          break;
        }
      }
      this.onSubmitReferee.emit(this.referees[index].id);
    }

  }

}
