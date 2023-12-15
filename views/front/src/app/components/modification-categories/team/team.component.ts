import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { TeamService } from 'src/app/services/objects/team.service';
import { PlayerService } from 'src/app/services/objects/player.service';
import { CoachService } from 'src/app/services/objects/coach.service';
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

  teams:{
    name: string,
    id: ObjectId
  }[]  = [];

  selectedTeam: string = '';

  selectedTeamAttributes: {
    _id?: ObjectId,
    name: string,
    homeKit: string,
    awayKit: string,
    logo: string
  } = {
    name: '',
    homeKit: '',
    awayKit: '',
    logo: ''
  };

  teamsAllAttributes: {
    _id: ObjectId,
    name: string,
    squad: [],
    coach: ObjectId,
    wins: number,
    loss: number,
    draw: number,
    kit: string[],
    v: number,
    stadium: ObjectId,
    logo: string

  }[] = [];
  chosenTeamToUpdate: boolean = false;


  constructor(private uiService: UiService, private teamService: TeamService, private playerService: PlayerService, private coachService: CoachService){}


  ngOnInit(){
    this.homeKit = '#ff0000';
    this.awayKit = '#ff0000';
    if(this.text === "Add"){
      this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
      this.coachService.getAllCoaches().subscribe((data)=>{
        for(let i=0; i<data.length; i++){
          this.coaches.push({name: data[i]['name'], id: data[i]['_id']});
        }
      });
    }
    else if(this.text === "Delete"){
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
      this.teamService.getAllTeams().subscribe((data)=>{
        for(let i=0; i<data.length; i++){
          this.teams.push({name: data[i]['name'], id: data[i]['_id']});
        }
      });
    }
    else{
      this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showModifyComponent = value);
      this.teamService.getAllTeams().subscribe((data)=>{
          this.teamsAllAttributes = data;
      });

    }
  }


  showSelectedTeamAttributes(){
    this.chosenTeamToUpdate = true;

    for(let i=0; i< this.teamsAllAttributes.length; i++)
      if(this.teamsAllAttributes[i].name === this.selectedTeam){
        this.selectedTeamAttributes.name = this.teamsAllAttributes[i].name;
        this.selectedTeamAttributes.homeKit = this.teamsAllAttributes[i].kit[0];
        this.selectedTeamAttributes.awayKit = this.teamsAllAttributes[i].kit[1];
        this.selectedTeamAttributes.logo = this.teamsAllAttributes[i].logo;
        this.selectedTeamAttributes._id = this.teamsAllAttributes[i]._id;
        break;
      }
  }

  onSubmit(): void{

    if(this.text === "Add"){
      if(!this.name || !this.logo ){
        alert('Please Enter all fields!!!');
        return;
      }
      let index = 0;

      for(let i=0; i<this.coaches.length; i++){
        if(this.coaches[i].name === this.selectedCoach){
          index = i;
          break;
        }
      }
      const newTeam = {
        name: this.name,
        kit: [this.homeKit, this.awayKit],
        logo: this.logo,
        coach: this.coaches[index].id
      }
      this.onSubmitTeam.emit(newTeam);
      this.name = '';
      this.homeKit = '#ff0000';
      this.awayKit = '#ff0000';
      this.logo = '';
      this.selectedCoach = '';
      
    }else if(this.text === "Update"){
      if(!this.selectedTeamAttributes.name || !this.selectedTeamAttributes.logo ){
        alert('Please Enter all fields!!!');
        return;
      }

      this.onSubmitTeam.emit(this.selectedTeamAttributes);

    }else{
      let index: number = 0;
      for(let i=0; i<this.teams.length; i++){
        if(this.teams[i].name === this.selectedTeam){
          index = i;
          break;
        }
      }
      this.onSubmitTeam.emit(this.teams[index].id);
    }
    this.teams = [];

  }

  

}
