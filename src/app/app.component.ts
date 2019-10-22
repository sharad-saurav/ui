import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material-project';
  navLinks = [{"path": "/dataRuleReport", "label": "dataRuleReport"}, {"path": "/editConfig", "label": "editConfig"}];
}
