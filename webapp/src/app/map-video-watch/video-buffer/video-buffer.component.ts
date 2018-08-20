import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // npm install ngx-mapbox-gl mapbox-gl --save
import * as MapboxDraw from '@mapbox/mapbox-gl-draw'; // npm install @mapbox/mapbox-gl-draw
import { environment } from '../../../environments/environment';
import { ResponseFormatService } from '../../services/response-format.service';

@Component({
  selector: 'app-video-buffer',
  templateUrl: './video-buffer.component.html',
  styleUrls: ['./video-buffer.component.css'],
  providers: [ResponseFormatService]
})
export class VideoBufferComponent implements OnInit {
  @Input() responseBody: JSON;


  constructor(private reponseFormatService: ResponseFormatService) { 
    // Basic Angular Mapbox layout https://angularfirebase.com/lessons/build-realtime-maps-in-angular-with-mapbox-gl/
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  ngOnInit() {
    console.log("full body", this.responseBody);
    console.log("full metadata", this.reponseFormatService.getVideoMetadata(this.responseBody))
    console.log("metadata author", this.reponseFormatService.getVideoMetadataAuthor(this.responseBody))
    console.log("metadata properties", this.reponseFormatService.getVideoMetadataProperties(this.responseBody))
    console.log("full data", this.reponseFormatService.getVideoData(this.responseBody))
    console.log("data frame count", this.reponseFormatService.getVideoDataFrameCount(this.responseBody))
    console.log("data frame count", this.reponseFormatService.getVideoDataFrameProperties(this.responseBody, 1))
    console.log("data frame count", this.reponseFormatService.getVideoDataFrameFeatureCollection(this.responseBody, 1))
    console.log("data frame count", this.reponseFormatService.getVideoDataFrameFeatureCollectionCount(this.responseBody, 1))
    console.log("data frame count", this.reponseFormatService.getVideoDataFrameFeatureCollectionProperties(this.responseBody, 1, 1))
    console.log("data frame count", this.reponseFormatService.getVideoDataFrameFeatureCollectionGeometryCollection(this.responseBody, 1, 1))
    console.log("data frame count", this.reponseFormatService.getVideoDataFrameFeatureCollectionGeometryCollectionCount(this.responseBody, 1, 1))
    console.log("data frame count", this.reponseFormatService.getVideoDataFrameFeatureCollectionGeometryCollectionProperties(this.responseBody, 1, 1, 0))
    console.log("data frame count", this.reponseFormatService.getVideoDataFrameFeatureCollectionGeometryCollectionSingleGeometry(this.responseBody, 1, 1, 0))
  }

  ngAfterViewInit(){
    // this.buildMap();    
  }

  // map: mapboxgl.Map;
  // buildMap() {
  //   this.map = new mapboxgl.Map({
  //     container: `mapDiv`,
  //     style: "mapbox://styles/mapbox/dark-v9", // https://evouala.zendesk.com/hc/en-us/articles/115001020212-Connect-Mapbox-basemap-resources
  //     zoom: 0,
  //     center: [0, 0]
  //   });
  //   this.map.on('load', (event) => {
  //     // Youtube - https://www.youtube.com/watch?v=Zn3Xx-TSrM8
  //     this.map.addLayer(*** Return list as given in map-video-template.component.ts - Make a SERVICE -  *** )
  //   })
  // }

}
