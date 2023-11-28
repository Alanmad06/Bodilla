import { inject } from "@angular/core"
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth"

export class loginService{

    auth : Auth = inject(Auth)
    
    login(user :string , password:string){
        return signInWithEmailAndPassword(this.auth,user,password)
    }

    logOut(){
         this.auth.signOut()
    }

}