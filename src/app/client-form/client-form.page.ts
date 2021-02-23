import { AlertService } from './../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { IClient } from '../interfaces/IClient';
import { IContact } from '../interfaces/IContact';
import { ClientService } from './../services/client.service';
import countries from '../_files/countries.json';

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
    this.fetchCoutriesCities();
    this.retrieveClient();

    this.clientForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      lastName : ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],

      contact : this.formBuilder.group({
        phoneNumber: ['',[Validators.required,Validators.minLength(9),Validators.required,Validators.pattern('[0-9]*')]],
        adress: ['', [Validators.required]],
        zip : ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
        city : ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
        country : ['Morocco', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]]
      })
    })

  }

  fetchCoutriesCities(){
    let cr = [];
    let cr2 = [];
    Object.keys(countries).map(function(key){
      cr.push({[key]:countries[key]})
    });
    cr.forEach(element => {
      Object.keys(element).map(function(key){
        cr2.push({'name' : key})
      });
    });
    this.countriesList = cr2;

    console.log(this.countriesList);
    
    // this.selectedCountry = this.countriesList[0].name;
    // this.onChangeCountry(this.selectedCountry);
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

onChangeCountry() {

  console.log(this.clientForm.value.contact.country);
  
  let selectedCountry = this.clientForm.value.contact.country;
  
  this.citiesList = [];
  this.citiesList = countries[selectedCountry];
   this.selectedCountry = selectedCountry;
  if (this.editClient) {
      this.selectedCity = this.client.contact.city;
  }
 else this.selectedCity = this.citiesList[0];
}

onChangeCity() {
  this.selectedCity = this.clientForm.value.contact.city;

  console.log(this.selectedCity);
  
}

}