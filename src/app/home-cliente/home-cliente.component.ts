import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from'sweetalert2'
import { AuthService } from '../auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {

  	num: any;
   	FilterForm: FormGroup;


   	cards = [
    {
      title: 'Card Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'data:image/png;base64,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" '
    },
    {
      title: 'Card Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 5',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 6',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 7',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 8',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 9',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];



  	constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient, private auth: AuthService) { 
  		this.num = 1;
  		this.FilterForm = this.formBuilder.group({
      		search: [''],
    	});
    	console.log(this.cards.length);
  	}


  	/*
	hola ee[object Object] home-cliente.component.ts:94:14
hola idx4 home-cliente.component.ts:95:14
hola itemsPerSlide5 home-cliente.component.ts:96:14
hola totalItems8 home-cliente.component.ts:97:1
hola ee[object Object] home-cliente.component.ts:94:14
hola idx4 home-cliente.component.ts:95:14
hola itemsPerSlide5 home-cliente.component.ts:96:14
hola totalItems8 home-cliente.component.ts:97:14


  	*/

  	  ngOnInit() {
  	  	
   		
 	 }
}
