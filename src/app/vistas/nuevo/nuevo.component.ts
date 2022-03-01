import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/servicios/api/api.service';
import { PacienteI } from '../../modelos/paciente.interface';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  nuevoForm = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    dni: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    token: new FormControl(''),
    fechaNacimiento: new FormControl('')
  })

  constructor(private api: ApiService ,private router: Router) { }

  ngOnInit(): void {

    let token = localStorage.getItem('token');
    this.nuevoForm.patchValue({
      'token' : token
    })

  }


 

  postForm (form: PacienteI){ 
   
console.log(form);


    this.api.postPatients(form).subscribe(data =>{
    console.log(data);
    })

  }

  salir(){
    this.router.navigate(['dashboard']);
  }

}
