import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
interface CheckboxItem {
  id: number;
  name: string;
}
@Component({
  selector: 'app-sorting-config-modal',
  templateUrl: './sorting-config-modal.component.html',
  styleUrls: ['./sorting-config-modal.component.css']
})
export class SortingConfigModalComponent implements OnInit {
  SortSetting:any;
  sortByList:any=[{id:1,name:'Ascending'},{id:2,name:'Descending'},{id:3,name:'Recently Added'}];
  selectedSortValue:CheckboxItem;
  finalSortData:any={'sort_field':'','sort_direction':''};
  sortTitle:any;
  constructor(public dialog: MatDialogRef<SortingConfigModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.sortTitle=this.data.title;
      let selectedValue=this.sortByList.find((x:any)=>x.id===this.data.sort_direction);
      console.log(selectedValue,this.data)
      this.selectedSortValue=selectedValue;
      this.finalSortData.sort_direction=this.data.sort_direction;
      this.finalSortData.sort_field=this.data.sort_field;
    }

  ngOnInit(): void {
  }


  onsortSelect(item:any){
this.finalSortData.sort_direction=item.id;
  }
  sortReset(){
    this.finalSortData.sort_direction='';
    this.finalSortData.sort_field='';
    this.dialog.close(this.finalSortData);
  }
  applySort(){
    this.dialog.close(this.finalSortData);
  }
  
}
