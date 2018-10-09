import { Component, OnInit } from '@angular/core';
import { MemberDetailsService } from '../../_services/member-details.service';
import { FormBuilder } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public memberDetails = [];
  mail;
  constructor(
    private memberDetailsService: MemberDetailsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getMemberDetails();
  }

  search = this.formBuilder.group({
    searchItem: ['']
  });

  invite = this.formBuilder.group({
    email: [''],
    fullName: ['']
  });

  getMemberDetails() {
    this.memberDetailsService.getMemberDetails().subscribe((data: any) => {
      this.memberDetails = data;
      console.log(data);
    })
  }


  ///search book
  onSearch(search) {
    console.log(search.searchItem);
    this.memberDetailsService.searchName(search.searchItem).subscribe(data => {
      this.memberDetails = data
      // console.log(this.bookDetails);
    });
  }


  //upate
  changeAccType(val: any, id: string) {
    // console.log(val);
    // console.log(id);
    var value = val.target.getAttribute('data-mem')

    this.memberDetailsService.changeAccType(value, id).subscribe(data =>
      this.memberDetails = data);
    this.getMemberDetails();

  }


  //invite member
  inviteMember(invite) {
    var empty = 0;
    let email = '';
    $('.emailAddress').each(function () {
      if (this.value == "") {
        empty++;
      } else {
        email += this.value + ','
      }
    })
    if (empty > 0) {
      alert('error');
    }
    else {
      email = email.replace(/,\s*$/, "");
      console.log(email);
      this.memberDetailsService.sendMail(email).subscribe((data: any) =>{
        this.mail = data
      })
    }

  }


  //add dom
  addInputGroup() {
    $("#inputGroup").append(' <form [formGroup]="invite" (ngSubmit)="inviteMember(invite.value)" #inviteData>' +
      '<div class="form-group row" id="inputGroup">' +
      '<div class="col-6 inpl" >' +
      '<input style="width: 152%;" formControlName="email" name="email" id="email" class="form-control emailAddress" type="email" placeholder="name@example.com">' +
      '</div>' +
      '<div class="col-6 inp">' +
      '<input formControlName="fullName" name="fullName" id="fullName" class="form-control" type="text"' +
      'placeholder="Optional" style="width: 159%; margin-left: 45%">' +
      '<a (click)="removeDom()"><i class="fa fa-times iadd-btn " style="position: relative; left: 211%; bottom: 30px;" ></i></a>' +
      '</div>' +
      '</div>' +
      '</form>');
  }

  //remove dom
  removeDom() {
    $("form").remove("#inputGroup");
  }


  //filter by
  filterBy(val: any) {
    console.log(val);
    this.memberDetailsService.filterData(val).subscribe((data: any) => {
      this.memberDetails = data;
    })
  }
}
