import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonButtons, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonModal, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/angular/standalone';
import { Task } from './task';
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update, remove, onValue } from 'firebase/database';
import { Observable } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyCVSzUHvNNDhmZPDdtiuFUUWjscxbamHRM",
  authDomain: "todolist-85777.firebaseapp.com",
  projectId: "todolist-85777",
  storageBucket: "todolist-85777.appspot.com",
  messagingSenderId: "833530418139",
  appId: "1:833530418139:web:970fd406d1d1dd19398dfe"
};


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonItemOptions, IonItemOption, IonItemSliding, IonInput, IonModal, NgFor, IonLabel, IonItem, IonIcon, IonButton, IonButtons, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList],
})
export class HomePage {

  count: number = 0;
  tasks: Array<Task> = [];

  theNewTask: string|null = "";
  app = initializeApp(firebaseConfig);
  db = getDatabase(this.app);
  
  constructor() {
    //const tasksCol = collection(this.db, 'tasks');
    //this.tasks = collectionData(tasksCol);
    const dataListRef = ref(this.db, 'tasks');
    onValue(dataListRef, (snapshot) => {
      const data = snapshot.val();
      data.forEach(element => {
        this.tasks.push({title: element.title, status: element.status});
      });
    });
  }

  addItem() {
    this.theNewTask = prompt("New tasK:",'');
    
    //this.modal.dismiss(this.theNewTask, 'confirm');

    if (this.theNewTask != '') {
      this.count++;
      set(ref(this.db, 'tasks/' + this.count), {
        title: this.theNewTask,
        status: 'open'
      }).then( () => {
        alert("Data addedd succesfully");
      })
      .catch( (error) => {
        alert("Error");
        console.log(error);
      });
      //this.tasks.push({title: this.theNewTask, status: 'open'});
    }
  }

  cancel() {
    //this.modal.dismiss(null, 'cancel');
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.title;
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    update(ref(this.db, 'tasks/' + this.count), {
      title: this.theNewTask,
      status: 'done'
    }).then( () => {
      alert("Data addedd succesfully");
    })
    .catch( (error) => {
      alert("Error");
      console.log(error);
    })

    setTimeout( () => { slidingItem.close() }, 2);
  }

  removeTask(slidingItem: IonItemSliding, task: Task) {
    /*task.status = "removed";
    let index = this.tasks.indexOf(task);
    if (index > -1)
      this.tasks.splice(index, 1);*/
    remove(ref(this.db, 'tasks/' + this.count)).then( () => {
      alert("Data deleted succesfully");
    })
    .catch( (error) => {
      alert("Error");
      console.log(error);
    })
    setTimeout( () => { slidingItem.close() }, 2);
  }
}
