import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { TeamService } from 'src/app/services/objects/team.service';
import { Subscription } from 'rxjs';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  showModifyComponent: boolean = false;
  subscription!: Subscription;
  @Input() text!: string;
  @Output() onSubmitTeam: EventEmitter<any> = new EventEmitter();
  name!:string;
  homeKit: string = '#ff0000';
  awayKit: string = '#ff0000';
  logo!:string;
  coach!: string;
  selectedCoach: string = '';
  coaches:{
    name: string,
    id: ObjectId
  }[] = [];


  constructor(private uiService: UiService, private teamService: TeamService){}


  ngOnInit(){
    this.homeKit = '#ff0000';
    this.awayKit = '#ff0000';
    if(this.text === "Add")
    this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
    else if(this.text === "Delete")
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
    else
      this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showModifyComponent = value);


    this.teamService.getAllCoaches().subscribe((data)=>{
      console.log(typeof(data[1]['name']));
      console.log(`size of data is ${data.length}`);
      for(let i=0; i<data.length; i++){
        // this.coaches.push(data[i]['name']);
        this.coaches.push({name: data[i]['name'], id: data[i]['_id']});
        console.log('pushed');
        console.log(this.coaches[i].id);
      }
    });
   
  }


  

  onSubmit(): void{
    // console.log(this.age,this.name,this.nationality);
    if(!this.name || !this.homeKit || !this.awayKit || !this.logo ){
      alert('Please Enter all fields!!!');
      return;
    }

    if(this.text === "Add"){
      let index = 0;
      console.log(`Selected Coach is ${this.selectedCoach}` );
      for(let i=0; i<this.coaches.length; i++){
        console.log(`${this.coaches[i].name} --> ${this.coaches[i].id}`);
      }
      for(let i=0; i<this.coaches.length; i++){
        if(this.coaches[i].name === this.selectedCoach){
          index = i;
          break;
        }
      }
      const newTeam = {
        name: this.name,
        homeKit : this.homeKit,
        awayKit: this.awayKit,
        logo: this.logo,
        coach: this.coaches[index].id
      }
      console.log(`Data that will be posted is ${newTeam.coach}`);
      this.onSubmitTeam.emit(newTeam);
      this.name = '';
      this.homeKit = '#ff0000';
      this.awayKit = '#ff0000';
      this.logo = '';
      this.selectedCoach = '';
    }else if(this.text === "Update"){

    }else{

    }

  }

  

}
