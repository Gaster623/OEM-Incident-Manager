import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../services/incident.service';
import { Incident } from './../incident';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidentsDataSource } from '../incident.data.source';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [IncidentService]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  title = 'NYC Emergency Incident Tracker';
  private hideForm = true;
  date: number = Date.now();
  dataSource: IncidentsDataSource;

  model = new Incident();

  constructor(
    private _incidentService: IncidentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : '';
  }

  ngOnInit() {
    this.date = Date.now();
  }

  onClick() {
    this.hideForm = !this.hideForm;
  }

  onSubmitIncident() {
    this._incidentService.addIncidents(this.model).subscribe(newIncident => {
      this.ngOnInit();
      this.hideForm = true;
      this.model = new Incident();
      this.dataSource.loadLessons();
    });
  }

  incidentSelect(dataSource: IncidentsDataSource) {
    this.dataSource = dataSource;
  }

  archiveIncident(incident: Incident) {
    incident.STATUS = 'Closed';
    this._incidentService
      .updateIncident(incident)
      .subscribe(archivedIncident => {
        this.ngOnInit();
      });
  }
}
