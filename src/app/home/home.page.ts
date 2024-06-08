import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonModal, IonItemSliding, IonItemOption, IonItemOptions, IonCard, IonSpinner } from '@ionic/angular/standalone';
import { product } from '../common/models/Product';
import { FirestoreService } from '../common/services/firestore.service';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';


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

  constructor(private firestoreService: FirestoreService) {
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
      name: null,
      price: null
    }
  }

  async save(){
    this.loading = true;
    await this.firestoreService.createDocumentID(this.newProduct,'Products',this.newProduct.id);
    this.loading = false;
  }

  edit(product: product){
    this.newProduct = product;
  }

  async delete(product: product){
    this.loading = true;
    await this.firestoreService.deleteDocumentID('Products', product.id);
    this.loading = false;
  }



  
}
