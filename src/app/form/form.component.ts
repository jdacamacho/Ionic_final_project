import { Component, OnInit } from '@angular/core';
import { product } from '../common/models/Product';
import { FirestoreService } from '../common/services/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {

  newProduct: product;
  loading: boolean = false;
  
  constructor(private firestoreService: FirestoreService,
              private alertController: AlertController) { 
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

  edit(product: product) {
    this.alertController.create({
      header: 'Confirmar edición',
      message: '¿Estás seguro de que deseas actualizar los datos de este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Actualizar',
          cssClass: 'primary',
          handler: () => {
            this.newProduct = product;
          }
        }
      ]
    }).then(alert => alert.present());
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
