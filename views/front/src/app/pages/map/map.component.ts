import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphQLService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(private router: Router, private graphQLService: GraphQLService) {}

  ngOnInit() {
    const query = `
      query {
        stadiums {
          name
          lat
          lng
        }
      }
    `;

    this.graphQLService.fetchData(query).subscribe((result) => {
      const stadiums = result.data.stadiums;

      const r = this.router;
      let map: google.maps.Map;
      async function initMap(): Promise<void> {
        // Import Google Maps library with marker
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        // Create map instance with a map ID (use your actual map ID or 'DEMO_MAP_ID' for testing)
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: { lat: 51.509865, lng: -0.118092 },
          zoom: 6,
          mapId: '71a2a24d5c8a09a6', // Add your map ID here if needed
        });

        // Create advanced markers and add click event listeners
        for (let i = 0; i < stadiums.length; i++) {
          const advancedMarkerView = new AdvancedMarkerElement({
            position: { lat: stadiums[i].lat, lng: stadiums[i].lng },
            map: map,
            title: stadiums[i].name,
          });

          advancedMarkerView.addListener('click', () => {
            r.navigate(['/match', stadiums[i].name]);
            console.log('Navigating to:', stadiums[i].name);
          });
        }
      }

      initMap();
    });
  }
}
