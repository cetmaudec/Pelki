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
  selector: 'app-servicios-cliente',
  templateUrl: './servicios-cliente.component.html',
  styleUrls: ['./servicios-cliente.component.css']
})
export class ServiciosClienteComponent implements OnInit {

	Requerimiento: any = [];
	User: any;
	TipoUser: any;

	InfoReq:any = [];


	constructor(private router: Router, private http: HttpClient) {
  		this.User = localStorage.getItem('user');
    	this.TipoUser = localStorage.getItem('tipo'); 
	}

	async ngOnInit() {
		this.Requerimiento = await this.getInfoReq();
	}

	/*
	GETTERS
	*/
	async getInfoReq(){
  		this.Requerimiento = await this.http.put(environment.urlAddress+'requerimiento', {username: this.User}).toPromise();
  		/*for(let req of this.Requerimiento.data){
  			this.InfoReq.push({
				'id': req.id,
				'servicio': req.servicio,
				'img': req.imagen,
				'cliente': req.cliente,
				'maestranza': req.maestranza,
				'fecha_creacion': req.fecha,
				'estado': req.estado,
			});
  		}*/
    	return this.Requerimiento;
  	}

}
