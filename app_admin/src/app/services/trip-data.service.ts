import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Trip } from '../models/trip';

@Injectable()
export class TripDataService {

  constructor(private http: Http) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public addTrip(formData: Trip): Promise<Trip> {
    this.logMessage('addTrip(formData)');
    return this.http
      .post(this.tripUrl, formData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip> {
    this.logMessage('getTrip(tripCode)');
    return this.http
      .get(`${this.tripUrl}${tripCode}`)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    this.logMessage('getTrips()');
    return this.http
      .get(this.tripUrl)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    this.logMessage('updateTrip(formData)');
    return this.http
      .put(`${this.tripUrl}${formData.code}`, formData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  public deleteTrip(tripCode: string): Promise<Trip> {
    this.logMessage('deleteTrip(tripCode)');
    return this.http
      .delete(`${this.tripUrl}${tripCode}`)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }

  private logMessage(msg: string) {
    console.log(`Inside TripDataService#${msg}`);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
