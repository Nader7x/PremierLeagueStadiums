import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { ObjectId } from 'mongoose';
import { PlayerService } from 'src/app/services/objects/player.service';

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

  constructor(private uiService: UiService, private playerService: PlayerService){}

  ngOnInit(): void{
    if(this.text === "Add")
      this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showModifyComponent = value);
    else if(this.text === "Delete")
      this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showModifyComponent = value);
    else
      this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showModifyComponent = value);

      this.playerService.getAllTeams().subscribe((data)=>{
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
    if(!this.name || !this.age || !this.kitNumber || !this.nationality || !this.selectedPosition || !this.selectedTeam ){
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

    }else{

    }

  }
}
