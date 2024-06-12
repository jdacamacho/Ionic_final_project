import { Component } from '@angular/core';
import { product } from '../common/models/Product';
import { FirestoreService } from '../common/services/firestore.service';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonTitle } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as icons from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.scss'],
  standalone: true,
  imports:[IonCard,IonLabel,IonItem,IonInput,FormsModule,CommonModule,IonButton,HeaderComponent,
    IonCardHeader,IonCardTitle,IonCardContent,IonIcon]
})
export class FormUpdateComponent {

  currentProduct: product;
  loading: boolean = false;
  
  constructor(private firestoreService: FirestoreService,
              private alertController: AlertController,
              private router: Router) { 
    this.initProduct();
    addIcons({ home: icons['home']});
    this.currentProduct = this.router.getCurrentNavigation().extras.state['producto'];
  }

  initProduct(){
    this.currentProduct = {
      id: this.firestoreService.createIdDoc(),
      code: null,
      name: null,
      price: null,
      createdAt: new Date()
    }
  }

  home(){
    this.router.navigate(['/home']);
  }

  async save() {
    if (!this.currentProduct.code || !this.currentProduct.name || !this.currentProduct.price) {
      this.presentAlert('Campos incompletos', 'Por favor, llena todos los campos.');
      return;
    }else{
      this.loading = true;
      await this.firestoreService.createDocumentID(this.currentProduct, 'Products', this.currentProduct.id);
      this.loading = false;
      this.presentAlert('Guardado exitoso', 'El producto se ha actualizado exitosamente.');
      this.clearForm();
    }
  }


  clearForm() {
    this.currentProduct = { id: '', code: null, name: '', price: null, createdAt: new Date() };
  }

  

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });
  
    await alert.present();
  }
  

}
