import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-map-video-watch',
  templateUrl: './map-video-watch.component.html',
  styleUrls: ['./map-video-watch.component.css'],
  providers: [HttpService]
})
export class MapVideoWatchComponent implements OnInit {
  mv_watch_url: number;
  responseBody: JSON;
  errorBody: String;

  constructor(private route: ActivatedRoute, private http: HttpService) { 

  }

  ngOnInit() {
    this.mv_watch_url = this.route.snapshot.params['mv_url']
    this.http.getHttpWatchContent("https://raw.githubusercontent.com/MapTube-Watch/maptube-json/master/sample_json/video_time.json").subscribe(
      (response) => this.responseBody = JSON.parse(response["_body"]),
      (error) => this.errorBody = error["_body"]
    );
  }

  onGet() {
    console.log(this.responseBody)
  }
  
}
