import { UpperCasePipe } from "@angular/common";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [UpperCasePipe],
})
export class HomeComponent implements OnInit {
  public formGroup: FormGroup;
  private alphabet: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  public outputTexts: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private uppercasePipe: UpperCasePipe
  ) {
    this.formGroup = formBuilder.group({
      entryText: ["", Validators.pattern("^[a-zA-Z]+")],
    });
  }

  ngOnInit(): void {
    this.formGroup
      .get("entryText")
      ?.valueChanges.subscribe((currentValue: string) => {
        console.log("entryText value changed");
        // console.log(currentValue);

        if (currentValue.length > 0) {
          // Iterate through currentValue string
          for (let i = 0; i < currentValue.length; i++) {

            //Verifies if value is part of alphabet
            if (
              currentValue.charAt(i) >= ("a" || "A") &&
              currentValue.charAt(i) <= ("z" || "Z")
            ) {
              currentValue = this.uppercasePipe.transform(currentValue);
              let phrase: string[] = [];

              //Search for letter at the alphabet
              for (let i = 0; i < this.alphabet.length; i++) {
                phrase = phrase.concat(this.alphabet[i] + " ");
                if (
                  currentValue.charAt(currentValue.length - 1) ===
                  this.alphabet[i]
                ) {
                  phrase = phrase.concat("*DING*");
                  break;
                }
              }
              console.log(phrase);

              //Reset array if the user erased some value
              if (this.outputTexts.length < currentValue.length) {
                this.outputTexts = [""];
              } else {
                this.outputTexts.push(phrase.join(" "));
              }
            }
          }
        }

        // setTimeout(() => {
        //   console.log(this.formGroup.get("entryText")?.value);
        // });
      });
  }

  get getEntryText() {
    return this.formGroup.controls;
  }
}
