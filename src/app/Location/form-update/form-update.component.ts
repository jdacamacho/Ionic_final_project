import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { location } from 'src/app/common/models/Location';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import * as icons from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../Products/header/header.component";
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-form-update',
    templateUrl: './form-update.component.html',
    styleUrls: ['./form-update.component.scss'],
    standalone: true,
    imports: [IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonGrid, IonCol, IonRow, IonLabel, IonInput,
        IonIcon, IonItem, IonButton, FormsModule, HeaderComponent,CommonModule]
})
export class FormUpdateComponent {

  currentLocation: location;
  loading: boolean = false;
  
  constructor(private firestoreService: FirestoreService,
              private alertController: AlertController,
              private router: Router) { 
    this.initProduct();
    addIcons({ home: icons['home']});
    addIcons({ cog : icons['cog']});
    this.currentLocation = this.router.getCurrentNavigation().extras.state['location'];
  }

  initProduct(){
    this.currentLocation = {
      id: this.firestoreService.createIdDoc(),
      place: null,
      address: null,
    }
  }

  home(){
    this.router.navigate(['/home']);
  }

  management(){
    this.router.navigate(['/locations']);
  }

  async save() {
    if (!this.currentLocation.place || !this.currentLocation.address ) {
      this.presentAlert('Campos incompletos', 'Por favor, llena todos los campos.');
      return;
    }else{
      this.loading = true;
      await this.firestoreService.createDocumentID(this.currentLocation, 'Location', this.currentLocation.id);
      this.loading = false;
      this.presentAlert('Guardado exitoso', 'La ubicación se ha actualizado exitosamente.');
      this.clearForm();
    }
  }


  clearForm() {
    this.currentLocation = { id: '', place: null, address: ''};
  }

  

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/locations']);
          }
        }
      ]
    });
  
    await alert.present();
  }


}
