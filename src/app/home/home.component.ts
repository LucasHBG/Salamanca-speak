import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      entryText: ["", Validators.pattern("^[A-Z]+")],
    });
  }

  get getEntryText() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {}
}
