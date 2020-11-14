import { Component, Input, OnInit } from '@angular/core';
import { TestResult } from 'src/models/test-result.model';
import { ApiService } from 'src/services/api.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-test-result-data-table',
  templateUrl: './test-result-data-table.component.html',
  styleUrls: ['./test-result-data-table.component.scss']
})
export class TestResultDataTableComponent implements OnInit {

  @Input() testResults: TestResult[] = [];

  faTrash = faTrash;

  constructor(
    public apiSvc: ApiService
  ) { }

  ngOnInit(): void {
  }

  onClickDelete(testResult: TestResult, i: number) {
    this.apiSvc.deleteTestResult(testResult.id).subscribe((res) => {
      this.testResults.splice(i, 1);
    }, (e) => {
      alert(e.error.messages.error);
    });
  }

}
