import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DomComponent } from './dom/dom.component';
import { TopnavbarComponent } from './dom/topnavbar/topnavbar.component';
import { LeftsidebarComponent } from './dom/leftsidebar/leftsidebar.component';
import { ContentboxComponent } from './dom/contentbox/contentbox.component';
import { MapVideoTemplateComponent } from './dom/contentbox/map-video-template/map-video-template.component';
import { MapVideoWatchComponent } from './map-video-watch/map-video-watch.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  { path: '', component: DomComponent},
  { path: 'watch/:mv_url', component: MapVideoWatchComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    DomComponent,
    TopnavbarComponent,
    LeftsidebarComponent,
    ContentboxComponent,
    MapVideoTemplateComponent,
    MapVideoWatchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
