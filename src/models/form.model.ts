import { Test } from './test.model';

export namespace FormModel {
  // export interface TestDataResponse {
  //   category: number;
  //   questions: [
  //     {
  //       name: string;
  //       answers: [
  //         {
  //           name: string;
  //           value: number;
  //           correct: boolean;
  //         }
  //       ];
  //     }
  //   ];
  // }

  export interface Option {
    name: string;
    value: number;
  }

  export interface CategoryOption {
    name: string;
    value: Test.Categories;
  }
}
