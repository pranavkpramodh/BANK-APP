import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
acno='';
pswd='';
uname='';


  constructor(private fb:FormBuilder, private ds:DataService, private router:Router) { }

  //registeration model
registerForm =  this.fb.group({//group
  uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})


//control pass to ts to html file


  ngOnInit(): void {
  }

  registration(){
    console.log(this.registerForm);
    
    // alert('clicked')
    // console.log(this.registerForm.get('uname')?.errors);
    
    var uname = this.registerForm.value.uname;//username that user gives
    var acno = this.registerForm.value.acno;
    var pswd = this.registerForm.value.pswd;

    if(this.registerForm.valid){
      // console.log(this.registerForm.get('uname')?.errors);
      this.ds.registration(acno,uname,pswd)
      .subscribe((result:any)=>{
        alert(result.message);
        this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message)
      })      

    // }else{
    //   alert('invalid form')
    // }
      
      // const result = this.ds.registration(acno,uname,pswd);//function call - program control goes to the function and execute the function
  //   if(result){
  //     alert('register successful')
  //     this.router.navigateByUrl('')
  //   }else{
  //     alert('User already registered');
  //     this.router.navigateByUrl('register')
  //   }
  // }else{
  //   alert('ivalid data')
  // }
}
}
}

