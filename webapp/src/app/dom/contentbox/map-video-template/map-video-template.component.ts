import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // npm install ngx-mapbox-gl mapbox-gl --save
import * as MapboxDraw from '@mapbox/mapbox-gl-draw'; // npm install @mapbox/mapbox-gl-draw
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-map-video-template',
  templateUrl: './map-video-template.component.html',
  styleUrls: ['./map-video-template.component.css']
})
export class MapVideoTemplateComponent implements OnInit {
  @Input() centre_latitude :string = "";
  @Input() centre_longitude :string = "";
  @Input() zoom_level :string = "";
  @Input() map_style :string = "";
  @Input() bbox_polygon :string = "";
  @Input() mv_title :string = "";
  @Input() author_name :string = "";
  @Input() tag_1 :string = "";
  @Input() tag_2 :string = "";
  @Input() tag_3 :string = "";
  @Input() mv_views :string = "";
  @Input() created_on :string = "";
  @Input() mv_length :string = "";
  @Input() mv_location :string = "";
  @Input() mv_mapId :number;

  constructor() {
    // Basic Angular Mapbox layout https://angularfirebase.com/lessons/build-realtime-maps-in-angular-with-mapbox-gl/
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.buildMap();
  }

  map: mapboxgl.Map;  
  buildMap() {
    this.map = new mapboxgl.Map({
      container: `map${this.mv_mapId}`,
      style: this.map_style, // https://evouala.zendesk.com/hc/en-us/articles/115001020212-Connect-Mapbox-basemap-resources
      zoom: this.zoom_level,
      center: [this.centre_longitude, this.centre_latitude],
      scrollZoom: false,
    });

  this.map.on('load', (event) => {
    // Youtube - https://www.youtube.com/watch?v=Zn3Xx-TSrM8
    this.map.addLayer({
      id: 'template_layer{{this.mv_mapId}}',
      // source: 'firebase',
      type: 'fill',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': JSON.parse(this.bbox_polygon)
          }
        }
      },
      'layout': {},
      'paint': {
        'fill-color': '#FF0000',
        'fill-opacity': 0.5
      }
      // layout: {
      //   'text-field': '{message}',
      //   'text-size': 24,
      //   'text-transform': 'uppercase',
      //   'icon-image': 'rocket-15',
      //   'text-offset': [0, 1.5]
      // },
      // paint: {
      //   'text-color': '#f16624',
      //   'text-halo-color': '#fff',
      //   'text-halo-width': 2
      // }
    })
  })

}

}
