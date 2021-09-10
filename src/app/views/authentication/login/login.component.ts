import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service';
import { ApiUrl } from 'src/app/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  //VARIAVEIS
  loading:boolean = false;
  errorMessage:string = "";
  cpf:string = "";
  password:string = "";

  constructor(private route: Router, private httpService: AppService) {
  }

  ngOnInit(): void {

  }

  async login() {
    this.loading = true;
    this.errorMessage = '';
    
    let body = {
      cpf: this.cpf,
      password: this.password
    }
    let response:any = await this.httpService.postRequest(ApiUrl + '/caixa/login', body);
    console.log(response);
    if(response){
      if(response.hasError == false){
        this.route.navigateByUrl('/account/' + response.msg.id);
      }else{
        this.errorMessage = response.msg.message;
      }
    } else {
      this.errorMessage = "Erro de conexão com a API."
    }
    this.loading = false;
  }
}