import { UpperCasePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
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
        setTimeout(() => {
          if (currentValue.length > 0) {
            //Reset array if the user erased some value
            if (this.outputTexts.length > currentValue.length) {
              this.outputTexts.pop();
            } else {
              //Verifies if value is part of alphabet
              currentValue = this.uppercasePipe.transform(currentValue);
              if (
                currentValue.charAt(currentValue.length - 1) >= "A" &&
                currentValue.charAt(currentValue.length - 1) <= "Z"
              ) {
                let phrase: string[] = [];

                //Search for letter at the alphabet
                for (let j = 0; j < this.alphabet.length; j++) {
                  phrase = phrase.concat(this.alphabet[j] + " ");
                  if (
                    currentValue.charAt(currentValue.length - 1) ===
                    this.alphabet[j]
                  ) {
                    phrase = phrase.concat("*DING*");
                    this.outputTexts.push(phrase.join(" "));
                    break;
                  }
                }
              }
            }
          } else {
            //remove any value left on the array
            if (this.outputTexts.length > currentValue.length) {
              this.outputTexts.pop();
            }
          }
        }, 700);
      });
  }

  get getEntryText() {
    return this.formGroup.controls;
  }

  get getOutputTextClipboard(): string {
    let clipboardOutput: string = "";
    
    if (this.outputTexts.length > 0) {
      for (let i = 0; i < this.outputTexts.length; i++) {
        clipboardOutput = clipboardOutput.concat(this.outputTexts[i] + "\n");
      }
    }
    
    return clipboardOutput;
  }
}
