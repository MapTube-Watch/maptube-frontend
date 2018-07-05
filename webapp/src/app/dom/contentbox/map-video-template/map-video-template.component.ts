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
  @Input() mv_title :string = "";
  @Input() mv_description :string = "";
  @Input() mv_mapId :number;

  constructor() {
    // Basic Angular Mapbox layout https://angularfirebase.com/lessons/build-realtime-maps-in-angular-with-mapbox-gl/
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  ngOnInit() {
    ////// 
    this.initializeMap()
    console.log(this.mv_mapId)

  }

  private initializeMap() {
    var this1 = this;
    setTimeout(function (){
      this1.buildMap();
    }, 1)
    
  }

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World!';

  // xx :string = `0${this.mv_mapId}`;
  

  buildMap() {
    this.map = new mapboxgl.Map({
      container: `map${this.mv_mapId}`,
      // container: `map0`,
      // container: `map`,
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
      scrollZoom: false,
    });

  this.map.on('load', (event) => {

    /// register source
    // this.map.addSource('firebase', {
    //    type: 'geojson',
    //    data: {
    //      type: 'FeatureCollection',
    //      features: []
    //    }
    // });

    /// get source
    // this.source = this.map.getSource('firebase')

    /// subscribe to realtime database and set data source
    // this.markers.subscribe(markers => {
    //     let data = new FeatureCollection(markers)
    //     this.source.setData(data)
    // })

    /// create map layers with realtime data
    // this.map.addLayer({
    //   id: 'firebase',
    //   source: 'firebase',
    //   type: 'symbol',
    //   layout: {
    //     'text-field': '{message}',
    //     'text-size': 24,
    //     'text-transform': 'uppercase',
    //     'icon-image': 'rocket-15',
    //     'text-offset': [0, 1.5]
    //   },
    //   paint: {
    //     'text-color': '#f16624',
    //     'text-halo-color': '#fff',
    //     'text-halo-width': 2
    //   }
    // })

  })

}

}
