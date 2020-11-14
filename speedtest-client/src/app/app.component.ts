import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { TestResult } from 'src/models/test-result.model';
import { ApiService } from 'src/services/api.service';
import { faTachometerAlt, faUpload, faDownload, faRunning, faSync, faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading = false;
  downloadSpeed = 0;
  uploadSpeed = 0;
  testResults: TestResult[] = [];
  today = new Date();

  faTachometerAlt = faTachometerAlt;
  faUpload = faUpload;
  faDownload = faDownload;
  faRunning = faRunning;
  faSync = faSync;
  faCopyright = faCopyright;
  

  constructor(
    public apiSvc: ApiService) {
  }

  ngOnInit() {
    this.refreshResults();
  }

  refreshResults() {
    this.apiSvc.getTestResults().subscribe(res => {
      this.testResults = res.testResults;
    }, (e) => {
      alert(e.error.messages.error);
    });
  }

  onRefreshClick() {
    this.refreshResults();
  }

  onStartClick() {
    this.loading = true;

    forkJoin([
      this.apiSvc.testDownloadSpeed(),
      this.apiSvc.testUploadSpeed(1)
    ]).pipe(
      mergeMap(([downloadSpeed, uploadSpeed]) => {
        this.downloadSpeed = +downloadSpeed;
        this.uploadSpeed = +uploadSpeed;
        var newTestResult = new TestResult({
          date: new Date(),
          downloadSpeed: this.downloadSpeed,
          uploadSpeed: this.uploadSpeed
        });
        return this.apiSvc.createTestResult(newTestResult).pipe(
          map((res) => {
            newTestResult.id = res.id;
            return newTestResult;
          })
        );
      })
    ).subscribe((newTestResult) => {
      this.testResults.unshift(newTestResult);
      this.loading = false;
    }, (e) => {
      alert(e.error.messages.error);
      this.loading = false;
    });
  }

}
