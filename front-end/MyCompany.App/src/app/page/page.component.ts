import {Component, Inject, OnInit} from '@angular/core';
import {APP_NAME, HEADER_BACKGROUND} from "../app-tokens";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(@Inject(APP_NAME) public appName: string,
              @Inject(HEADER_BACKGROUND) public headerBackground: string, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.appName);
  }

}
