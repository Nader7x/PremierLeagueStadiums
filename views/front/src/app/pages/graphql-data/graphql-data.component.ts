import { Component, OnInit } from '@angular/core';
import { GraphQLService } from 'src/app/services/graphql.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-graphql-data',
  templateUrl: './graphql-data.component.html',
  styleUrls: ['./graphql-data.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ]
})
export class GraphqlDataComponent implements OnInit {
  players: any[] = [];
  teams: any[] = [];
  matches: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  filter: string = '';

  constructor(private graphQLService: GraphQLService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const query = `
      query {
        players {
          id
          name
          age
          nationality
        }
        teams {
          id
          name
          wins
          loss
          draw
          points
        }
        matches {
          id
          homeTeam {
            name
          }
          awayTeam {
            name
          }
          date
          homeGoals
          awayGoals
        }
      }
    `;

    this.graphQLService.fetchData(query).subscribe((result) => {
      this.players = result.data.players;
      this.teams = result.data.teams;
      this.matches = result.data.matches;
      this.totalItems = this.players.length + this.teams.length + this.matches.length;
    });
  }

  get paginatedPlayers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.players.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get paginatedTeams() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.teams.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get paginatedMatches() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.matches.slice(startIndex, startIndex + this.itemsPerPage);
  }

  applyFilter() {
    this.fetchData();
    if (this.filter) {
      this.players = this.players.filter(player => player.name.toLowerCase().includes(this.filter.toLowerCase()));
      this.teams = this.teams.filter(team => team.name.toLowerCase().includes(this.filter.toLowerCase()));
      this.matches = this.matches.filter(match => match.homeTeam.name.toLowerCase().includes(this.filter.toLowerCase()) || match.awayTeam.name.toLowerCase().includes(this.filter.toLowerCase()));
    }
  }

  clearFilter() {
    this.filter = '';
    this.fetchData();
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
