import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    standalone: true,
    styleUrls: ['./map.component.css']
})
export class MapComponent {
  constructor(private router: Router) {}

  ngOnInit(){
    let map: google.maps.Map;
    let marker: google.maps.Marker;
    let r: Router = this.router;
    let stadiums = [
      { name: 'Old-Trafford', lat: 53.463056, lng: -2.291389 },
      { name: 'Anfield', lat: 53.430819, lng: -2.960828 },
      { name: 'Emirates-Stadium', lat: 51.555929, lng: -0.108410 },
      { name: 'Etihad', lat: 53.483089, lng: -2.200396 },
      { name: 'Stamford-Bridge', lat: 51.481696, lng: -0.190551 },
      { name: 'Tottenham-Hotspur-Stadium', lat: 51.604276, lng: -0.066434 },
      { name: 'Goodison-Park', lat: 53.438798, lng: -2.966308 },
      { name: 'Molineux-Stadium', lat: 52.590068, lng: -2.130042 },
      { name: 'Villa-Park', lat: 52.509131, lng: -1.884098 },
      { name: "Gtech-Community-Stadium",lat: 51.490715,lng: -0.289048},
      { name: 'Kenilworth-Road', lat: 51.883829798, lng: -0.425664964 },
      { name: 'St-James-Park', lat: 54.975556, lng: -1.621667 },
      { name: 'Bramall-Lane', lat: 53.370389, lng: -1.470627 },
      { name: 'Craven-Cottage', lat: 51.474722, lng: -0.221667 },
      { name: 'Selhurst-Park', lat: 51.398333, lng: -0.085556 },
      { name: 'The-City-Ground', lat: 52.937329584, lng: -1.126332828 },
      { name: 'Amex-Stadium', lat: 50.860833, lng: -0.083611 },
      { name: 'Vitality-Stadium', lat: 50.735121, lng: -1.838456 },
      { name: 'Turf-Moor', lat: 53.789167, lng: -2.230833 },
      { name: 'London-Stadium', lat: 51.538811, lng: -0.017136 },
    ];




    async function initMap(): Promise<void> {
      const { Map} = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

      map = new Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 51.509865, lng: -0.118092 },
        zoom: 6,
      });

      // Create a marker and set its position
      for(let i =0; i<stadiums.length; i++){
        marker = new google.maps.Marker({
          position: { lat: stadiums[i].lat, lng: stadiums[i].lng },
          map: map,
          title: stadiums[i].name, // Set a title for the marker (optional)
        });

        marker.addListener('click', () => {
          r.navigate(['/match', stadiums[i].name]);
          console.log(stadiums[i].name);
        });
    }

  }

  initMap();
  }

};


