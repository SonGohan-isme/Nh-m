import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mail } from 'src/app/model/Mail';
import { MailService } from 'src/app/services/mail/mail.service';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.css']
})
export class MailDetailComponent implements OnInit {

  data: Mail;
  mailId : number;
  constructor(private mailService: MailService, private router: Router,private activeRoute : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.mailService.getDetailMail(this.activeRoute.snapshot.params['id']).subscribe((data => {
      this.data = data;
    }));
  }



}
