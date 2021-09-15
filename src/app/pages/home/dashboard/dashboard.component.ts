import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'
import { ChartModel } from 'src/app/shared/models/chart.model';
import { Book } from '../../books/models/book.model';
import { BooksService } from '../../books/services/books.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean;
  books: Book[] = []

  bookByCategoryChart: ChartModel = {} as ChartModel
  bookByAuthorChart: ChartModel = {} as ChartModel

  constructor(
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.isLoading = true

    this.booksService.getAll().subscribe(
      (response: Book[]) => {
        this.books = response
        this.bookByCategory(response)
        this.bookByAuthor(response)
      },
      (error: HttpErrorResponse) => { console.error(error) },
      () => this.isLoading = false
    )
  }

  bookByCategory(arr: Book[]) {
    const result: { [key: string]: number } = {}

    arr.map((book: Book) => {
      if (book.categories !== undefined) {
        book.categories.map(category => {
          if (category.name && result.hasOwnProperty(category.name)) {
            result[category?.name]++
          } else {
            result[category.name || ''] = 1
          }
        });
      }
    });

    this.bookByCategoryChart = {
      pieChartLabels: Object.keys(result),
      pieChartData: Object.values(result),
      pieChartType: 'pie',
      title: 'Livros por categoria'
    }
  }

  bookByAuthor(arr: Book[]) {
    const result: { [key: string]: number } = {}

    arr.map((book: Book) => {
      if (book.author !== undefined) {
        if (book.author.name && result.hasOwnProperty(book.author.name)) {
          result[book.author.name]++
        } else {
          result[book.author.name || ''] = 1
        }
      }
    });

    this.bookByAuthorChart = {
      pieChartLabels: Object.keys(result),
      pieChartData: Object.values(result),
      pieChartType: 'pie',
      title: 'Livros por autor'
    }
  }
}
