import { AlertService } from './../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { IClient } from '../interfaces/IClient';
import { IContact } from '../interfaces/IContact';
import { ClientService } from './../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.page.html',
  styleUrls: ['./client-form.page.scss'],
})
export class ClientFormPage implements OnInit {

  clientForm: FormGroup;
  clientId : Number;
  client = {} as IClient;
  contact = {} as IContact;
  selectedCountry = "";
  selectedCity = "";
  countriesList = [];
  citiesList = [];
  editClient : boolean = false;
  submitted=false;

  constructor(private clientService: ClientService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public alert : AlertService) {  }

  

  ngOnInit() {
    this.retrieveClient();

    this.clientForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      lastName : ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],

      contact : this.formBuilder.group({
        phoneNumber: ['',[Validators.required,Validators.minLength(9),Validators.required,Validators.pattern('[0-9]*')]],
        adress: ['', [Validators.required]],
        zip : ['', [Validators.required, Validators.pattern('[0-9]{5}')]]
      })
    })

  }

  retrieveClient(){
    this.route.paramMap.subscribe(params => {
      if(params.get('id') != null){
        this.clientId = Number(params.get('id')); 
        this.editClient = true;
        this.clientService.get(this.clientId).subscribe(client =>{
        this.client = client;
        this.clientForm.patchValue(client);
        })   
      }
      });
  }

  get errorCtr() {
    return this.clientForm.controls;
  }

  get errorContactCtr() {
    return this.clientForm.controls.contact['controls'];
  }

  saveClient() {  
    const data = this.client;
    this.clientService.create(data)
      .subscribe(
        response => {
          this.alert.onSuccess();
        },
        error => {
          console.log(error);
        });
  }

  updateClient() {
    console.log(this.client);
    this.client.clientId = this.clientId;
    const data = this.client;
    this.clientService.update(this.clientId,data)
      .subscribe(
        response => {
          console.log("success");
          this.alert.onSuccess();
        },
        error => {
          console.log(error);
        });
  }

  onSubmit(){
    this.submitted = true;
    this.client = this.clientForm.value;
    //this.client.contact.city = this.selectedCity;
    //this.client.contact.country = this.selectedCountry;

    if(this.clientForm?.valid){
      if (this.editClient) this.updateClient();
      else this.saveClient();
    }
    else{
       console.log(this.clientForm.valid);
    }
}
}