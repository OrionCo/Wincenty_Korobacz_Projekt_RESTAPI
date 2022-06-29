import { FormModel } from './form.model';

export namespace Test {
  export interface TestAnswers {
    category: Categories;
    questions: [
      {
        name: string;
        answers: [
          {
            name: string;
            value: number;
            correct: boolean;
          }
        ];
      }
    ];
  }

  export interface Results {
    email: string;
    score: number;
    max_score: number;
    value: TestAnswers;
  }

  export enum Categories {
    TEST_CAT = 'TEST_CAT',
    TEST_CAT2 = 'TEST_CAT2',
    TEST_CAT3 = 'TEST_CAT3',
  }

  export const CategoriesNames: { [key in Categories]: string } = {
    TEST_CAT: 'Historia Polski w czasach średniowiecza',
    TEST_CAT2: 'Polska historia współczesna',
    TEST_CAT3: 'Historia Polski w czasach II WŚ',
  };

  export const CategoryOptions: FormModel.CategoryOption[] = [
    {
      name: CategoriesNames[Categories.TEST_CAT],
      value: Categories.TEST_CAT,
    },
    {
      name: CategoriesNames[Categories.TEST_CAT2],
      value: Categories.TEST_CAT2,
    },
    {
      name: CategoriesNames[Categories.TEST_CAT3],
      value: Categories.TEST_CAT3,
    },
  ];
}
