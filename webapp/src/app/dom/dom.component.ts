import { Component, OnInit } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dom',
  templateUrl: './dom.component.html',
  styleUrls: ['./dom.component.css']
})
export class DomComponent implements OnInit {
  langBoolean: boolean = true;

  constructor(private translate: TranslateService){
    translate.addLangs(["en", "de"]);
    translate.setDefaultLang("en");
  }

  ngOnInit() {
  }

  toggleLang() {
    // https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate
    this.langBoolean ? this.translate.use("de") : this.translate.use("en"); // If Else ternary code
    this.langBoolean = !this.langBoolean
    }

}
