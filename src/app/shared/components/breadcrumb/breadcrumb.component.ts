import { Component, Input, OnInit } from '@angular/core';

interface BreadcrumbItem {
  text: string
  url?: string
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: BreadcrumbItem[]

  constructor() { }

  ngOnInit(): void { }

  isTheLastItem(item: BreadcrumbItem): boolean {
    const index = this.items.indexOf(item)
    return index + 1 === this.items.length
  }
}
