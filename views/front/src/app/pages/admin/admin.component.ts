import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import {AdminDropdownComponent} from "../../components/admin-dropdown/admin-dropdown.component";
import {NgForOf, NgIf} from "@angular/common";

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

  constructor(private router: Router){}

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

}
