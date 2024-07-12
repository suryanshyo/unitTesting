import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing";
import { ROUTES, Router, RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppRoutingModule, routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { Location } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AddTextPipe } from "./shared/pipes/add-text.pipe";

describe('AppRoutingModule', () => {
    let location: Location;
    let router: Router;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule, ReactiveFormsModule],
            declarations: [AppComponent, HomeComponent, AddTextPipe]
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    // Should navigate to home page
    it('Navigate to "home" redirects you to /home', fakeAsync(() => {
        fixture.detectChanges();
        router.navigate(['home']);
        tick();
        fixture.whenStable().then(() => {
            expect(location.path()).toBe("/home");
        });
    }));
});