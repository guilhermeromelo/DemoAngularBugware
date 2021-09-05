import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.html'
})
export class AccountComponent {


  constructor(private route: Router, private modalService: NgbModal,) {
  }

  ngOnInit(): void {

  }

  openModal(targetModal: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  closeBtnClick(){
    this.modalService.dismissAll();
  }

  goToLoginPage(){
    this.route.navigateByUrl('/login');
  }
}
