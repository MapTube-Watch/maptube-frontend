import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-no-video',
  templateUrl: './error-no-video.component.html',
  styleUrls: ['./error-no-video.component.css']
})
export class ErrorNoVideoComponent implements OnInit {
  @Input() errorBody: String;

  constructor() { }

  ngOnInit() {
  }

}
