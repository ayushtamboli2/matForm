import { UserService } from './../../../services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as CryptoJs from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('dataContainer') dataContainer: ElementRef | undefined;

  captchaText: any;
  hide: boolean = false;
  encryptionKey = 'ayush';
  constructor(private fb: FormBuilder, private us: UserService) { }

  ngOnInit() {
    this.captcha();
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    textCaptcha: ['']
  })

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    if (this.checkCaptcha()) {
      const password = CryptoJs.AES.encrypt(this.loginForm.get('password')?.value, this.encryptionKey)
      this.loginForm.patchValue({ password: `${password}` })
      this.us.login(this.loginForm.value).subscribe(res => {
        console.log(password)
      })
    } else {
      console.log("Invalid Captcha !!!")
    }

  }

  encryptData(data: any) {
    try {
      return CryptoJs.AES.encrypt(JSON.stringify(data), this.encryptionKey)
    } catch (err) {
      console.log(err)
      return 0
    }
  }

  checkCaptcha() {
    var bytes = CryptoJs.AES.decrypt(this.captchaText, 'svgcaptcha_key');
    let txtCaptcha = '';
    if (bytes.toString()) {
      txtCaptcha = bytes.toString(CryptoJs.enc.Utf8);

    }
    if (this.loginForm.get('textCaptcha')!.value === txtCaptcha) {
      return true;
    } else {
      return false;
    }
  }

  captcha() {
    this.us.getCaptcha().subscribe((res: any) => {
      this.dataContainer!.nativeElement.innerHTML = res.data
      this.captchaText = res.text
      // console.log(this.captchaText)
    })
  }

}
