import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { CommentatorService } from 'src/app/services/objects/commentator.service';
import { RefreeService } from 'src/app/services/objects/refree.service';
import { CoachService } from 'src/app/services/objects/coach.service';
import { TeamService } from 'src/app/services/objects/team.service';
import { PlayerService } from 'src/app/services/objects/player.service';
import { StadiumService } from 'src/app/services/objects/stadium.service';
import { AnyExpression, ObjectId } from 'mongoose';

@Component({
  selector: 'app-admin-dropdown',
  templateUrl: './admin-dropdown.component.html',
  styleUrls: ['./admin-dropdown.component.css']
})
export class AdminDropdownComponent {
  @Input() text!:string;
  subscription!: Subscription;
  showForm: boolean = false;
  selectedCategory: string = '';

  constructor(private uiService: UiService, private commentatorService: CommentatorService, private refereeService: RefreeService, private coachService: CoachService, private teamService: TeamService, private playerService: PlayerService, private stadiumService: StadiumService){
    console.log(this.text);
  }

  toggleAddTask(){
    console.log(`Toggling task for ${this.text}`);
    switch(this.text){
      case "Add":
        this.uiService.toggleModifyComponentAdd();
        break;
      case "Update":
        this.uiService.toggleModifyComponentUpdate();
        break;
      case "Delete":
        this.uiService.toggleDeleteModifyComponent();
        break;
    }
  }

  categories: string[] = [
    "Player", "Stadium", "Team", "Coach",
  ];

  ngOnInit(): void{
    //like a promise
    if(this.text !== "Update"){
      this.categories.push("Commentator");
      this.categories.push("Refree");
    }
    switch(this.text){
      case "Add":
        this.subscription = this.uiService.onAddToggle().subscribe((value) => this.showForm = value);
        break;
      case "Update":
        this.subscription = this.uiService.onUpdateToggle().subscribe((value) => this.showForm = value);
        break;
      case "Delete":
        this.subscription = this.uiService.onDeleteToggle().subscribe((value) => this.showForm = value);
        break;
    }
  }

  submitCommentator(commentator: ObjectId | any){
    
    if(this.text === 'Add'){
      console.log("Going to the service to post");
      this.commentatorService.addCommentator(commentator).subscribe();
    }else if(this.text === 'Update'){

    }else{
      console.log('deletingggg');
      // console.log(`the type is ${commentator}`);
      this.commentatorService.deleteCommentator(commentator).subscribe();
    }
  }

  submitReferee(referee: any | ObjectId){
    if(this.text === 'Add')
      this.refereeService.addReferee(referee).subscribe();
    else
      this.refereeService.deleteReferee(referee).subscribe();
    
  }

  submitCoach(coach: any | ObjectId){
    if(this.text === 'Add')
      this.coachService.addCoach(coach).subscribe();
    else
      this.coachService.deleteCoach(coach).subscribe();
    
  }

  submitTeam(team: any){
    if(this.text === 'Add'){
      console.log(`from submit team the team is ${team.homeKit}`);
      console.log(`from submit team the team is ${team.awayKit}`);
      this.teamService.addTeam(team).subscribe();
    }
  }

  submitPlayer(player: any){
    if(this.text === 'Add'){
      this.playerService.addPlayer(player).subscribe();
    }
  }

  submitStadium(stadium: any){
    if(this.text === 'Add'){
      this.stadiumService.addStadium(stadium).subscribe();
    }
  }
}
