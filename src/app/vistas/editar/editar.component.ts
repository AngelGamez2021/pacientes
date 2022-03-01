import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api/api.service';
import { PacienteI } from '../../modelos/paciente.interface';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  constructor(private activerouter: ActivatedRoute, private router: Router, private api: ApiService) { }


  datosPaciente:PacienteI | undefined;
  editarForm = new FormGroup({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    dni: new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    token: new FormControl(''),
    pacienteId: new FormControl(''),
    fechaNacimiento: new FormControl('')

  });

  ngOnInit(): void {

    let pacienteid = this.activerouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.getSinglePactient(pacienteid).subscribe(data =>{
      this.datosPaciente = data [0];
      this.editarForm.setValue({

        'nombre': this.datosPaciente.Nombre,
        'correo': this.datosPaciente.Correo,
        'dni': this.datosPaciente.DNI,
        'direccion': this.datosPaciente.Direccion,
        'codigoPostal': this.datosPaciente.CodigoPostal,
        'genero': this.datosPaciente.Genero,
        'telefono': this.datosPaciente.Telefono,
        'token': token,
        'pacienteId': this.datosPaciente.PacienteId,
        'fechaNacimiento': this.datosPaciente.FechaNacimiento
              
      });
     
    })
  }

  getToken(){
    return localStorage.getItem('token');
  }

  
  postForm(form:PacienteI){

 this.api.putPatients(form).subscribe(data =>{
   console.log(data)
 })

  }


  eliminar(){
    let datos:PacienteI = this.editarForm.value;
    this.api.deletePatients(datos).subscribe(data =>{
      console.log(data);
    })

  }

  salir(){
    this.router.navigate(['dashboard']);
  }


}
