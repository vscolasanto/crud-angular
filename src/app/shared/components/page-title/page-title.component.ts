import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {

  @Input('page-title') pageTitle: string
  @Input('button-text') buttonText: string
  @Input('button-class') buttonClass: string
  @Input('button-link') buttonLink: string

  constructor() { }

  ngOnInit(): void { }
}
