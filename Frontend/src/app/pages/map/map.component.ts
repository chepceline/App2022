import { Component, OnInit } from "@angular/core";
import { AuthService, User } from '@auth0/auth0-angular';
import { TutorialService } from "src/app/services/tutorial.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  tutorial = {
    ScenarioName: '',
    ModelLinks: '',
    LinktoDataset: '',
    Description: '',
    emailid: '',
    Userid: '',
  };
  submitted = false;

  constructor(public auth: AuthService, private tutorialservice: TutorialService,
    private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.tutorial.emailid = user.email;
      this.tutorial.Userid = user.sub.split('|')[1];
      this.Getdata(user.sub.split('|')[1]);
      console.log("User is:",user);
    });
  }

  saveTutorial(): void {
    const data = {
      ScenarioName: this.tutorial.ScenarioName,
      ModelLinks: this.tutorial.ModelLinks,
      LinktoDataset: this.tutorial.LinktoDataset,
      Description: this.tutorial.Description,
      emailid: this.tutorial.emailid,
      Userid: this.tutorial.Userid
    };

    this.tutorialservice.create(data)
      .subscribe(
        response => {
          console.log("Response data:", response);
          this.router.navigate(['/dashboard'])
        },
        error => {
          console.log(error);
        }
      );
  };

  Getdata(id): void {
    this.tutorialservice.get(id)
      .subscribe(
        response => {
          console.log("Response data:", response);
        },
        error => {
          console.log(error);
        }
      );
  }
  
}
