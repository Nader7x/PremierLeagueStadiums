import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { PlayerService } from 'src/app/services/objects/player.service';
import { TeamService } from 'src/app/services/objects/team.service';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent {
  showModifyComponent: boolean = false;
  subscription!: Subscription;
  @Input() text!: string;
  @Output() onSubmitStadium: EventEmitter<any> = new EventEmitter();
  selectedTeam: string = '';
  teams:{
    name: string,
    id: ObjectId
  }[] = [];
  name!:string;
  capacity!:number;

  constructor(private uiService: UiService, private playerService: PlayerService, private teamService: TeamService ){}

  ngOnInit(){
    if(this.text === "Add")
    this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
    else if(this.text === "Delete")
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
    else
      this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showModifyComponent = value);

      this.teamService.getAllTeams().subscribe((data)=>{
        // console.log(typeof(data[1]['name']));
        console.log(`size of data is ${data.length}`);
        for(let i=0; i<data.length; i++){
          this.teams.push({name: data[i]['name'], id: data[i]['_id']});
          // console.log('pushed');
          // console.log(this.teams[i].id);
        }
      });
  }


  onSubmit(): void{
    if(!this.name || !this.capacity || !this.selectedTeam){
      alert('Please Enter all fields!!!');
      return;
    }

    if(this.text === "Add"){
      let index = 0;
      for(let i=0; i<this.teams.length; i++){
        if(this.teams[i].name === this.selectedTeam){
          index = i;
          break;
        }
      }
      const newStadium = {
        homeTeam: this.teams[index].id,
        name: this.name,
        capacity : this.capacity,
      }

      this.onSubmitStadium.emit(newStadium);
      this.name = '';
      this.capacity = 0;
      this.selectedTeam = '';
    }else if(this.text === "Update"){

    }else{

    }

  }
}
