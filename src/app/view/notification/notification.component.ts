import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationConfirmDialogComponent } from '../dialog/notification-confirm-dialog/notification-confirm-dialog.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
  }

  public openDialog(){
    let dialogRef = this.dialog.open(NotificationConfirmDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }
}
