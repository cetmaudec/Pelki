import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from'sweetalert2'
import { AuthService } from '../auth.service';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { environment } from '../environment';

@Component({
  selector: 'app-change-image',
  templateUrl: './change-image.component.html',
  styleUrls: ['./change-image.component.css']
})
export class ChangeImageComponent implements OnInit {
	
	base64textString: any;
	BlobData: any;
	ChangeFileForm: FormGroup;
	User: any;
	imagen_user: any;
  	
  	constructor(public formBuilder: FormBuilder, private http: HttpClient, private router: Router,  public dialogRef: MatDialogRef<ChangeImageComponent>) {
  		this.User = localStorage.getItem('user');
  		this.ChangeFileForm = this.formBuilder.group({
	  		file:[''],
	  	})
	  	 }

  	ngOnInit() {
  	}

  	onUploadChange(evt: any) {
  		const file = evt.target.files[0];
  		if (file) {
  			const reader = new FileReader();
  			reader.onload = this.handleReaderLoaded.bind(this);
		    reader.readAsBinaryString(file);
		}
	}

	handleReaderLoaded(e) {
		this.base64textString = 'data:image/png;base64,' + btoa(e.target.result);
		//this.BlobData = this.b64toBlob(this.base64textString);
		console.log(this.base64textString);
	}

	b64toBlob(dataURI) {
    	var byteString = atob(dataURI.split(',')[1]);
    	var ab = new ArrayBuffer(byteString.length);
    	var ia = new Uint8Array(ab);	
	    	for (var i = 0; i < byteString.length; i++) {
	    	    ia[i] = byteString.charCodeAt(i);
	    	}
    	return new Blob([ab], { type: 'image/jpeg' });
	}

	ChangeFile(){
		this.imagen_user = {
			'username' : this.User,
			'image': this.base64textString,
			//this.BlobData,
		}
		this.http.put(environment.urlAddress+'user/image/update', this.imagen_user, {responseType: 'text'}).subscribe(
			response =>  Swal.fire({
						icon: 'success',
                		title: 'Cambio realizado exitosamente',
                		text: 'Se ha actualizado tu foto de perfil',
               			confirmButtonText: 'Ok!'
  						}).then((result) => {
  							if (result.value) {
  								this.router.navigate(['perfil']);
  								this.dialogRef.close();
  							}
  						}) ,
			err => Swal.fire({
					icon: 'error',
                	title: 'Oops!',
                	text: 'Ha ocurrido un error, el archivo es demasiado pesado',
               		confirmButtonText: 'Ok!'  				
  						}).then((result) => {
  							if (result.value) {
  								this.ngOnInit();
  							}
  						}) 
		);
	}

}
