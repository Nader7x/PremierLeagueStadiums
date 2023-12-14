import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { TeamService } from 'src/app/services/objects/team.service';
import { PlayerService } from 'src/app/services/objects/player.service';
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


  constructor(private uiService: UiService, private teamService: TeamService, private playerService: PlayerService){}


  ngOnInit(){
    this.homeKit = '#ff0000';
    this.awayKit = '#ff0000';
    if(this.text === "Add"){
      this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
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
    else if(this.text === "Delete"){
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
      this.playerService.getAllTeams().subscribe((data)=>{
        for(let i=0; i<data.length; i++){
          // this.coaches.push(data[i]['name']);
          this.teams.push({name: data[i]['name'], id: data[i]['_id']});
          // console.log('pushed');
          // console.log(this.commentator[i].id);
        }
      });
    }
    else{
      this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showModifyComponent = value);
      this.playerService.getAllTeams().subscribe((data)=>{
          
          // this.coaches.push(data[i]['name']);
          this.teamsAllAttributes = data;
          // console.log('pushed');
          // console.log(this.commentator[i].id);
        
        console.log(`Teams all attributes -> ${this.teamsAllAttributes}`);
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
        console.log(`omar id ----> ${this.teamsAllAttributes[i]._id}`);
        break;
      }
  }

  onSubmit(): void{
    // console.log(this.age,this.name,this.nationality);
    
    if(this.text === "Add"){
      if(!this.name || !this.homeKit || !this.awayKit || !this.logo ){
        alert('Please Enter all fields!!!');
        return;
      }
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
