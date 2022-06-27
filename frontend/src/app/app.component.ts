import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { PostService } from './services/post.service';
import { ButtonRendererComponent } from './button-renderer.component';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';  
import { Router } from '@angular/router';  
import { ToastrService } from 'ngx-toastr';  
import { JSDocComment } from '@angular/compiler';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  products:any;
  productId:string="";
  public show:boolean = false;
  public buttonName:any = 'Show';
  public msg:any;
  public currow:any;
  public respContent:any;

  public currecordid:any;
  public currecorditem:any;

  public addIdVal:any;
  public addNameVal:any;
  public addStateVal:any;
  public addZipVal:any;
  public addAmtVal:any;
  public addQtyVal:any;
  public addItemVal:any;


  public curIdVal:any;
  public curNameVal:any;
  public curStateVal:any;
  public curZipVal:any;
  public curAmtVal:any;
  public curQtyVal:any;
  public curItemVal:any;


  public defaultColDef:any;
  public updRow : any;
  public delDivDisplayStyle:any;
  public delCurRec:any;
  private api: GridApi = new GridApi;
  private columnApi: ColumnApi = new ColumnApi; 
  public unitResponse:any;

  
  constructor(private service:PostService, private router: Router, private toastr: ToastrService) {
    this.defaultColDef = {
      editable:true
          };
  }
//column headers for grid  and action column for edit/delete icons
columnDefs = [
  {headerName: 'Id', field: 'id', width: 55,suppressSizeToFit: false,cellClass :'gridText'},
  {headerName: 'Name', field: 'name',width: 150,cellClass :'gridText'},
  {headerName: 'State', field: 'state',width: 100,cellClass :'gridText'},
  {headerName: 'Zip', field: 'zip',width: 100,cellClass :'gridText'},
  {headerName: 'Amount', field: 'amount',width: 100,cellClass :'gridText'},
  {headerName: 'Quantity', field: 'qty',width: 100 ,cellClass :'gridText'},
{headerName: 'SKU', field: 'item',width: 150,cellClass :'gridText'},
{
  headerName: "Action",
  minWidth: 150,
  cellRenderer: this.actionCellRenderer,
  editable: false,
  colId: "action"
}


];
    

	 rowData = [];
	 


onEditButtonClick(params:any)
{
}

actionCellRenderer(params:any) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell:any) => {
    return cell.rowIndex === params.node.rowIndex;
  });
//dein
         eGui.innerHTML = `
      <img src="assets/img/pre-edit.png" height="30" data-action="edit"> &nbsp;&nbsp;
      <img src="assets/img/delete-32.png" height="30" data-action="delete"> 
     `;


  return eGui;
}

onCellClicked(params:any) {
  // Handle click event for action cells
  if (params.column.colId === "action" && params.event.target.dataset.action) {
    let action = params.event.target.dataset.action;

    if (action === "edit") {
      
    this.currecordid =params.node.data.id;
    this.currecorditem = params.node.data.item;

   this.displayStyle="block";
   this.curIdVal = params.node.data.id;
   this.curNameVal = params.node.data.name;
   this.curStateVal =params.node.data.state;
   this.curZipVal = params.node.data.zip;
   this.curAmtVal = params.node.data.amount;
   this.curQtyVal = params.node.data.qty;
   this.curItemVal = params.node.data.item;
 
    }

    if (action === "delete") {
      this.delDivDisplayStyle="block";
      this.delCurRec = params.node.data;
    }

    if (action === "update") {
     this.updRow = params.node.data;
     params.api.stopEditing(false);
    }

    if (action === "cancel") {
      params.api.stopEditing(true);
    }
  }
}
confirmDelete()
{
//start of delete api call
this.service.deleteProduct(this.delCurRec.id,this.delCurRec.item).subscribe(response => {  
  response =JSON.parse(response);
  if(response[0].status=="success")
  {
     this.toastr.success("success", 'Record deleted'); 
     this.closePopupDel(); 
     this.ngOnInit();  
  }
  else
  {
    this.toastr.error('Error occured', response[0].message);  
    this.closePopupDel(); 
    this.ngOnInit();  
  }
}); 
}
onRowEditingStarted(params:any) {
  debugger;
  params.api.refreshCells({
    columns: ["action"],
    rowNodes: [params.node],
    force: true
  });
}
onRowEditingStopped(params:any) {
  debugger;
  params.api.refreshCells({
    columns: ["action"],
    rowNodes: [params.node],
    force: true
  });
}

onDeleteButtonClick(params:any)
{

}
onRowSelect(event:any) {
  this.currow = event.data;
}

onGridReady(params:any)
{
  this.api = params.api;  
  this.columnApi = params.columnApi;  
  this.api.sizeColumnsToFit(); 
}

  ngOnInit() {
  	fetch('http://127.0.0.1:8080/application-test/backend/read.php')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
      this.service.getProducts()
        .subscribe(response => {
          this.products = response;
        });
		//this.unitResponse = this.getUTProducts();
	  
	  
  }
  title = 'Our Products';
 

  addDivDisplayStyle = "none";
  displayStyle = "none";
   openPopup() {
  
    this.addDivDisplayStyle = "block";
  } 
  getAllProducts() 
  {
    
    fetch('http://127.0.0.1:8080/application-test/backend/read.php')
    .then(result => result.json())
    .then(rowData => this.rowData = rowData);
    this.service.getProducts()
      .subscribe((response: any) => {
        this.respContent = response;
        this.products = response;
        return response;
      });
  
  
  }
 
  closePopup() {
    this.addIdVal="";
    this.addNameVal= "";
    this.addStateVal="";
    this.addZipVal="";
    this.addAmtVal="";
    this.addQtyVal="";
    this.addItemVal="";
    this.addDivDisplayStyle = "none";
  }

  closePopupDel() {
    this.delDivDisplayStyle = "none";
  }
   closePopupNew() {
    this.displayStyle = "none";
  }
   isEmpty(value:any){
    if (typeof value == "undefined" || value === null || value === "")
      return true;
    else
     return false;
}

  saveProduct()
  {


    if(this.isEmpty(this.addIdVal))
    {
      this.showValidationAlert("Id should not be empty");
      return;
    }
    if(this.isEmpty(this.addNameVal))
    {
      this.showValidationAlert("Name should not be empty");
      return;
    }
    if(this.addNameVal.length<=2)
    {
     this.toastr.error('Error occured', 'Name should have min 3 characters');  
     return;
    }
    if(this.isEmpty(this.addItemVal))
    {
      this.showValidationAlert("SKU should not be empty");
      return;
    }
    if(this.addItemVal.length<3)
    {
     this.toastr.error('Error occured', 'SKU should have min 3 characters');  
     return;
    }
    if(this.isEmpty(this.addAmtVal))
    {
      this.showValidationAlert("Amount should not be empty");
      return;
    }
    if(this.isEmpty(this.addQtyVal))
    {
      this.showValidationAlert("Quantity should not be empty");
      return;
    }
    if(this.isEmpty(this.addStateVal))
    {
      this.showValidationAlert("State should not be empty");
      return;
    }
    if(this.addStateVal.length<2)
    {
     this.toastr.error('Error occured', 'State should have min 2 characters');  
     return;
    }
    if(this.isEmpty(this.addZipVal))
    {
      this.showValidationAlert("Zip should not be empty");
      return;
    }
    if(this.addZipVal.length<3)
    {
     this.toastr.error('Error occured', 'Zip should min 3 characters');  
     return;
    }
    this.service.insertProduct(this.addIdVal,this.addNameVal,this.addStateVal,this.addZipVal,this.addAmtVal,this.addQtyVal,this.addItemVal).subscribe(response => {
		     this.respContent ="test";
         response =JSON.parse(response);
         //this.respContent = response
         debugger;
         if(response[0].status=="success")
        {
          debugger;
          this.toastr.success("success", 'Product added');  
          this.addDivDisplayStyle = "none";
          this.addIdVal="";
          this.addNameVal= "";
          this.addStateVal="";
          this.addZipVal="";
          this.addAmtVal="";
          this.addQtyVal="";
          this.addItemVal="";
          debugger;
          this.ngOnInit();  
        }
        else if(response[0].status=="failed")
        {
          this.toastr.error('Error occured', 'Record already exists');  
        }
        else if(response[0].status=="error")
        {
          this.toastr.error('Error occured', response[0].message);
        }
        else 
        {
          this.toastr.error('Error occured', 'Error occured. Please try again.');
        }
        });
  }
  updateProduct()
  {

    if(this.isEmpty(this.curIdVal))
    {
      this.showValidationAlert("Id should not be empty");
      return;
    }
    if(this.isEmpty(this.curNameVal))
    {
      this.showValidationAlert("Name should not be empty");
      return;
    }
    if(this.curNameVal.length<3)
    {
     this.toastr.error('Error occured', 'Name should have min 3 characters');  
     return;
    }
    if(this.isEmpty(this.curItemVal))
    {
      this.showValidationAlert("SKU should not be empty");
      return;
    }
    if(this.curItemVal.length<3)
    {
     this.toastr.error('Error occured', 'SKU should have min 3 characters');  
     return;
    }
    if(this.isEmpty(this.curAmtVal))
    {
      this.showValidationAlert("Amount should not be empty");
      return;
    }
    if(this.isEmpty(this.curQtyVal))
    {
      this.showValidationAlert("Quantity should not be empty");
      return;
    }
    if(this.isEmpty(this.curStateVal))
    {
      this.showValidationAlert("State should not be empty");
      return;
    }
    if(this.curStateVal.length<2)
    {
     this.toastr.error('Error occured', 'State should have min 2 characters');  
     return;
    }
    if(this.isEmpty(this.curZipVal))
    {
      this.showValidationAlert("Zip should not be empty");
      return;
    }
    if(this.curZipVal.length<3)
    {
     this.toastr.error('Error occured', 'Zip should min 3 characters');  
     return;
    }


        this.service.updateProduct(this.currecordid,this.currecorditem,this.curIdVal,this.curNameVal,this.curStateVal,this.curZipVal,this.curAmtVal,this.curQtyVal,this.curItemVal).subscribe(response => {
			//  this.msg =response;
        response =JSON.parse(response);
      //  console.log(response[0].status+"=="+response[0].message)
         if(response[0].status=="success")
        {
          this.toastr.success("success", 'Product updated');  
          this.displayStyle = "none";
          this.ngOnInit();  
        }
        else 
        {
          this.toastr.error('Error occured', response[0].message);  
        }
        });
  
  }
  showValidationAlert(msgTxt:any)
  {
    this.toastr.error('Error occured',msgTxt); 
  }
  
}
