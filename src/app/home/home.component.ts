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
        // console.log("entryText value changed");

        setTimeout(() => {
          if (currentValue.length > 0) {
            // Iterate through currentValue string

            // console.log("Tamanho currentVal: " + currentValue.length);
            // console.log("Tamanho outputTexts [INICIO]: " + this.outputTexts.length);

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
                // console.log(phrase);
              }

              // console.log("Tamanho outputTexts [FIM]: " + this.outputTexts.length);

            }
          } else {
            //remove any value left on the array 
            if (this.outputTexts.length > currentValue.length) {
              this.outputTexts.pop();
            }
          }

          // if (currentValue.length > 0) {
          //   // Iterate through currentValue string
          //   for (let i = 0; i < currentValue.length; i++) {
          //     console.log("Tamanho currentVal: " + currentValue.length);
          //     console.log("INDEX 0 currentVal: " + currentValue.charAt(0));
          //     if(currentValue.length == 2)
          //       console.log("INDEX 1 currentVal: " + currentValue.charAt(1));

          //     //Verifies if value is part of alphabet
          //     currentValue = this.uppercasePipe.transform(currentValue);
          //     if (
          //       currentValue.charAt(i) >= "A" &&
          //       currentValue.charAt(i) <= "Z"
          //     ) {
          //       let phrase: string[] = [];

          //       //Search for letter at the alphabet
          //       for (let j = 0; j < this.alphabet.length; j++) {
          //         phrase = phrase.concat(this.alphabet[i] + " ");
          //         if (
          //           currentValue.charAt(currentValue.length - 1) ===
          //           this.alphabet[j]
          //         ) {
          //           phrase = phrase.concat("*DING*");
          //           this.outputTexts.push(phrase.join(" "));
          //           break;
          //         }

          //       }
          //       console.log(phrase);

          //       //Reset array if the user erased some value
          //       if (this.outputTexts.length < currentValue.length) {
          //         this.outputTexts.splice(0);
          //       }
          //     }
          //   }
          // }
        }, 700);

        // setTimeout(() => {
        //   console.log(this.formGroup.get("entryText")?.value);
        // });
      });
  }

  get getEntryText() {
    return this.formGroup.controls;
  }
}
