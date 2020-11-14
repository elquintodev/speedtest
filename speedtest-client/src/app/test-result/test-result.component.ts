import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  @Input() icon: any;
  @Input() type: string;
  @Input() speed = 0;
  @Input() loading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
