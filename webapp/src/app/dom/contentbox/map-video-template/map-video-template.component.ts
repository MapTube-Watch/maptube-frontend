import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-video-template',
  templateUrl: './map-video-template.component.html',
  styleUrls: ['./map-video-template.component.css']
})
export class MapVideoTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() mv_title :string = "";
  @Input() mv_description :string = "";
}
