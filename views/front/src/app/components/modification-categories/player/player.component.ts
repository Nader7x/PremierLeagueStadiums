import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { ObjectId } from 'mongoose';
import { PlayerService } from 'src/app/services/objects/player.service';
import { TeamService } from 'src/app/services/objects/team.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  showModifyComponent: boolean = false;
  subscription!: Subscription;
  @Input() text!: string;
  @Output() onSubmitPlayer: EventEmitter<any> = new EventEmitter();
  selectedTeam: string = '';
  teams:{
    name: string,
    id: ObjectId
  }[] = [];
  name!: string;
  age!: number;
  nationality!:string;
  kitNumber!: number;
  selectedPosition: string = '';

  selectedTeam2: string = '';
  teams2:{
    name: string,
    id: ObjectId
  }[] = [];

  listOfTeamsWithPlayers:{
    name: string,
    squad: {
      _id: ObjectId,
      name: string,
      type: string,
      nationality: string,
      kitNumber: number,
      position: string
    }[]
  }[]= [];
  selectedPlayer: string = '';

  selectedSquad: {
    _id: ObjectId,
    name: string,
    type: string,
    nationality: string,
    kitNumber: number, 
    position: string
  }[] = [];
  chosenATeam: boolean = false;
  chosenPlayerToUpdate: boolean = false;
  playersAllAttributes: {
    _id: ObjectId,
    name: string,
    type: string,
    nationality: string,
    kitNumber: number,
    position: string,
    team: ObjectId,
    v: number,

  }[] = [];
  selectedPlayerAttributes: {
    _id?: ObjectId,
    name: string,
    nationality: string,
    kitNumber: number,
    position: string
  } = {
    name: '',
    kitNumber: 0,
    nationality: '',
    position: ''
  };


  constructor(private uiService: UiService, private playerService: PlayerService, private teamService: TeamService){}

  ngOnInit(): void{
    if(this.text === "Add"){
      this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
      this.teamService.getAllTeams().subscribe((data)=>{
        console.log(`size of data is ${data.length}`);
        for(let i=0; i<data.length; i++){
          this.teams.push({name: data[i]['name'], id: data[i]['_id']});
        }
      });

    }
    else if(this.text === "Delete"){
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
      this.teamService.getAllTeamsWithPlayers().subscribe((data)=>{
        for(let i=0; i<data.length; i++){
          this.listOfTeamsWithPlayers.push({name: data[i]['name'], squad: data[i]['squad']});
          this.teams2.push({name: data[i]['name'], id: data[i]['_id']});
        }
        console.log(this.listOfTeamsWithPlayers);
      });
    }
    else{
      this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showModifyComponent = value);
      this.teamService.getAllTeamsWithPlayers().subscribe((data)=>{
        for(let i=0; i<data.length; i++){
          console.log(data[i].squad);
          this.listOfTeamsWithPlayers.push({name: data[i]['name'], squad: data[i]['squad']});
          this.teams2.push({name: data[i]['name'], id: data[i]['_id']});
        }
        console.log(this.playersAllAttributes);
      });
    }
      

  }

  onTeamSelected(){

    for(let i=0; i<this.teams2.length; i++){
      if(this.selectedTeam2 === this.teams2[i].name){
        this.playerService.getAllPlayersOfSpecificTeam(this.teams2[i].id).subscribe((data)=>{
          this.selectedSquad = data;
        });
      }
    }

    this.chosenATeam = true;
    for(let i = 0; i<this.listOfTeamsWithPlayers.length; i++){
      if(this.selectedTeam2 === this.listOfTeamsWithPlayers[i].name){
        this.selectedSquad = this.listOfTeamsWithPlayers[i].squad;
        break;
      }
    }
  
  }

  showSelectedPlayerAttributes(){
  
    console.log('hi from showseledted attributes');
    this.chosenPlayerToUpdate = true;

    for(let i=0; i<this.selectedSquad.length; i++){
      console.log(this.selectedSquad[i]._id);
      console.log(this.selectedSquad[i].name);
      console.log(this.selectedSquad[i].type);
      console.log(this.selectedSquad[i].position);
    }
    
    for(let i=0; i< this.selectedSquad.length; i++)
      if(this.selectedSquad[i].name === this.selectedPlayer){
        this.selectedPlayerAttributes.name = this.selectedSquad[i].name;
        this.selectedPlayerAttributes.kitNumber = this.selectedSquad[i].kitNumber;
        this.selectedPlayerAttributes.nationality = this.selectedSquad[i].nationality;
        this.selectedPlayerAttributes.position = this.selectedSquad[i].position;
        this.selectedPlayerAttributes._id = this.selectedSquad[i]._id;
        break;
      }
    
  }


  onSubmit(): void{
    if(this.text === "Add"){
      if(!this.name || !this.age || !this.kitNumber || !this.nationality || !this.selectedPosition || !this.selectedTeam ){
        alert('Please Enter all fields!!!');
        return;
      }
      let index = 0;
      for(let i=0; i<this.teams.length; i++){
        if(this.teams[i].name === this.selectedTeam){
          index = i;
          break;
        }
      }
      const newPlayer = {
        name: this.name,
        age : this.age,
        nationality: this.nationality,
        kitNumber: this.kitNumber,
        position: this.selectedPosition,
        team: this.teams[index].id
      }

      this.onSubmitPlayer.emit(newPlayer);
      this.name = '';
      this.age = 0;
      this.nationality = '';
      this.selectedPosition = '';
      this.kitNumber = 0;
      this.selectedTeam = '';
    }else if(this.text === "Update"){
      console.log("Entering update");
      if(!this.selectedPlayerAttributes.name  || !this.selectedPlayerAttributes.kitNumber || !this.selectedPlayerAttributes.nationality){
        alert('Please Enter all fields!!!');
        return;
      }

      this.onSubmitPlayer.emit(this.selectedPlayerAttributes);
    }else{
       let index: number = 0;
       for(let i=0; i<this.selectedSquad.length; i++){
          if(this.selectedSquad[i].name === this.selectedPlayer){
            index = i;
            break;
          }
       }
       this.onSubmitPlayer.emit(this.selectedSquad[index]._id);
    }

  }
}
