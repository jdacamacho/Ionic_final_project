import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { location } from 'src/app/common/models/Location';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import * as icons from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HeaderComponent } from "../../Products/header/header.component";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow, IonSpinner } from '@ionic/angular/standalone';

@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss'],
    standalone: true,
    imports: [HeaderComponent,IonSpinner,IonCard,IonCardHeader,IonCardTitle,IonCardContent,
              IonButton,IonRow,IonCol,IonGrid,IonIcon]
})
export class ManagementComponent {

  
  locations: location[] = [];
  loading: boolean = false;

  constructor(private firestoreService: FirestoreService,
              private alertController: AlertController,
              private router: Router) {
    this.loadProducts();
    addIcons({ create: icons['create']});
    addIcons({ trash: icons['trash']});
    addIcons({ home: icons['home']});
  }

  loadProducts(){
    this.firestoreService.getCollectionChanges<location>('Location').subscribe(
      data => {
        if(data){
          this.locations = data
        }
      }
    );
  }

  save(){
    this.router.navigate(['/locations/save']);
  }

  home(){
    this.router.navigate(['/home']);
  }

  update(locationUpdate: location){
    this.router.navigate(['/locations/update'], { state: { location: locationUpdate } });
  }

  async delete(location: location) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta ubicación?',
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
            await this.firestoreService.deleteDocumentID('Location', location.id);
            this.loading = false;
            this.presentAlert("Eliminado exitoso","Ubicación eliminada con exito");
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
