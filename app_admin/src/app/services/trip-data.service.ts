import { Inject, Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { HttpHeaders } from "@angular/common/http";

import { Trip } from "../models/trip";
import { User } from "../models/user";
import { AuthResponse } from "../models/authresponse";
import { BROWSER_STORAGE } from "../storage";

@Injectable()
export class TripDataService {
  constructor(
    private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = "http://localhost:3000/api/";
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public addTrip(formData: Trip): Promise<Trip> {
    this.logMessage("addTrip(formData)");
    const headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this.storage.getItem("travlr-token")
    );
    return this.http
      .post(this.tripUrl, formData, {
        headers,
      })
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip> {
    this.logMessage("getTrip(tripCode)");
    return this.http
      .get(`${this.tripUrl}${tripCode}`)
      .toPromise()
      .then((response) => response.json() as Trip)
      .catch(this.handleError);
  }

  public getTrips(): Promise<Trip[]> {
    this.logMessage("getTrips()");
    return this.http
      .get(this.tripUrl)
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    this.logMessage("updateTrip(formData)");
    const headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this.storage.getItem("travlr-token")
    );
    return this.http
      .put(`${this.tripUrl}${formData.code}`, formData, {
        headers,
      })
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  public deleteTrip(tripCode: string): Promise<Trip> {
    this.logMessage("deleteTrip(tripCode)");
    const headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this.storage.getItem("travlr-token")
    );
    return this.http
      .delete(`${this.tripUrl}${tripCode}`, {
        headers,
      })
      .toPromise()
      .then((response) => response.json() as Trip)
      .catch(this.handleError);
  }

  private logMessage(msg: string) {
    console.log(`Inside TripDataService#${msg}`);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => response.json() as AuthResponse)
      .catch(this.handleError);
  }
}
