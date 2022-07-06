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
export class TestService {
  constructor(private readonly _http: HttpClient) {}

  getAllTests(): Observable<Test.TestAnswers[]> {
    return this._http.get<Test.TestAnswers[]>(`test`);
  }

  getCategories(): Observable<Test.Categories[]> {
    return this._http.get<Test.Categories[]>(`test/categories`);
  }

  searchTests(category: string): Observable<Test.TestAnswers[]> {
    return this._http.get<Test.TestAnswers[]>(`test/search/${category}`);
  }

  getTest(category: string): Observable<Test.TestAnswers> {
    return this._http.get<Test.TestAnswers>(`test/${category}`);
  }

  createTest(test: Test.TestAnswers): Observable<Test.TestAnswers> {
    return this._http.post<Test.TestAnswers>('test/new', test);
  }

  updateTest(
    test: Test.TestAnswers,
    category: string
  ): Observable<Test.TestAnswers> {
    return this._http.put<Test.TestAnswers>(`test/edit/${category}`, test);
  }

  sendResult(data: Test.Results): Observable<Test.Results> {
    return this._http.post<Test.Results>('test', data);
  }

  getResults(email: string): Observable<Test.Results[]> {
    return this._http.get<Test.Results[]>(`user/results/${email}`);
  }

  deleteTest(category: string): Observable<unknown> {
    return this._http.delete<unknown>(`test/${category}`);
  }
}
