import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TextColorDirective } from './shared/directives/text-color.directive';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AddTextPipe } from './shared/pipes/add-text.pipe';
import { DataService } from './shared/services/data.service';
import { Data } from '@angular/router';
import { of } from 'rxjs';
import { UserData } from './shared/model/user-data';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let directiveT: DebugElement;
  let app: any;
  let custDirective;
  let element: ElementRef;
  let compiled: any;
  let serviceData: DataService;
  let formElement: any;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        TextColorDirective,
        AddTextPipe,
      ],
      providers: [DataService]
    }).compileComponents();
    serviceData = TestBed.inject(DataService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    directiveT = fixture.debugElement.query(By.directive(TextColorDirective));
    compiled = fixture.nativeElement as HTMLElement;
    formElement = fixture.debugElement.nativeElement.querySelector("#contactForm"); 
    fixture.detectChanges();
  })

  // should create the app
  it('Should create the app', () => {
    expect(app).toBeTruthy();
  });

  // ts file title should be same as
  it(`Should have as title 'Unit-Testing-Demo'`, () => {
    expect(app.title).toEqual('Unit-Testing-Demo');
  });

  // html title should be same as
  it('Should render title', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('#name')?.textContent).toContain('Welcome To, Bajaj AMC');
  });

  //  Directive unit testing
  // Should create an instance of Directive
  it('Create an instance of directive', () => {
    custDirective = new TextColorDirective(element);
    expect(custDirective).toBeTruthy();
  });

  // Directive color should change to red
  it('Directive color should change', () => {
    expect(directiveT.nativeElement.style.color).toBe("red");
  });

  //Pipe test cases
  // Should create an instance of pipe
  describe('Pipe', () => {
    it('Create an instance of pipe', () => {
      const pipe = new AddTextPipe();
      expect(pipe).toBeTruthy();
    });

    // Should transform text 
    it("Expect John to equal Hello John", () => {
      const pipe = new AddTextPipe();
      expect(pipe.transform("John")).toEqual("Hello John");
      expect(compiled.querySelector('#userName')?.textContent).toContain('Hello user');
    });
  });

  // ***service***//
  // Service should return expected data
  it('Should call something from dataservice', fakeAsync(() => {
    const expectedData: UserData[] = [
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et susc"
      }
    ];
    const spy = spyOn(serviceData, 'getPosts').and.returnValue(of(expectedData));
    app.getPosts();
    tick();
    expect(app.postData).toEqual(expectedData);
    expect(spy).toHaveBeenCalled();
  }));

    //Form test cases
    describe('Form Test Cases', () => {
      // check for input field count 
      it('Test count of input element(Form)', () => {
        const inputElements = formElement.querySelectorAll('input');
        expect(inputElements.length).toEqual(3);
      });

      // Form field initally should be blank
      it('Check initial values for form. Initially it should be blank.', () => {
        const contactFormGroup = app.contactForm.value
        const contactFormValues = {
          name: '',
          email: '',
          userId: ''
        }
        expect(contactFormGroup).toEqual(contactFormValues);
      });
  
      // Form field should be invalid
      it('Form should be invalid', () => {
        app.contactForm.controls['name'].patchValue('');
        app.contactForm.controls['email'].patchValue('');
        app.contactForm.controls['userId'].patchValue('');
        expect(app.contactForm.valid).toBeFalsy();
      });
  
      // Form field should be valid
      it('Whole form should be valid', () => {
        app.contactForm.controls['name'].patchValue('Yogita');
        app.contactForm.controls['email'].patchValue('yogita@gmail.com');
        app.contactForm.controls['userId'].patchValue('12345');
        expect(app.contactForm.valid).toBeTruthy();
      });

      // Submitted to be true
      it('Should set sumbitted to true on click of button', () => {
        app.onSubmit();
        expect(app.submitted).toBeTruthy();
      });
  
      // Call onsumbit method
      it('Should call the onsumbit method', () => {
        fixture.detectChanges();
        spyOn(app, 'onSubmit');
        el = fixture.debugElement.query(By.css('Button')).nativeElement;
        el.click();
        expect(app.onSubmit).toHaveBeenCalledTimes(1);
      });
  
      // Test case for validation name field
      it('check username value before entering some value & validation', () => {
        let name = app.contactForm.controls['name'];
        expect(name.errors).not.toBeNull();
        expect(name.errors.required).toBeTruthy();
        expect(name.valid).toBeFalsy();
        name.setValue('');
        expect(name.hasError('required')).toBeTruthy();
        name.setValue("Yogita");
        expect(name.hasError('required')).toBeFalsy();
      });
    });

});
