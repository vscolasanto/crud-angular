import { Component } from '@angular/core'
import { PrimeNGConfig } from 'primeng/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private config: PrimeNGConfig) { }

  ngOnInit() {
    this.config.setTranslation({
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      monthNames: [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ],
      monthNamesShort: [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago","Set", "Out", "Nov", "Dez"
      ],
      today: "Hoje",
      clear: "Limpar",
      dateFormat: "dd/MM/yyyy",
      weekHeader: "Sem"
    });
  }
}
