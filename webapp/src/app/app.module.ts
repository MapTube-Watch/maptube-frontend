import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DomComponent } from './dom/dom.component';
import { TopnavbarComponent } from './dom/topnavbar/topnavbar.component';
import { LeftsidebarComponent } from './dom/leftsidebar/leftsidebar.component';
import { ContentboxComponent } from './dom/contentbox/contentbox.component';
import { MapVideoTemplateComponent } from './dom/contentbox/map-video-template/map-video-template.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DomComponent,
    TopnavbarComponent,
    LeftsidebarComponent,
    ContentboxComponent,
    MapVideoTemplateComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
