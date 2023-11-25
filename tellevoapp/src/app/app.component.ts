import { Component, OnInit } from '@angular/core';
import { ConsumoapiService } from './consumoapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private consumoapiService: ConsumoapiService;

  private segmentos: number[] = [0, 1, 2];

  constructor(consumoapiService: ConsumoapiService) {
    this.consumoapiService = consumoapiService;
  }

  ngOnInit() {
  }

}