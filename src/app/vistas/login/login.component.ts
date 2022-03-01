import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api/api.service';
import { LoginI } from '../../modelos/login.interface';

import {RespondeI} from '../../modelos/responde.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //creamos un Array

  loginForm = new FormGroup({
  
    usuario: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)

  })

  constructor(private api: ApiService, private router : Router) { }

  errorStatus:boolean = false;
  errorMsj:any = "";

  ngOnInit(): void {

    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);

      
    }
            
      
  }

  onLogin(form:LoginI){ 
    
    this.api.loginByEmail(form).subscribe(data =>{
      let dataResponde: RespondeI = data;
      if(dataResponde.status == "ok"){
        localStorage.setItem("token", dataResponde.result.token);
        this.router.navigate(['dashboard']);
      }else{

        this.errorStatus = true;
        this.errorMsj = dataResponde.result.error_msg;

      }
    })

  }

}
