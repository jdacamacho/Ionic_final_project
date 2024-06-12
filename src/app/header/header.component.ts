import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports:[IonHeader,IonTitle,IonToolbar,CommonModule]
})
export class HeaderComponent {

  constructor() { }

}
