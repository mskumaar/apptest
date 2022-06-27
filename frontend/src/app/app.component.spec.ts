import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';  
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms'; 
import { PostService } from './services/post.service';
import { MockPostService } from './services/mockpostservice';
import { observable, Observable, of } from 'rxjs';
import {delay} from 'rxjs';


describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let service:PostService;
    let PRODUCTS :any =[{"ID":"1511","name":"iPhone 9","state":"NY","zip":"501","amount":"600","qty":"20","item":"ABC0010"}]
    let PRODUCTS2:any = [[{"id":"2","name":"Mostly Slugs","state":"PA","zip":"19008","amount":"13.3","qty":"2","item":"AAH6748"},{"id":"3","name":"Jump Stain","state":"CA","zip":"99388","amount":"56","qty":"3","item":"MKII4400"}]];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule, 
        AgGridModule,
        FormsModule,
         ToastrModule.forRoot({
          positionClass :'toast-bottom-right'
        })
      ],
      declarations: [
        AppComponent
      ],
      providers:[AppComponent,  ToastrService,PostService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PostService);
    fixture.detectChanges();
  });
  
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have title as 'Our Products'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Our Products');
  });
  it('should display product headers as expected', () => {        
    const elm = fixture.nativeElement;
    fixture.detectChanges();
    const grid = elm.querySelector('ag-grid-angular');
    const headerCells = grid.querySelectorAll('.ag-header-cell-text');
     //console.log(headerCells.textContent);
    const headerTitles = Array.from(headerCells).map((cell: any) =>
       cell.textContent.trim()
    );        
    expect(headerTitles).toEqual(['Id','Name', 'State', 'Zip', 'Amount','Quantity','SKU','Action']);
}); 
it('should fetch all product records', ()=> {
  // given
  const restService = TestBed.inject(PostService);
  const data = [{"ID":"1511","name":"iPhone 9","state":"NY","zip":"501","amount":"600","qty":"20","item":"ABC0010"}]// define your rest call data
  spyOn(restService, 'getProducts').and.returnValue(of(data));
  // when
 component.getAllProducts();
 let tmpArr=component.respContent;
 expect(component.respContent).toEqual(data);
  
});


  
});
