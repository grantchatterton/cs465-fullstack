import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input('trip') trip: any;
  allowDelete = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  private updateTripCodeAndNavigate(trip: Trip, route: string): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate([route]);
  }

  private editTrip(trip: Trip): void {
    this.updateTripCodeAndNavigate(trip, 'edit-trip');
  }

  private deleteTrip(trip: Trip): void {
    this.updateTripCodeAndNavigate(trip, 'delete-trip');
  }
}
