import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from'sweetalert2'
import { AuthService } from '../auth.service';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { environment } from '../environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	
	regiones: any = [];
	locationDataSourceRegProv: any = [];
	locationDataSourceProvCom: any = [];
	userExist = true;
	password: any;
	confirmPassword: any;
	confirm = false;

	users: any = [];

	constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient) { 
		this.registerForm = this.formBuilder.group({
	  		nombre:['', Validators.required],
	  		email:['', Validators.required],
	  		telefono:['', Validators.required],
	  		calle:['', Validators.required],
	  		num:['', Validators.required],
	  		comuna:['', Validators.required],
	  		provincia:['', Validators.required],
	  		region:['', Validators.required],
	  		pais:['', Validators.required],
	  		tipo:['', Validators.required],
	  		username:['', Validators.required],
	  		password:['', Validators.required]
	  	})
	}

	async ngOnInit() {
		this.regiones = await this.getRegion();
		this.locationDataSourceRegProv = await this.locationRegionProvincia();
		this.locationDataSourceProvCom = await this.locationProvinciaComuna();
		this.users = await this.getUsuario();
		//this.registerMaestranza();
	}

	/*
	GETTERS
	*/

	async getUsuario(){
  		this.users = await this.http.get(environment.urlAddress+'users/username').toPromise();
    	return this.users;
  	}

  	async getRegion(){
    	this.regiones = await this.http.get(environment.urlAddress+'location/region').toPromise();
    	return this.regiones
	}

	async locationRegionProvincia(){
    	this.locationDataSourceRegProv = await this.http.get(environment.urlAddress+'location/region/provincia').toPromise();
    	 this.locationDataSourceRegProv = new MatTableDataSource(this.locationDataSourceRegProv.data);
    	return this.locationDataSourceRegProv;
	}

	async locationProvinciaComuna(){
    	this.locationDataSourceProvCom = await this.http.get(environment.urlAddress+'location/provincia/comuna').toPromise();
    	 this.locationDataSourceProvCom = new MatTableDataSource(this.locationDataSourceProvCom.data);
    	return this.locationDataSourceProvCom;
	}

	getPassword(event: Event){
		this.password = (event.target as HTMLInputElement).value;
		console.log(this.password);
	}

	getconfirmPassword(event: Event){
		this.confirmPassword = (event.target as HTMLInputElement).value;
		console.log(this.password +" = "+this.confirmPassword);
		if(this.confirmPassword==this.password){
			this.confirm=true;
		}else{
			this.confirm=false;
		}
	}

  	verificarUsuario(event: Event){
  		var newUser = (event.target as HTMLInputElement).value;
  		for(let user of this.users.data){
  			console.log(newUser+" compara "+user.username);	
  			console.log("nuevo "+ this.userExist);																																																																																																																																																
  			if(newUser == user.username){
  				this.userExist = false;
  			}else{
  				this.userExist = true;
  			}
  		}
  	}


	/*
	FILTER LOCATION
	*/

	applyFilterRP(event: Event) {
    	const filterValue = (event.target as HTMLInputElement).value;
    	this.locationDataSourceRegProv.filter= filterValue.trim();
  	}

  	applyFilterPC(event: Event) {
    	const filterValue = (event.target as HTMLInputElement).value;
    	this.locationDataSourceProvCom.filter= filterValue.trim();
  	}



  	registerUser(tipo: String){
  		if(tipo!=''){
			var user = {
				'username': this.registerForm.get('username').value,
				'password': this.registerForm.get('password').value,
				'tipo': tipo
			}
	
				this.http.post(environment.urlAddress+'user/add', user, {responseType: 'text'}).subscribe(
	      			(response) =>  {
	      				if (tipo == 'Maestranza') {
	      					this.registerMaestranza();
	      				}else if(tipo == 'Cliente'){
	      					this.registerCliente();
	      				}
	        		},
	        		(error)=>{
	        	  		console.log('error during post is ', error)
	        		}
    		);
		}else{
			 Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Seleccione su tipo de usuario',
               	confirmButtonText: 'Ok!'
            })
		}
  	}


	registerMaestranza(){
		var dataMaestranza = {
			'nombre': this.registerForm.get('nombre').value,
			'calle': this.registerForm.get('calle').value,
			'num': this.registerForm.get('num').value,
			'comuna': this.registerForm.get('comuna').value,
			'provincia': this.registerForm.get('provincia').value,
			'region': this.registerForm.get('region').value,
			'pais': 'Chile',
			'telefono': this.registerForm.get('telefono').value,
			'correo': this.registerForm.get('email').value,
			'username': this.registerForm.get('username').value,
		};
		this.http.post(environment.urlAddress+'maestranza/add', dataMaestranza, {responseType: 'text'}).subscribe(
      		response =>  Swal.fire({
                icon: 'success',
                title: 'Nueva usuario registrado!',
                confirmButtonText: 'Ok!'
                }).then((result) => {
                	if (result.value) {
                		this.router.navigate(['']);
                    }
                }) ,
        	err => Swal.fire({
        	      icon: 'error',
        	      title: 'Oops!',
        	      text: 'Ha ocurrido un error, vuelva a intentarlo'
        	  })
   	 	);
	}

	registerCliente(){
		var dataCliente = {
			'nombre': this.registerForm.get('nombre').value,
			'calle': this.registerForm.get('calle').value,
			'num': this.registerForm.get('num').value,
			'comuna': this.registerForm.get('comuna').value,
			'provincia': this.registerForm.get('provincia').value,
			'region': this.registerForm.get('region').value,
			'pais': 'Chile',
			'telefono': this.registerForm.get('telefono').value,
			'correo': this.registerForm.get('email').value,
			'username': this.registerForm.get('username').value,
		}
		this.http.post(environment.urlAddress+'cliente/add', dataCliente, {responseType: 'text'}).subscribe(
      		response =>  Swal.fire({
                icon: 'success',
                title: 'Nueva usuario registrado!',
               	confirmButtonText: 'Ok!'
                }).then((result) => {
                	if (result.value) {
                		this.router.navigate(['']);
                	}
                }) ,
        	err => Swal.fire({
        	      icon: 'error',
        	      title: 'Oops!',
        	      text: 'Ha ocurrido un error, vuelva a intentarlo'
        	})
    	);	
	}
}
