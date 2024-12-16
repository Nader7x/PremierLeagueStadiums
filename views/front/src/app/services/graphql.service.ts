import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {

  constructor(private apollo: Apollo) {}

  // Query to fetch data
  fetchData(query: string, variables?: any): Observable<any> {
    return this.apollo.query({
      query: gql`${query}`,
      variables: variables
    });
  }

  // Mutation to modify data
  mutateData(mutation: string, variables?: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`${mutation}`,
      variables: variables
    });
  }
}
