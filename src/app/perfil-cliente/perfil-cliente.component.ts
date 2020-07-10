import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from'sweetalert2'
//import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
//import { first } from 'rxjs/operators';
//import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { environment } from '../environment';
import {MatDialog} from '@angular/material/dialog';
import { ChangeImageComponent } from '../change-image/change-image.component';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  User: any;
	Cliente: any = [];
	
	Perfil: FormGroup;
	EmailEditform: FormGroup;
	TelefonoEditform: FormGroup;
	DireccionEditform: FormGroup;

	img:any;
	editCorreo: Boolean = false;
	editTelefono: Boolean = false;
	editDireccion: Boolean = false;

	InfoCliente ={
		'id': '',
		'username': '',
		'nombre': '',
		'dir_calle': '',
		'dir_num': '',
		'dir_comuna': '',
		'dir_prov': '',
		'dir_region': '',
		'dir_pais': '',
		'telefono': '',
		'correo': '',
		'calificacion': '',
		'imagen':'',
		'id_usuario':''
	}


  constructor(public formBuilder: FormBuilder,private router: Router, private http: HttpClient, public dialog: MatDialog) {
    this.User = localStorage.getItem('user'); 
    this.Perfil = this.formBuilder.group({
      file:[''],
    });
    this.EmailEditform = this.formBuilder.group({
      correo:['']
    });
    this.TelefonoEditform = this.formBuilder.group({
      telefono:['']
    });
    this.DireccionEditform = this.formBuilder.group({
      dir_calle:[''],
      dir_num:['']
    });
	}

  async ngOnInit() {
    this.editCorreo = false;
    this.editTelefono = false;
    this.editDireccion = false;
  	this.Cliente = await this.getInfoUsuario();
	  //Let base64data = new Buffer(this.InfoCliente.imagen, 'utf-8').toString('base64');
	  //console.log( '" converted to Base64 is "' + base64data + '"');
  }

  /*
  Abrir Modal para cambiar foto del perfil
  */
  openDialog() {
    const dialogRef = this.dialog.open(ChangeImageComponent);	
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  /*
	Editar info (correo, direccion o teléfono)
	*/

  EditInfo(dato: String){
    if(dato == 'correo'){
      this.editCorreo = true;
    }else if(dato == 'direccion'){
      this.editDireccion = true;
    }else if(dato == 'telefono'){
      this.editTelefono = true;
    }
  }

  Update(dato: String){
    if(dato == 'correo'){
      var dataCorreo = {
        'username' : this.InfoCliente.id_usuario,
        'correo': this.EmailEditform.get('correo').value
      }
      this.http.put(environment.urlAddress+'cliente/correo/update', dataCorreo, {responseType: 'text'}).subscribe(
        response =>  Swal.fire({
                	icon: 'success',
                	title: 'Nueva usuario registrado!',
                	confirmButtonText: 'Ok!'
                	}).then((result) => {
                		if (result.value) {
                			this.ngOnInit();
                	    }
                	}) ,
        err => Swal.fire({
        	      icon: 'error',
        	      title: 'Oops!',
        	      text: 'Ha ocurrido un error, vuelva a intentarlo'
        	  	})
   	 		);
  	}else if(dato == 'direccion'){
      var dataDireccion = {
  			'username' : this.InfoCliente.id_usuario,
				'dir_calle': this.DireccionEditform.get('dir_calle').value,
				'dir_num': this.DireccionEditform.get('dir_num').value
			}
			this.http.put(environment.urlAddress+'cliente/direccion/update', dataDireccion, {responseType: 'text'}).subscribe(
	      response =>  Swal.fire({
                	icon: 'success',
                	title: 'Nueva usuario registrado!',
                	confirmButtonText: 'Ok!'
                	}).then((result) => {
                		if (result.value) {
                			this.ngOnInit();
                	    }
                	}) ,
        err => Swal.fire({
        	      icon: 'error',
        	      title: 'Oops!',
        	      text: 'Ha ocurrido un error, vuelva a intentarlo'
        	  	})
   	 		);

  	}else if(dato == 'telefono'){
  		var dataTelefono = {
  		  'username' : this.InfoCliente.id_usuario,
				'telefono': this.TelefonoEditform.get('telefono').value
			}
			this.http.put(environment.urlAddress+'cliente/telefono/update', dataTelefono, {responseType: 'text'}).subscribe(
	      response =>  Swal.fire({
                	icon: 'success',
                	title: 'Nueva usuario registrado!',
                	confirmButtonText: 'Ok!'
                	}).then((result) => {
                		if (result.value) {
                			this.ngOnInit();
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

  /*
	GETTERS
	*/
	async getInfoUsuario(){
  		this.Cliente = await this.http.put(environment.urlAddress+'user/cliente/info', {username: this.User}).toPromise();
  		for(let mat of this.Cliente.data){
  			this.InfoCliente ={
				'id': mat.id,
				'username': mat.username,
				'nombre': mat.nombre,
				'dir_calle': mat.dir_calle,
				'dir_num': mat.dir_num,
				'dir_comuna': mat.dir_comuna,
				'dir_prov': mat.dir_prov,
				'dir_region': mat.dir_region,
				'dir_pais': mat.dir_pais,
				'telefono': mat.telefono,
				'correo': mat.correo,
				'calificacion': mat.calificacion,
				'imagen': mat.imagen,
				'id_usuario':mat.usuario
			}
  		}
    	return this.Cliente;
  	}
}
