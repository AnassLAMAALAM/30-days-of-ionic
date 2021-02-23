import { IClient } from './../interfaces/IClient';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { timer } from 'rxjs';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.page.html',
  styleUrls: ['./clients-list.page.scss'],
})
export class ClientsListPage implements OnInit {

  clients : IClient[];
  clientsX : IClient[];
  myParam : String;
  countriesList = [];
  citiesList = [];
  searchTerm: string = '';
  searching: any = false;

  constructor(private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController){ }

    

    filterClients(ev: any) {

      this.clients = this.clientsX;
      this.searching = true;
      const val = ev.target.value;
      if (val && val.trim() !== '') {
          this.clients = this.clients.filter((item) => {
            this.searching = false;
            return (item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
      } else {
        this.searching = true;
      }
  }


    navigate(c){
      this.router.navigate(['/edit-client', c.clientId]);         
    }
    removeClient(clientId) {
      this.alertController.create({
        header: 'Confirm Alert',
        message: 'Are you sure you want to delete this client?',
        buttons: [
          {
            text: 'Not Sure',
            handler: () => {
              console.log('Let me think');
            }
          },
          {
            text: 'Yes!',
            handler: () => {
              this.clientService.delete(clientId)
                  .subscribe(
                    response => {
                      this.clients.forEach((client,index)=>{
                        if(client.clientId==clientId) this.clients.splice(index,1);
                     });
                    },
                    error => {
                     
                    });
            }
          }
        ]
      }).then(res => {
        res.present();
      });
    }

 

  ngOnInit() {
    this.retrieveClients();
  }

  retrieveClients() {
  this.clientService.getAll()
  .subscribe(
    data => {
      this.clientsX = data;
      this.clients = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }
}
