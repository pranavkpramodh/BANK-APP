import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  acno:any //hold the current acno
  transaction:any //hold the transaction

  constructor(private ds:DataService) {//dependency injection
    this.acno = JSON.parse(localStorage.getItem('currentAcno')||'');
    this.ds.getTransaction(this.acno)
    .subscribe((result:any)=>{
      this.transaction = result.transaction
    },
    result => {
      alert(result.error.message)
    })
    
   }

  ngOnInit(): void {
  }

}
