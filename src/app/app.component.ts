import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { UserData } from './shared/model/user-data';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Unit-Testing-Demo';
  name: string = 'Bajaj AMC';
  postData: UserData[] = [];
  submitted: boolean = false;
  contactForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    userId: new FormControl('')
  });
  disableSumbit: boolean = true;

  constructor(private service: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getPosts();
    this.createForm();
  }

  //Get data from service 
  getPosts() {
    this.service.getPosts().subscribe((data) => {
      this.postData = data;
    })
  }

  // Add validators to form field
  createForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      userId: ['', [Validators.required]],
    })
  }

  // On click of submit method
  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.disableSumbit = true;
    alert('Data saved succefully')
  }

  // Function that will return the controls
  get f() {
    return this.contactForm.controls;
  }
}
