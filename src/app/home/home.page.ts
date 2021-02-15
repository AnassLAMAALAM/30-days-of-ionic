import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {


  clientForm: FormGroup;
  // client = {} as Client;
  // contact = {} as Contact;
  selectedCountry = "";
  selectedCity = "";
  countriesList = [];
  citiesList = [];
  editClient : boolean = false;
  submitted=false;


  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('([a-zA-Z]{2,30}\s*)+')]],
      lastName : ['', [Validators.required, Validators.pattern('([a-zA-Z]{2,30}\s*)+')]],
      phoneNumber: ['', [Validators.required]],
      
      adress: ['', [Validators.required, Validators.min(5)]],
      zip: ['', [Validators.required, Validators.pattern('^\d{5}(?:[-\s]\d{4})?$')]]
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

  onSubmit() {
    this.submitted = true;
    if (!this.clientForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {
      console.log(this.clientForm.value)
    }
  }
}