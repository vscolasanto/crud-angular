import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error-message',
  templateUrl: './server-error-message.component.html',
  styleUrls: ['./server-error-message.component.scss']
})
export class ServerErrorMessageComponent implements OnInit {
  @Input('server-error-message') serverErrorMessage: string[] | null = null
  constructor() { }

  ngOnInit(): void { }
}
