import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphqlDataComponent } from './pages/graphql-data/graphql-data.component';

const routes: Routes = [
  { path: 'graphql-data', component: GraphqlDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
