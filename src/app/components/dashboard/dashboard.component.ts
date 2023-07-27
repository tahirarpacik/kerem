import { Component, HostListener, OnInit } from "@angular/core";

@Component({
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {

  dotPositionX: number = 0;
  dotPositionY: number = 0;
  constructor(
  ) {}

  ngOnInit() {

  }

  toggleDotPosition() {
    if (this.dotPositionX === 0 && this.dotPositionY === 0) {
      this.dotPositionX = window.innerWidth / 2 - 10;
      this.dotPositionY = window.innerHeight / 2 - 10;
    } else {
      this.dotPositionX = 0;
      this.dotPositionY = 0;
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Center the dot again when the window is resized
    if (this.dotPositionX !== 0 && this.dotPositionY !== 0) {
      this.dotPositionX = window.innerWidth / 2 - 10;
      this.dotPositionY = window.innerHeight / 2 - 10;
    }
  }
}
