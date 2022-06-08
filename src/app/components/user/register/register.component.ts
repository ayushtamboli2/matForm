import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = false;
  encryptionKey = 'ayush';

  constructor(private fb: FormBuilder, private users: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  registerForm: FormGroup = this.fb.group({
    full_name: ['', [Validators.required, Validators.nullValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  //Register the values
  onRegister() {
    if (!this.registerForm.valid) {
      return;
    }
    // console.log(this.registerForm.value);
    const password = CryptoJs.AES.encrypt(this.registerForm.get('password')?.value, this.encryptionKey)
    this.registerForm.patchValue({ password: `${password}` })
    this.users.regDetails('login/register', this.registerForm.value).subscribe((res: any) => {
      console.log(this.registerForm.value.password)
      if (res['affectedRows']) {
        //  this.getregDetails();
        //this.registerForm.reset();
        Swal.fire({ icon: 'success', text: "Register Successfully.", timer: 2000 });
        this.router.navigate(['/user/login'])
      }
    });
  }
}
