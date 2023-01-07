import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
acno = '';
pswd = '';
amt = '';

acno1 = '';
pswd1 = '';
amt1 = '';

//current user properties
user = '';

// current date and time
sdate:any;




  //  deposit form
    depositForm =  this.fb.group({//group
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amt:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })

// widrow form
    withdrawForm =  this.fb.group({//group
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amt1:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })

  constructor(private fb:FormBuilder, private ds:DataService, private router:Router) {
    if(localStorage.getItem('currentUser')){
      this.user = JSON.parse(localStorage.getItem('currentUser') || '')
    }
    // console.log(this.user);
    this.sdate = new Date();
    
   }

  ngOnInit(): void {
    if(!localStorage.getItem('currentUser')){
      alert('please login first')
      this.router.navigateByUrl('')
    }

    this.user = JSON.parse(localStorage.getItem('currentUser') || '')
    console.log(this.user);
  }


deposit(){
  // alert('clicked')
  // console.log(this.depositForm.get('acno')?.errors);

  var acno = this.depositForm.value.acno;
  var pswd = this.depositForm.value.pswd;
  var amt = this.depositForm.value.amt;

  if(this.depositForm.valid){

   this.ds.deposit(acno, pswd, amt)
   .subscribe((result:any)=>{
    alert(result.message)
   },
   result=>{
    alert(result.error.message)
   })
}
}


withdraw(){
  // alert('clicked')
  // console.log(this.withdrawForm.get('acno')?.errors);

  var acno1 = this.withdrawForm.value.acno1;
  var pswd1 = this.withdrawForm.value.pswd1;
  var amt1 = this.withdrawForm.value.amt1;

  if(this.withdrawForm.valid){

  this.ds.withdraw(acno1, pswd1, amt1)
  .subscribe((result:any)=>{
    alert(result.message)
  },
  result=>{
    alert(result.error.message)
  })
  }
}
  



logout(){
  // alert('clicked')
  // remove currentAcno and currentUser from localstorage
  localStorage.removeItem('currentAcno');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  this.router.navigateByUrl('');

}




delete(){
  // alert('clicked')
  this.acno = JSON.parse(localStorage.getItem('currentAcno')||'')
}

onCancel(){
  this.acno = ""
}

onDelete(event:any){
// alert(event)
this.ds.deleteAcc(event)
.subscribe((result:any) => {
alert(result.message)
// this.router.navigateByUrl('');
this.logout()

},
result => {
  alert(result.error.message)
}
)
}

}
