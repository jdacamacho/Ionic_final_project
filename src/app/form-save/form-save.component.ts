import { Component } from '@angular/core';
import { product } from '../common/models/Product';
import { FirestoreService } from '../common/services/firestore.service';
import { AlertController } from '@ionic/angular';
import { IonButton, IonCard, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-save',
  templateUrl: './form-save.component.html',
  styleUrls: ['./form-save.component.scss'],
  standalone: true,
  imports:[IonCard,IonLabel,IonItem,IonInput,FormsModule,CommonModule,IonButton,HeaderComponent]
})
export class FormSaveComponent {

  newProduct: product;
  loading: boolean = false;
  
  constructor(private firestoreService: FirestoreService,
              private alertController: AlertController,
              private router: Router) { 
    this.initProduct();
  }

  initProduct(){
    this.newProduct = {
      id: this.firestoreService.createIdDoc(),
      code: null,
      name: null,
      price: null
    }
  }

  home(){
    this.router.navigate(['/home']);
  }

  async save() {
    if (!this.newProduct.code || !this.newProduct.name || !this.newProduct.price) {
      this.presentAlert('Campos incompletos', 'Por favor, llena todos los campos.');
      return;
    }else{
      this.loading = true;
      await this.firestoreService.createDocumentID(this.newProduct, 'Products', this.newProduct.id);
      this.loading = false;
      this.presentAlert('Guardado exitoso', 'El producto se ha guardado exitosamente.');
      this.clearForm();
    }
  }


  clearForm() {
    this.newProduct = { id: '', code: null, name: '', price: null };
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
