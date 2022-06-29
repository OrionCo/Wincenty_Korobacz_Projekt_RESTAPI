import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from 'src/models/test.model';

/*
 * Tests service gets and sends all test-related data.
 *
 * Tests service pobiera i wysyła wszystkie dane związane z testami.
 */

@Injectable()
export class TestsService {
  constructor(private readonly _http: HttpClient) {}

  getTest(category: number): Observable<Test.TestAnswers> {
    return this._http.get<Test.TestAnswers>(`test/${category}`);
  }

  sendResult(data: Test.Results): Observable<Test.Results> {
    return this._http.post<Test.Results>('test', data);
  }

  getResults(email: string): Observable<Test.Results[]> {
    return this._http.get<Test.Results[]>(`user/results/${email}`);
  }
}
