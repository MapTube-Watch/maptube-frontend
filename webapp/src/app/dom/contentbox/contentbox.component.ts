import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contentbox',
  templateUrl: './contentbox.component.html',
  styleUrls: ['./contentbox.component.css']
})
export class ContentboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // mv_metaData :Array<any> = [
  //   [{"a":"1", "b":"2"}],
  //   [{"a":"10", "b":"20"}]
  // ]

  mv_metaData :Array<any> = [
    {"a":"1", "b":"2"},
    {"a":"10", "b":"20"},
    {"a":"1", "b":"2"},
    {"a":"10", "b":"20"},
    {"a":"1", "b":"2"},
    {"a":"10", "b":"20"},
    {"a":"1", "b":"2"},
    {"a":"10", "b":"20"},
    {"a":"1", "b":"2"},
    {"a":"10", "b":"20"},
    {"a":"1", "b":"2"},
    {"a":"10", "b":"20"}
  ]
  
}
