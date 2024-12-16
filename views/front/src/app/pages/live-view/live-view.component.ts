import {Component, Input} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {CommentatorComponent} from 'src/app/components/modification-categories/commentator/commentator.component';
import {TeamComponent} from 'src/app/components/modification-categories/team/team.component';
import {Match} from 'src/app/interfaces/match-interface';
import {LiveMatchService} from 'src/app/services/live-views/live-match.service';
import {MqttService} from 'src/app/services/MQTT/mqtt.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ObjectId} from 'mongoose';
import {StadiumService} from 'src/app/services/objects/stadium.service';
import {Stadium} from 'src/app/interfaces/stadium-interface';
import {TokenService} from 'src/app/services/token.service';
import {isEmpty} from "lodash";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import { GraphQLService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    NgForOf,
    NgOptimizedImage
  ],
  styleUrls: ['./live-view.component.css']
})
export class LiveViewComponent {
    liveMatches: Match[]  = [];  // the stadium here is just an id
    specificMatch!: Match;
    @Input() stadiumName!: string;
    matchWithAllData!: Match;
    stadiumHasMatch: boolean = false;
    homeTeamGoals: number = 0;
    awayTeamGoals: number = 0;
    backgroundColor: string = '#808080';
    homeTeamLogo: string = '../../../assets/images/default-team.png';
    awayTeamLogo: string = '../../../assets/images/default-team.png';
    homeTeamName: string = '';
    awayTeamName: string = '';
    // events: {
    //   playerName: string;
    //   event: string;
    //   playerTeam: string
    // }[] = [];
    events: [string,string,string][] = [];
    receivedData!: string;
    //we have 2 intervals and those ids will kill them
    matchIntervalId: any;
    historyOfMatchesIntervalId: any;
    pathToImage: string = '';
    showStadiumHistory: boolean = true;
    historyMatches: Match[] = [];
    constructor(private liveMatchService: LiveMatchService, private mqtt: MqttService, protected route: ActivatedRoute, private router: Router, private stadiumService: StadiumService, private graphQLService: GraphQLService){}

    async ngOnInit() {

      // Retrieve the data from the route parameters
      this.route.paramMap.subscribe((params) => {
        this.receivedData = (params.get('data') || '');
        console.log(`received data is ${this.receivedData}`);
      });
      this.pathToImage = `../../assets/images/Stadiums/${this.receivedData}/${this.receivedData}.jpg`;
      console.log(`The path to image is ${this.pathToImage}`);


      const data = await firstValueFrom(this.liveMatchService.getLiveMatches());
      console.log(data)
      this.liveMatches = data as [];

      console.log(`Size of the data is ${this.liveMatches.length}`);
      if(this.liveMatches.length === 0){
        this.stadiumHasMatch=false;
      }
      else {
        for(let i = 0; i<this.liveMatches.length; i++) {
          if (this.receivedData === this.liveMatches[i].stadium.name) {
            this.showStadiumHistory = false;
            this.homeTeamName = this.liveMatches[i].homeTeam.name;
            this.awayTeamName = this.liveMatches[i].awayTeam.name;
            console.log(`Home team name is ${this.homeTeamName}`);
            console.log(`Away team name is ${this.awayTeamName}`);
            //fill the events div
            await this.fillEvents(this.liveMatches[i]._id);
            // this.fillEvents(this.liveMatches[i]);
            if (!isEmpty(this.mqtt.receivedJson)) {
              this.homeTeamGoals = this.liveMatches[i].homeGoals;
              this.awayTeamGoals = this.liveMatches[i].awayGoals;
            }
            this.specificMatch = this.liveMatches[i];
            this.homeTeamLogo = this.specificMatch.homeTeam.logo;
            this.awayTeamLogo = this.specificMatch.awayTeam.logo;
            this.stadiumHasMatch = true;
          }
        }
      }


      console.log(`The stadium has match is ${this.stadiumHasMatch}`);
      if(this.stadiumHasMatch == true){
        console.log("I am entering hererererer");
        this.matchIntervalId = setInterval(async () => {
          if(this.mqtt.swich){
            console.log(this.mqtt.receivedJson);
            this.mqtt.swich = false;
            await this.refreshData();
            console.log(`The match that refreshes is ${this.matchWithAllData.homeTeam.name}`);
            console.log(`The match that refreshes is ${this.matchWithAllData.awayTeam.name}`);
            console.log(`The match that refreshes is ${this.matchWithAllData.homeGoals}`);
            console.log(`The match that refreshes is ${this.matchWithAllData.awayGoals}`);
            console.log(`the json is ${this.mqtt.receivedJson}`);
            if(this.mqtt.receivedJson.operation === 'goal')
              this.events.push([this.mqtt.receivedJson.player.name, this.mqtt.receivedJson.team.name, this.mqtt.receivedJson.operation]);
            else
              this.events.push([this.mqtt.receivedJson.player.name, this.mqtt.receivedJson.team.name, this.mqtt.receivedJson.card]);

              console.log(`Events length is ${this.events.length}`);
              console.log(this.events);
            if(this.mqtt.receivedJson.operation === 'goal')
              this.handleGoal();
            else
              this.handleCard();
          }
          await this.refreshData();
          //if endstate == true
          //clear interval and show the history of the matches
          console.log(`The end state of the match is ${this.matchWithAllData.endState}`);
          if(this.matchWithAllData.endState){
            console.log(`From inside the endstate true`);
            clearInterval(this.matchIntervalId);
            console.log(`From inside the endstate truem after clear interval`);
            this.resetData();

            //get the match histories
            //make the show history of matches equal to true;
            const data = await this.stadiumService.getStadiumHistoryMatches(this.matchWithAllData.stadium._id).toPromise();
            this.historyMatches = data as Match[];
            console.log(`The data of the history matches are going to be filled and it is ${this.historyMatches}`);

            this.showStadiumHistory = true;
            await this.ngOnInit();
          }
        }, 3000);
      }else{
        const res = await firstValueFrom(this.stadiumService.getAllStadiums()) as Stadium[];
        for(let i =0; i< res.length; i++){
          if(res[i].name === this.receivedData.replaceAll('-', ' ')){
            console.log(`The stad name is ${res[i].name}`);
            console.log(`The stad id is ${res[i]._id}`);
            // const data = await this.stadiumService.getStadiumHistoryMatches(res[i]._id).toPromise();
            this.stadiumService.getStadiumHistoryMatches(res[i]._id).subscribe((data)=>{
              this.historyMatches = data as Match[];
            });
            // this.historyMatches = data as Match[];
            break;
          }

        }

        this.historyOfMatchesIntervalId = setInterval(async () => {
          const data = await this.liveMatchService.getLiveMatches().toPromise();
          this.liveMatches = data as [];

          for(let i = 0; i<this.liveMatches.length; i++)
            if(this.receivedData === this.liveMatches[i].stadium.name){
              //kill the interval and then call ngOnInit() recursively to show the match now
              //set the boolean that shows the history of matches to false so that the html now will not show it
              clearInterval(this.historyOfMatchesIntervalId);
              await this.ngOnInit();
            }


        }, 3000);
      }
    }

    async fillEvents(matchId: ObjectId){
      this.events = await this.liveMatchService.getSortedEvents(matchId).toPromise();

      console.log(`Events length is ${this.events.length}`);
      console.log(this.events);
    }

    resetData(): void{
      this.stadiumHasMatch = false;
      this.events = [];
      this.homeTeamGoals = 0;
      this.awayTeamGoals = 0;
      this.homeTeamLogo = '../../../assets/images/default-team.png';
      this.awayTeamLogo = '../../../assets/images/default-team.png';
      this.backgroundColor = '#808080';
    }

    goToAdminPage(){
      console.log('Goint to Admin page');
      this.router.navigate(['/admin']);
    }

    goToMap(){
      console.log('going to map page');
      this.router.navigate(['/map']);
    }

    personType: string =TokenService.type;


    handleGoal(){
      //animation if there is time

      //set the new goals
      this.homeTeamGoals = this.matchWithAllData.homeGoals;
      this.awayTeamGoals = this.matchWithAllData.awayGoals;

      //change the background color of the html and commentator will make sound
      if(this.homeTeamGoals > this.awayTeamGoals){
        console.log('mah medhat is going to speak');
        CommentatorComponent.makeSound("win", this.matchWithAllData.commentator.name);
        this.backgroundColor = this.matchWithAllData.homeTeam.kit[0];
      }
      else if(this.homeTeamGoals < this.awayTeamGoals){
        console.log('mah medhat is going to speak');
        CommentatorComponent.makeSound("win", this.matchWithAllData.commentator.name);
        const homeColorRGB = TeamComponent.hex2rgb(this.matchWithAllData.homeTeam.kit[0]); // Home kit color
        const awayColorRGB = TeamComponent.hex2rgb(this.matchWithAllData.awayTeam.kit[0]); // Away kit color
        if (TeamComponent.isColorDifferent(homeColorRGB, awayColorRGB))
          this.backgroundColor = this.matchWithAllData.awayTeam.kit[0];
        else
          this.backgroundColor = this.matchWithAllData.awayTeam.kit[1];

      }else
        this.backgroundColor = '#808080';

    }

    handleCard(){
      //Commentator will make sound
      console.log('medhat is going to speak');
      CommentatorComponent.makeSound(this.mqtt.receivedJson.card, this.matchWithAllData.commentator.name);

      //animation if there is time


    }

    navigateBackToMap() {
      if(this.matchIntervalId)
        clearInterval(this.matchIntervalId);
      this.router.navigate(['/map'], {replaceUrl: true}).then();
    }

    async refreshData(){
      this.liveMatchService.getMatchWithAllData(this.specificMatch._id).subscribe((data: Match) => {
        this.matchWithAllData = data;
      });
    }
}
