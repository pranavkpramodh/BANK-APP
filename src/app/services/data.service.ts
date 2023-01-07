import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// global http header object
const options = {
  headers : new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  currentUser = "";
  currentAcno = "";
 

  
  constructor(private http:HttpClient) {
    // this.getDetailes()
   }

  // save detailes - to save data to the ocal storage 
  saveDetailes(){
    //DATABASE
    if(this.userDetailes){
      localStorage.setItem('DataBase',JSON.stringify(this.userDetailes))
    }
    // current user
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    }
    // currentAcno
    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
  }



  getDetailes(){
    // if(localStorage.getItem('DataBase')){
    //   this.userDetailes = JSON.parse(localStorage.getItem('DataBase') || '')
    // }

    // if(localStorage.getItem('currentUser')){
    //   this.currentUser =  JSON.parse(localStorage.getItem('currentUser') || '')
    // }
    
    // if(localStorage.getItem('currentAcno')){
    //   this.currentAcno =  JSON.parse(localStorage.getItem('currentAcno') || '')
    // }
  }




  //data base creation
userDetailes:any={
  1000:{acno:1000,username:"amal Kumar",password:1000,balance:1000,transaction:[]},
  1001:{acno:1001,username:"amal",password:1001,balance:1000,transaction:[]},
  1002:{acno:1002,username:"amal",password:1002,balance:1000,transaction:[]},
}

//register service
registration(acno:any,username:any,password:any){

  const data={
    acno,
    password,
    username,
  }
  return this.http.post('http://localhost:3000/registration', data)

//   let userDetailes=this.userDetailes;

//   if(acno in userDetailes){
//     return false;
//   }else{
//     userDetailes[acno]={acno,username,password,balance:0}
//     this.saveDetailes();
//     console.log(userDetailes);
//     return true
//   }
}


//login service
login(acno:any, pswd:any){
  
  const data={
    acno,
    pswd,
  }
  return this.http.post('http://localhost:3000/login', data)


// let userDetailes = this.userDetailes

// if(acno in userDetailes){
//   if(pswd == userDetailes[acno]['password']){
//     this.currentUser = userDetailes[acno]['username']
//     this.currentAcno = acno;
//     this.saveDetailes();
//     return true
//   }else{
//     return false
//   }
// }else{
//   return false
// }

}


getToken(){
  //fetch token from local storage
  const token = JSON.parse(localStorage.getItem('token') || '');
  // append token inside the header
  let headers = new HttpHeaders()

  if(token){
    options.headers = headers.append('x-access-token', token)
  }
  return options//to get token

}

deposit(acno:any, pswd:any, amount:any){

  const data={
    acno,
    pswd,
    amount:amount,
  }

  return this.http.post('http://localhost:3000/deposit',data,this.getToken())




  // let amount = parseInt(amt)
  // let userDetailes = this.userDetailes;

  // if(acno in userDetailes){
  //   if(pswd == userDetailes[acno]['password']){
  //     userDetailes[acno]['balance'] += amount
  //     userDetailes[acno]['transaction'].push({
  //       Type:"Credit",
  //       Amount:amount
  //     })
  //     this.saveDetailes();
  //     console.log(userDetailes);
      
  //     return userDetailes[acno]['balance']
  //   }else{
  //     alert('Password missmatch')
  //     return false
  //   }
  // }else{
  //   alert('Inavalid data')
  //   return false
  // }
}



withdraw(acno:any, pswd:any, amount:any){

  const data={
    acno,
    pswd,
    amount:amount,
  }

  return this.http.post('http://localhost:3000/withdraw',data,this.getToken())









  // let amount = parseInt(amt)
  // let userDetailes = this.userDetailes;

  // if(acno in userDetailes){
  //   if(pswd == userDetailes[acno]['password']){
  //     if(userDetailes[acno]['balance']>amount){

  //       userDetailes[acno]['balance'] -= amount
  //       userDetailes[acno]['transaction'].push({
  //         Type:"Debit",
  //         Amount:amount
  //       })
  //       this.saveDetailes();
  //       return userDetailes[acno]['balance']

  //     }else{
  //       alert('Transaction failed')
  //       return false
  //     }        

  //     }else{
  //       alert('Password missmatch')
  //       return false
  //     }
      
  // }else{
  //   alert('Invalid data')
  // }

}

getTransaction(acno:any){
  const data = {
    acno
  }
  return this.http.post('http://localhost:3000/transaction',data,this.getToken())
}


// delete
deleteAcc(acno:any){
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
}

}
