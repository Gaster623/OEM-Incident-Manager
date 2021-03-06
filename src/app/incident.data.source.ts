import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { IncidentService } from './incident.service';
import { Incident } from './incident';
import { catchError, finalize } from 'rxjs/operators';

export class IncidentsDataSource implements DataSource<Incident> {
  incidentList: Incident[] = [];
  incidentList2: Incident[] = [];
  titleBoolean = true;
  locationBoolean = true;
  statusBoolean = true;
  dateBoolean = true;
  dateModifiedBoolean = true;

  private lessonsSubject = new BehaviorSubject<Incident[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private incidentService: IncidentService,
    private loadOpen: boolean
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<Incident[]> {
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }

  loadLessons() {
    this.incidentList.length = 0;
    this.loadingSubject.next(true);
    this.incidentService
        .getIncidents()
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((resIncidentData: Incident[]) => {
          if (this.loadOpen) {
            for (const incident of resIncidentData) {
              if (!(incident.STATUS === 'Closed')) {
                this.incidentList.push(incident);
              }
            }
          } else {
            for (const incident of resIncidentData) {
              if (incident.STATUS === 'Closed') {
                this.incidentList.push(incident);
              }
            }
          }
          this.incidentList.sort((a, b) => {
            if (a.MODIFICATION_DATE < b.MODIFICATION_DATE) {
              return 1;
            } else if (
              a.MODIFICATION_DATE > b.MODIFICATION_DATE
            ) {
              return -1;
            } else {
              return 0;
            }
          });
          this.lessonsSubject.next(this.incidentList);
        });
  }

  updateLessons(incident: Incident) {
    const date = new Date();
    incident.MODIFICATION_DATE = incident.MODIFICATION_DATE = ''
      + date.toISOString().substr(0, 10) + ', '
      + date.toLocaleTimeString();
    this.incidentService.updateIncident(incident).subscribe(
      newIncident => {
        // this.loadLessons();
      }
    );
  }

  sortName() {
    if (this.titleBoolean) {
      this.incidentList.sort((a, b) => {
          if (a.INCIDENT_NAME.toLowerCase() > b.INCIDENT_NAME.toLowerCase()) {
            return 1;
          } else if (
            a.INCIDENT_NAME.toLowerCase() < b.INCIDENT_NAME.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.titleBoolean = false;
    } else {
      this.incidentList.sort((a, b) => {
          if (a.INCIDENT_NAME.toLowerCase() < b.INCIDENT_NAME.toLowerCase()) {
            return 1;
          } else if (
            a.INCIDENT_NAME.toLowerCase() > b.INCIDENT_NAME.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.titleBoolean = true;
    }
  }

  sortLocation() {
    if (this.locationBoolean) {
      this.incidentList.sort((a, b) => {
          if (a.LOCATION_NAME.toLowerCase() > b.LOCATION_NAME.toLowerCase()) {
            return 1;
          } else if (
            a.LOCATION_NAME.toLowerCase() < b.LOCATION_NAME.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.locationBoolean = false;
    } else {
      this.incidentList.sort((a, b) => {
          if (a.LOCATION_NAME.toLowerCase() < b.LOCATION_NAME.toLowerCase()) {
            return 1;
          } else if (
            a.LOCATION_NAME.toLowerCase() > b.LOCATION_NAME.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.locationBoolean = true;
    }
  }

  sortStatus() {
    if (this.statusBoolean) {
      this.incidentList.sort((a, b) => {
          if (a.STATUS.toLowerCase() > b.STATUS.toLowerCase()) {
            return 1;
          } else if (
            a.STATUS.toLowerCase() < b.STATUS.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.statusBoolean = false;
    } else {
      this.incidentList.sort((a, b) => {
          if (a.STATUS.toLowerCase() < b.STATUS.toLowerCase()) {
            return 1;
          } else if (
            a.STATUS.toLowerCase() > b.STATUS.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.statusBoolean = true;
    }
  }

  sortDate() {
    console.log(this.dateBoolean);
    if (this.dateBoolean) {
      this.incidentList.sort((a, b) => {
          if (a.CREATION_DATE > b.CREATION_DATE) {
            return 1;
          } else if (
            a.CREATION_DATE < b.CREATION_DATE
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.dateBoolean = false;
    } else {
      this.incidentList.sort((a, b) => {
          if (a.CREATION_DATE < b.CREATION_DATE) {
            return 1;
          } else if (
            a.CREATION_DATE > b.CREATION_DATE
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.dateBoolean = true;
    }
  }

  sortDateModified() {
    if (this.dateModifiedBoolean) {
      this.incidentList.sort((a, b) => {
          if (a.CREATION_DATE > b.CREATION_DATE) {
            return 1;
          } else if (
            a.CREATION_DATE < b.CREATION_DATE
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.dateModifiedBoolean = false;
    } else {
      this.incidentList.sort((a, b) => {
          if (a.CREATION_DATE < b.CREATION_DATE) {
            return 1;
          } else if (
            a.CREATION_DATE > b.CREATION_DATE
          ) {
            return -1;
          } else {
            return 0;
          }
      });
      this.lessonsSubject.next(this.incidentList);
      this.dateModifiedBoolean = true;
    }
  }


  filter(str: string) {
    this.incidentList2.length = 0;
    this.loadingSubject.next(true);
    if (this.loadOpen) {
      for (const incident of this.incidentList) {
        if (!(incident.STATUS === 'Closed')) {
          if (incident.STATUS.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          } else if (incident.INCIDENT_NAME.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          } else if (incident.LOCATION_NAME.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          } else if (incident.CREATION_DATE.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          } else if (incident.MODIFICATION_DATE.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          }
        }
      }
    } else {
      for (const incident of this.incidentList) {
        if (incident.STATUS === 'Closed') {
          if (incident.STATUS.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          } else if (incident.INCIDENT_NAME.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          } else if (incident.LOCATION_NAME.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          } else if (incident.CREATION_DATE.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          } else if (incident.MODIFICATION_DATE.toLowerCase().includes(str)) {
            this.incidentList2.push(incident);
          }
        }
      }
    }
    this.lessonsSubject.next(this.incidentList2);
  }
}
