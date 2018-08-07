import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map-video-watch',
  templateUrl: './map-video-watch.component.html',
  styleUrls: ['./map-video-watch.component.css']
})
export class MapVideoWatchComponent implements OnInit {
  mv_watch_url: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.mv_watch_url = this.route.snapshot.params['mv_url']
  }

}
