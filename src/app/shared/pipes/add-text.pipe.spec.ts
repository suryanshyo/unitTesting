import { AddTextPipe } from './add-text.pipe';

describe('AddTextPipe', () => {
  let pipe: AddTextPipe;

  beforeEach(() => {
    pipe = new AddTextPipe();
  });

  // Should create an instance
  it('Create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  //Should join text with "hello"
  it("Expect John to equal Hello John", () => {
    expect(pipe.transform("John")).toEqual("Hello John");
  });
});
