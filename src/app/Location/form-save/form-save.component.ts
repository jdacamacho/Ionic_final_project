import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { location } from 'src/app/common/models/Location';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import * as icons from 'ionicons/icons';
import { HeaderComponent } from "../../Products/header/header.component";
import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-form-save',
  templateUrl: './form-save.component.html',
  styleUrls: ['./form-save.component.scss'],
  standalone: true,
  imports: [HeaderComponent,IonCard,IonCardContent,IonCardHeader,IonCardTitle,
            IonGrid,IonCol,IonRow,IonButton,IonIcon,IonAlert,IonInput,IonItem,
            IonLabel,FormsModule]
})
export class FormSaveComponent {

  newLocation: location;
  loading: boolean = false;

  constructor(private firestoreService: FirestoreService,
              private alertController: AlertController,
              private router: Router) { 
    this.initProduct();
    addIcons({ home: icons['home']});
    addIcons({ cog : icons['cog']});
  }

  initProduct(){
    this.newLocation = {
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
    if (!this.newLocation.place || !this.newLocation.address ) {
      this.alertError('Campos incompletos', 'Por favor, llena todos los campos.');
      return;
    }else{
      this.loading = true;
      await this.firestoreService.createDocumentID(this.newLocation, 'Location', this.newLocation.id);
      this.loading = false;
      this.presentAlert('Guardado exitoso', 'La ubicación se ha guardado exitosamente.');
      this.clearForm();
    }
  }


  clearForm() {
    this.newLocation = { id: '', place: null, address: ''};
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

  async alertError(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        'OK']
    });

    await alert.present();
  }


}
