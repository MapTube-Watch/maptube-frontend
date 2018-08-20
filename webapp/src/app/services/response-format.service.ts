import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class ResponseFormatService {

    getVideoMetadata(responseBody: JSON){
        return responseBody["video_metadata"]
    }

    getVideoMetadataAuthor(responseBody: JSON){
        return responseBody["video_metadata"]["author"]
    }

    getVideoMetadataProperties(responseBody: JSON){
        return responseBody["video_metadata"]["properties"]
    }

    getVideoData(responseBody: JSON){
        return responseBody["video_data"]
    }

    getVideoDataFrameCount(responseBody: JSON){
        return responseBody["video_data"].length
    }

    getVideoDataFrameProperties(responseBody: JSON, frameCount: number){
        return responseBody["video_data"][frameCount]["properties"]
    }

    getVideoDataFrameFeatureCollection(responseBody: JSON, frameCount: number){
        return responseBody["video_data"][frameCount]["geojson"]
    }

    getVideoDataFrameFeatureCollectionCount(responseBody: JSON, frameCount: number){
        return responseBody["video_data"][frameCount]["geojson"]["features"].length
    }

    getVideoDataFrameFeatureCollectionProperties(responseBody: JSON, frameCount: number, featureCollectionCount: number){
        return responseBody["video_data"][frameCount]["geojson"]["features"][featureCollectionCount]["properties"]
    }

    getVideoDataFrameFeatureCollectionGeometryCollection(responseBody: JSON, frameCount: number, featureCollectionCount: number){
        return responseBody["video_data"][frameCount]["geojson"]["features"][featureCollectionCount]["geometry"]
    }

    getVideoDataFrameFeatureCollectionGeometryCollectionCount(responseBody: JSON, frameCount: number, featureCollectionCount: number){
        return responseBody["video_data"][frameCount]["geojson"]["features"][featureCollectionCount]["geometry"]["geometries"].length
    }

    getVideoDataFrameFeatureCollectionGeometryCollectionProperties(responseBody: JSON, frameCount: number, featureCollectionCount: number, geometryCollection: number){
        return responseBody["video_data"][frameCount]["geojson"]["features"][featureCollectionCount]["geometry"]["geometries"][geometryCollection]["properties"]
    }

    getVideoDataFrameFeatureCollectionGeometryCollectionSingleGeometry(responseBody: JSON, frameCount: number, featureCollectionCount: number, geometryCollection: number){
        return responseBody["video_data"][frameCount]["geojson"]["features"][featureCollectionCount]["geometry"]["geometries"][geometryCollection]["coordinates"]
    }

}