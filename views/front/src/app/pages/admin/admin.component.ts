import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import {AdminDropdownComponent} from "../../components/admin-dropdown/admin-dropdown.component";
import {NgForOf, NgIf} from "@angular/common";
import { GraphQLService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: true,
  imports: [
    AdminDropdownComponent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  type: string = TokenService.type;

  constructor(private router: Router, private graphQLService: GraphQLService){}

  operations: string[] = [
    "Add", "Update", "Delete"
  ];

  goToAdminPage(){
    console.log('Goint to Admin page');
    this.router.navigate(['/admin']).then();
  }

  goToMap(){
    console.log('going to map page');
    this.router.navigate(['/map']).then();
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
      }
    `;

    this.graphQLService.fetchData(query).subscribe((result) => {
      console.log(result);
    });
  }

  addPlayer() {
    const mutation = `
      mutation {
        addPlayer(name: "John Doe", age: 25, nationality: "American", kitNumber: 10, position: "Forward", team: "teamId") {
          id
          name
        }
      }
    `;

    this.graphQLService.mutateData(mutation).subscribe((result) => {
      console.log(result);
    });
  }
}
