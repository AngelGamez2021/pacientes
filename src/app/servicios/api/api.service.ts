import { Injectable } from '@angular/core';
import { LoginI } from '../../modelos/login.interface';
import { RespondeI } from '../../modelos/responde.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaPacienteI } from 'src/app/modelos/listapacientes.interface';
import { PacienteI } from '../../modelos/paciente.interface';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string ="https://api.solodata.es/"

  constructor(private http: HttpClient) { }



loginByEmail(form:LoginI):Observable<RespondeI>{

  let direccion = this.url + "auth";
    return this.http.post<RespondeI>(direccion, form);

}

getAllpatients(page:number):Observable<ListaPacienteI[]>{
  
  let direccion = this.url + "pacientes?page=" + page;
  return this.http.get<ListaPacienteI[]>(direccion);
}


getSinglePactient(id:any):Observable<PacienteI[]>{
  
  let direccion = this.url + "pacientes?id=" + id;
  return this.http.get<PacienteI[]>(direccion);

} 


putPatients(form:PacienteI):Observable<RespondeI>{
  let direccion = this.url + "pacientes";
  return this.http.put<RespondeI>(direccion, form);
}


deletePatients(form:PacienteI):Observable<RespondeI>{
  
  let direccion = this.url + "pacientes";
  let Options = {
    headers : new HttpHeaders({
      'Content-type': 'application/json'
    }),
    body:form
  }

  return this.http.delete<RespondeI>(direccion, Options);

}


postPatients(form:PacienteI):Observable<RespondeI>{

  console.log('form', form);
  
  let direccion = this.url + "pacientes";

  return this.http.post<RespondeI>(direccion, form);


}

}