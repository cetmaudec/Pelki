import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from'sweetalert2'
//import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
//import { first } from 'rxjs/operators';
//import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { environment } from '../environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	User: any;
	tipo: any = [];
	TipoUser: any = [];

	constructor(private router: Router, private http: HttpClient) { 
		this.User = localStorage.getItem('user');
	}

  async ngOnInit() {
  	this.TipoUser = await this.getTipoUsuario();
  	//console.log(this.tipo);
  }


	/*
	GETTERS
	*/
	async getTipoUsuario(){
  	this.TipoUser = await this.http.put(environment.urlAddress+'user/type', {username: this.User}).toPromise();
  	this.tipo = this.TipoUser.data[0].tipo;
    return this.TipoUser;
  }

}
