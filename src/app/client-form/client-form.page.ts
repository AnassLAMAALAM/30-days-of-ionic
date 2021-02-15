import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  client = {} as IClient;
  contact = {} as IContact;
  selectedCountry = "";
  selectedCity = "";
  countriesList = [];
  citiesList = [];
  editClient : boolean = false;
  submitted=false;

  constructor(private clientService: ClientService,
    public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('([a-zA-Z]{2,30}\s*)+')]],
      lastName : ['', [Validators.required, Validators.pattern('([a-zA-Z]{2,30}\s*)+')]],

      contact : this.formBuilder.group({
        phoneNumber: ['', [Validators.required]],
        adress: ['', [Validators.required, Validators.min(5)]],
        zip : ['', [Validators.required, Validators.pattern('[0-9]{5}')]]
      })
    })
  }

  // fetchDate(e) {
  //   let date = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.clientForm.get('dob').setValue(date, {
  //     onlyself: true
  //   })
  // }

  get errorCtr() {
    return this.clientForm.controls;
  }




  saveClient() {
    console.log("sub");
    
    const data = this.client;
    this.clientService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateClient() {
    console.log("up");
    
    const data = this.client;
    this.clientService.update(this.client.clientId,data)
      .subscribe(
        response => {
          console.log("success");
          
        },
        error => {
          console.log(error);
        });
  }
  

  onSubmit(){
  
    console.log("sub");

    this.submitted = true;
    this.client = this.clientForm.value;
    this.client.contact.city = this.selectedCity;
    this.client.contact.country = this.selectedCountry;

    if(this.clientForm?.valid){
      if (this.editClient) this.updateClient(); 
      else this.saveClient();
    }
    else{
       console.log(this.clientForm.valid);
       
    }
}

}