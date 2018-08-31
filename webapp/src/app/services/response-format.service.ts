import * as _ from 'lodash';

import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ResponseFormatService {

    constructor(private _errorService: ErrorService) { 

    }

    getVideoMetadata(responseBody: JSON){
        // Return video metadata content.
        return _.get(responseBody, 'video_metadata', this._errorService.error600('video_metadata'))
    }

    getVideoAuthor(responseBody: JSON){
        // Return video metadata author content.
        return _.get(responseBody, 'video_metadata.author', this._errorService.error600('video_metadata>author'))
    }

    getVideoProperties(responseBody: JSON){
        // Return video metadata properties content.
        return _.get(responseBody, 'video_metadata.properties', this._errorService.error600('video_metadata>properties'))
    }

    getVideoFrames(responseBody: JSON){
        // Return frames content.
        return _.get(responseBody, 'video_data', this._errorService.error600("video_data"))
    }

    getVideoFrameCount(responseBody: JSON){
        // Return frame count
        var size:number = _.size(responseBody['video_data'])
        return this._errorService.errorCheckNull(size, `Frame count size`)
    }

    getVideoFrameIDs(responseBody: JSON){
        // Return All Frame IDs
        var frameIDs = Array<number>();
        _.forEach(responseBody['video_data'], function(frame) {
            frameIDs.push(frame.properties.frameID);
        });
        return frameIDs
    }

    getVideoFrameProperties(responseBody: JSON, frameID: number){
        // Return frame properties of given frame id
        var properties = null;
        _.forEach(responseBody['video_data'], function(frame) {
            if (frame.properties.frameID == frameID){
                properties = frame.properties
            }
        });
        return this._errorService.errorCheckNull(properties, `Frame Properties of Frame ID ${frameID}`)
    }

    getVideoFeatureCollections(responseBody: JSON, frameID: number){
        // Return feature collections of given frame id
        var featureCollection = null;
        _.forEach(responseBody['video_data'], function(frame) {
            if (frame.properties.frameID == frameID){
                featureCollection = frame.geojson
            }
        });
        return this._errorService.errorCheckNull(featureCollection, `Feature Collections of Frame ID ${frameID}`)
    }

    getVideoFeatureCollectionsAll(responseBody: JSON){
        var featureCollectionAll = Array<any>();
        _.forEach(responseBody['video_data'], function(frame) {
            featureCollectionAll.push(frame.geojson)
        })
        return featureCollectionAll
    }

    getVideoFeatureCollectionCount(responseBody: JSON, frameID: number){
        // Return total number of feature collections per frame ID
        var featureCollectionCount:number;
        _.forEach(responseBody['video_data'], function(frame) {
            if (frame.properties.frameID == frameID){
                featureCollectionCount = _.size(frame.geojson.features)
            }
        });
        return this._errorService.errorCheckNull(featureCollectionCount, `Feature Collections count of Frame ID ${frameID}`)
    }

    getVideoFeatureCollectionCountAll(responseBody: JSON){
        // Return total number of feature collections
        var featureCollectionCountAll:number = 0;
        _.forEach(responseBody['video_data'], function(frame) {
            featureCollectionCountAll += _.size(frame.geojson.features)
        });
        return this._errorService.errorCheckZero(featureCollectionCountAll, `Feature Collection count`)
    }

    getVideoFeatureCollectionIDs(responseBody: JSON, frameID: number){
        // Return Feature Collections IDs per frame ID
        var featureCollectionIDs = Array<number>();
        _.forEach(this.getVideoFeatureCollections(responseBody, frameID).features, function(features) {
            featureCollectionIDs.push(features.properties.featureID)
        })
        return featureCollectionIDs  
    }

    getVideoFeatureCollectionIDsAll(responseBody: JSON){
        // Return Feature Collections IDs with corresponding frame ID
        var frameAndFeatureCollectionIDs = Array<Array<number>>()
        var frameIDs: Array<number> = this.getVideoFrameIDs(responseBody);
        for (let id of frameIDs){
            var featureCollectionIDs: Array<number> = this.getVideoFeatureCollectionIDs(responseBody, id)
            for (let fid of featureCollectionIDs){
                var singleFrameFeatureCollectionID = Array<number>()
                singleFrameFeatureCollectionID.push(id, fid)
                frameAndFeatureCollectionIDs.push(singleFrameFeatureCollectionID)
            }
        }
        return frameAndFeatureCollectionIDs
    }

    getVideoFeatureCollectionProperties(responseBody: JSON, frameID: number, featureID: number){
        // Return Feature Collection properties per frame ID and feature ID
        var properties = null;
        _.forEach(this.getVideoFeatureCollections(responseBody, frameID).features, function(features) {
            if (features.properties.featureID == featureID){
                properties = features.properties
            }
        })
        return this._errorService.errorCheckNull(properties, `Feature Collection Properties of Feature ID ${featureID} of Frame ID ${frameID}`)
    }

    getVideoGeometryCollection(responseBody: JSON, frameID: number, featureID: number){
        // Return Geometry Collection per frame ID and feature ID
        var geometry = null;
        _.forEach(this.getVideoFeatureCollections(responseBody, frameID).features, function(features) {
            if (features.properties.featureID == featureID){
                geometry = features.geometry
            }
        })
        return this._errorService.errorCheckNull(geometry, `Geometry Collection of Feature ID ${featureID} of Frame ID ${frameID}`)
    }

    getVideoGeometryCollectionAll(responseBody: JSON){
        // Return Full Geometry Collection 
        var frameAndFeatureCollectionIDs: Array<Array<any>> = this.getVideoFeatureCollectionIDsAll(responseBody)
        var frameAndFeatureCollectionIDsPair = Array<Array<number>>();
        var geometryAll = Array<any>();
        _.forEach(frameAndFeatureCollectionIDs, function(pair){
            for (let id in pair[1]){
                var singleFrameFeatureCollectionIDsPair = Array<number>();
                singleFrameFeatureCollectionIDsPair.push(pair[0], pair[1][id])
                frameAndFeatureCollectionIDsPair.push(singleFrameFeatureCollectionIDsPair)
            }
        })
        for (let pair of frameAndFeatureCollectionIDsPair){
            geometryAll.push(this.getVideoGeometryCollection(responseBody, pair[0], pair[1]))
        }
        return geometryAll
    }

    getVideoGeometryCollectionCount(responseBody: JSON, frameID: number, featureID: number){
        // Return Geometry Collection Count per frame ID per feature ID
        var count: number = _.size(this.getVideoGeometryCollection(responseBody, frameID, featureID).geometries)
        return count
    }

    getVideoGeometryCollectionCountAll(responseBody: JSON){
        // Return total number of Geometry Collections Point, Line, Polygon etc.
        var geometryCollectionCountAll:number = 0;
        _.forEach(this.getVideoGeometryCollectionAll(responseBody), function(geometry) {
            geometryCollectionCountAll += geometry.geometries.length
            // featureCollectionCountAll += _.size(frame.geojson.features)
        });
        return this._errorService.errorCheckZero(geometryCollectionCountAll,`Geometry Collection count`)
    }

    getVideoGeometryCollectionIDs(responseBody: JSON, frameID: number, featureID: number){
        // Return Geometry Collection IDs per frame ID per feature ID
        var geometryCollectionIDs = Array<number>();
        _.forEach(this.getVideoGeometryCollection(responseBody, frameID, featureID).geometries, function(geometry) {
            geometryCollectionIDs.push(geometry.properties.geometryID)
        })
        return geometryCollectionIDs  
    }

    getVideoGeometryCollectionIDsAll(responseBody: JSON){
        // Return Geometry Collections IDs with corresponding frame ID and feature ID
        var frameFeatureCollGeometryCollIDs = Array<Array<number>>()
        var frameAndFeatureCollectionIDs: Array<Array<any>> = this.getVideoFeatureCollectionIDsAll(responseBody)
        for (let ids of frameAndFeatureCollectionIDs){
            var geometryCollectionIDs: Array<number> = this.getVideoGeometryCollectionIDs(responseBody, ids[0], ids[1])
            for (let fid of geometryCollectionIDs){
                var singleFrameFeatureCollGeometryCollID = Array<number>();
                singleFrameFeatureCollGeometryCollID.push(ids[0], ids[1], fid)
                frameFeatureCollGeometryCollIDs.push(singleFrameFeatureCollGeometryCollID)
            }
        }
        return frameFeatureCollGeometryCollIDs
    }

    getVideoGeometryCollectionProperties(responseBody: JSON, frameID: number, featureID: number, geometryID: number){
        // Return Geometry Collection properties per frame ID, feature ID and geometry ID
        var properties = null;
        _.forEach(this.getVideoGeometryCollection(responseBody, frameID, featureID).geometries, function(geometries) {
            if (geometries.properties.geometryID == geometryID){
                properties = geometries.properties
            }
        })
        return this._errorService.errorCheckNull(properties, `Geometry Collection Properties of Geometry ID ${geometryID} of Feature ID ${featureID} of Frame ID ${frameID}`)
    }

    getVideoGeometryCollectionCoordinates(responseBody: JSON, frameID: number, featureID: number, geometryID: number){
        // Return Geometry Collection coordinates per frame ID, feature ID and geometry ID
        var coordinates = Array<any>();
        _.forEach(this.getVideoGeometryCollection(responseBody, frameID, featureID).geometries, function(geometries) {
            if (geometries.properties.geometryID == geometryID){
                coordinates = geometries.coordinates
            }
        })
        return coordinates
    }
}