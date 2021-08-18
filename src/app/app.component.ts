import { Component } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'crud-angular'
  date = new Date()

  constructor(private toastr: ToastrService) { }

  showToast(type: 'success' | 'error' | 'info' | 'warning') {
    this.toastr[type]('Hello world!', 'Toastr fun!')
  }
}
