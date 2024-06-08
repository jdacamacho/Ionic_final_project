import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonModal, IonItemSliding, IonItemOption, IonItemOptions, IonCard, IonSpinner, AlertController, ToastController } from '@ionic/angular/standalone';
import { product } from '../common/models/Product';
import { FirestoreService } from '../common/services/firestore.service';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonItemOptions, IonItemOption, IonItemSliding, 
            IonInput, IonModal, NgFor, IonLabel, 
            IonItem, IonIcon, IonButton, IonButtons, 
            CommonModule, IonHeader, IonToolbar, 
            IonTitle, IonContent, IonList,
            IonCard,FormsModule,IonSpinner],
})
export class HomePage {
  
  products: product[] = [];
  newProduct: product;
  loading: boolean = false;

  constructor(private firestoreService: FirestoreService,
              private alertController: AlertController,
              private toastController: ToastController) {
    this.loadProducts();
    this.initProduct();
    addIcons({ create: icons['create']});
    addIcons({ trash: icons['trash']});
  }

  loadProducts(){
    this.firestoreService.getCollectionChanges<product>('Products').subscribe(
      data => {
        if(data){
          this.products = data
        }
      }
    );
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

  async delete(product: product) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: async () => {
            this.loading = true;
            await this.firestoreService.deleteDocumentID('Products', product.id);
            this.loading = false;
            // Mostrar mensaje de confirmación
            this.presentAlert("Eliminado exitoso","Producto eliminado con exito");
          }
        }
      ]
    });

    await alert.present();
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
