import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app-service';
import { ApiUrl } from 'src/app/constants';
import Account from './accountInterface';

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.html'
})
export class AccountComponent {

  //VARIAVEIS
  clientName:string = 'Cliente';
  clientId:number = 0;
  saldo:number = 0;
  isADeposit:boolean = false;
  operationValue:number = 0;

  constructor(private routerService: Router, private route: ActivatedRoute, 
    private modalService: NgbModal, private httpService: AppService,
    private toastr: ToastrService) {

  }

  async ngOnInit(): Promise<void> {
    let id = this.route.snapshot.paramMap.get("id");
    this.clientId = parseInt(<string>id);
    let apiResponse: any = await this.httpService.getRequest(ApiUrl + '/caixa/' + id);
    let clientAccountInfo: Account = apiResponse.msg;
    console.log(clientAccountInfo);

    this.clientName = clientAccountInfo.nome;
    this.saldo = clientAccountInfo.saldo;
  }

  async submitOperation(){
    let body = {
      id: this.clientId,
      valor: this.operationValue
    }
    var response:any;
    if(this.isADeposit){
      response = await this.httpService.putRequest(ApiUrl + '/caixa/depositar', body);
    } else {
      response = await this.httpService.putRequest(ApiUrl + '/caixa/sacar', body);
    }

    if(response && response.hasError == false){
      this.toastr.success('Operação Salva com Sucesso!', 'Fala Fiote');
      this.operationValue = 0;
      this.ngOnInit();
      this.closeBtnClick();
    } else {
      this.toastr.error('Não foi possível realizar a operação! Tente novamente!', 'Ih Rapaz');
    }
  }

  openModal(targetModal: any, isADepositOperation:boolean) {
    this.isADeposit = isADepositOperation;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  closeBtnClick(){
    this.modalService.dismissAll();
  }

  goToLoginPage(){
    this.routerService.navigateByUrl('/login');
  }
}
