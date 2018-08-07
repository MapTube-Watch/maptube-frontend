import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService1 } from '../http.service';

@Component({
  selector: 'app-map-video-watch',
  templateUrl: './map-video-watch.component.html',
  styleUrls: ['./map-video-watch.component.css'],
  providers: [HttpService1]
})
export class MapVideoWatchComponent implements OnInit {
  mv_watch_url: number;
  responseData: Object;
  errorData: Object;

  constructor(private route: ActivatedRoute, private http: HttpService1) { 

  }

  ngOnInit() {
    this.mv_watch_url = this.route.snapshot.params['mv_url']
    this.http.getHttpWatchContent("https://raw.githubusercontent.com/Zia-/Ally-gis-code-challenge-Solution/master/data/activity_points.geojson").subscribe(
      (response) => this.responseData = response,
      (error) => this.errorData = error
    );
  }

  onGet() {
    console.log(this.responseData)
  }

  // onGet() {
  //   this.http.getHttpWatchContent("https://raw.githubusercontent.com/Zia-/Ally-gis-code-challenge-Solution/master/data/activity_points.geojson1").subscribe(
  //     (response) => console.log(typeof(response)),
  //     (error) => console.log(error)
  //   );
  // }


  

}
