import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TestResult } from 'src/models/test-result.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost';

  constructor(public http: HttpClient) { }

  testDownloadSpeed(): Observable<any> {
    var startTime = (new Date()).getTime();
    var headers = new HttpHeaders();
    headers.set('Cache-Control', 'no-cache');
    headers.set('Pragma', 'no-cache');
    return this.http.get(`${this.url}/speedTester/download`, { headers, responseType: 'blob' as 'json' }).pipe(
      map((res: any) => {
        var endTime = (new Date()).getTime();
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = res.size * 8;
        var speedMbps = ((bitsLoaded / duration) / 1024 / 1024).toFixed(2);
        return speedMbps;
      })
    );
  }

  testUploadSpeed(sizeInMb): Observable<any> {
    var data = this.getRandomString(sizeInMb);
    var startTime = (new Date()).getTime();
    var headers = new HttpHeaders();
    headers.set('Cache-Control', 'no-cache');
    headers.set('Pragma', 'no-cache');
    return this.http.post(`${this.url}/speedTester/upload`, { data }, { headers }).pipe(
      map(() => {
        var endTime = (new Date()).getTime();
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = sizeInMb * 1024 * 1024 * 8;
        var speedMbps = ((bitsLoaded / duration) / 1024 / 1024).toFixed(2);
        return speedMbps;
      })
    );
  }

  createTestResult(testResult: TestResult): Observable<any> {
    return this.http.post(`${this.url}/testResult/create`, { testResult });
  }

  deleteTestResult(testResultId: number): Observable<any> {
    return this.http.delete(`${this.url}/testResult/${testResultId}`);
  }

  getTestResults(): Observable<any> {
    return this.http.get(`${this.url}/testResult`);
  }

  private getRandomString(sizeInMb) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+`-=[]\{}|;':,./<>?",
      iterations = sizeInMb * 1024 * 1024, //get byte count
      result = '';
    for (var index = 0; index < iterations; index++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    };
    return result;
  };
}