import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solution-history',
  templateUrl: './solution-history.component.html',
  styleUrls: ['./solution-history.component.css']
})
export class SolutionHistoryComponent implements OnInit {

  pageTitle: string = "Lịch Sử Chỉnh Sửa Quyền Lợi";
  constructor() { }

  ngOnInit(): void {
  }

}
