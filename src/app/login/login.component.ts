import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//(3rd Execute)
  //Class -collection of propertioe and functions
  //properties/variables

aim="Your Perfect Banking parter"

account = "Enter your account here"
acno=''
pswd=''


// loginform
loginForm =  this.fb.group({//group
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})


  //functions/methods -user defined functions  //(4th Execute)
  //dependancy injection
  constructor(private fb:FormBuilder, private ds:DataService, private router:Router) {//(1st Execute)
    //It automatically invoks when the object is created 
    //object initialization
   }

 


  ngOnInit(): void {//(2nd Execute)
    //Its a life cycle hooks of angular
    //when the component is created at same time it will initialize or authorize 
  }
  acnoChange(event:any){//any is used to mention any datatype
    console.log(event);
    this.acno=event.target.value;
    console.log(this.acno);
    
  }
  pswdChange(event:any){
    this.pswd=event.target.value;
    console.log(this.pswd);
    
  }

  login(){
    // console.log(this.loginForm);
    // console.log(this.loginForm.valid);


    // console.log(this.loginForm.get('acno')?.errors);

    // alert('login cllicked')
    var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd
    // var userDetailes=this.ds.userDetailes

    if(this.loginForm.valid){
    this.ds.login(acno,pswd)//function call - program control goes to the function and execute the function
      .subscribe((result:any)=>{
        localStorage.setItem('currentUser', JSON.stringify(result.currentUser))
        localStorage.setItem('currentAcno', JSON.stringify(result.currentAcno))
        localStorage.setItem('token', JSON.stringify(result.token))
        alert(result.message);
        this.router.navigateByUrl('dashboard')

      },
      result=>{
        alert(result.error.message)

      }
      )
    
  //   if(result){
  //     alert('login succeesfull')
  //     this.router.navigateByUrl('dashboard')
  //   }else{
  //     alert('login failed')
  //     console.log(this.loginForm.valid+'ff');

  //   }
  // }else{
  //   alert('invalid data')
  // }

  // login(a:any,p:any){
  //   // alert('login cllicked')
  //   var acno=a.value;
  //   var pswd=p.value;
  //   var userDetailes=this.userDetailes

  //   if(acno in userDetailes){
  //     if(pswd==userDetailes[acno]['password']){
  //       alert('login successfull')
        
  //     }else{
  //       alert('invalid password')
  //     }
  //   }else{
  //     alert('invalid username')
  //   }
  // }


}
}
}