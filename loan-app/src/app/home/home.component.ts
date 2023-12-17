/**
 * Title: home.component.ts
 * Author: John Davidson
 * Date: 16 December 2023
 * Description: Home component
 */


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Declare class properties to store loan-related input and output data.
  loanAmount: number;
  interestRate: number;
  loanDuration: number ;

  monthlyPayment: number;
  totalInterestPaid: number;

  // Declare a FormGroup to handle the loan form.
  loanForm: FormGroup;

  // Constructor with dependency injection for Form Builder.
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the loanForm with form controls and validators.
    this.loanForm = this.fb.group({
      loanAmount: ['', Validators.required],
      interestRate: ['', Validators.required],
      loanDuration: ['', Validators.required]
    })
  }

  // Getter for easy access to form controls in the template.
  get form() { return this.loanForm.controls; }

  // Method to calculate the monthly payment and total interest.
  calculateLoan() {
    // Extract loan-related values from the form.
    let p = this.loanForm.value.loanAmount;
    let r = this.loanForm.value.interestRate / 12 / 100; // Convert to a monthly rate.
    let n = this.loanForm.value.loanDuration * 12; // Convert years into months.

    // Calculate monthly payments using the loan formula.
    this.monthlyPayment = p * (r * Math.pow((r + 1), n)) / (Math.pow((1 + r), n) -1);

    // Calculate total interest paid over the loan duration.
    this.totalInterestPaid = (this.monthlyPayment * n) - p;
  }

}
