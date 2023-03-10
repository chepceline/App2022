import { Component, OnInit } from "@angular/core";
import { AuthService, User } from '@auth0/auth0-angular';
import { TutorialService } from "src/app/services/tutorial.service";
import { ActivatedRoute, Router } from "@angular/router";
import Papa from 'papaparse';
@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
  data: string[][];
  headers: string[];
  protectedFeatures: string[] = [];
  uniqueValues: string[] = [];
  favourableOutcomes: string[] = [];
  selectedTargetColumn: string;
  uniqueOutcomes: string[];
  Solutiontype:string;
  selectedFavourableOutcomes: string[];
  //protectedFeatures: string[] = [];
  public showVal1: boolean = true;

  toggleVal(): void {
    this.showVal1 = !this.showVal1;
    if(this.tutorial.Solutiontype == 'unsupervised'){
      this.tutorial.Solutiontype = 'supervised';
    }
    else{this.tutorial.Solutiontype = 'unsupervised';}
    
  }

  ScenarioName: any;
  TrainnigDatafile: File;
  TestFile: File;
  FactsheetFile: File;
  Outlierdatafile:File;
  ModelFile: File;
  ProtectedFeatures:string[];
  Protectedvalues:string[];
  // form: FormGroup;
  tutorial = {
    SelectScenario: '',
    NameSolution: '',
    DescriptionSolution: '',
    Solutiontype: 'supervised' ,
    // TrainingFile: '',
    // TestFile: '',
    // FactsheetFile: '',
    // ModelFile: '',
    Targetcolumn: '',
    Favourableoutcome:'',
    Protectedfeatures:'',
    Protectedvalues:'',
    // TrainnigDatafile: File,
    ScenarioName: '',
    ModelLinks: '',
    LinktoDataset: '',
    Description: '',
    emailid: '',
    Userid: '',
  };

  constructor(public auth: AuthService, private tutorialservice: TutorialService, private router: Router) {}
  



  ngOnInit() {
    if (!this.showVal1) {
      this.tutorial.Solutiontype = 'unsupervised';
    }
    this.auth.user$.subscribe(user => {
      this.tutorial.Userid = user.sub.split('|')[1];
      this.tutorialservice.get(user.sub.split('|')[1]).subscribe((data:any)=>{
        this.ScenarioName=data.ScenarioName;
        console.log("ScenarioNameList:",data.ScenarioName);
      });
      // this.form = this.formBuilder.group({
      //   profile: ['']
      // });
      // console.log("User is:",user);
    });
  }

  selectedForm: string = 'supervised';
  onFormSelectionChange(selectedValue: string): void {
    this.selectedForm = selectedValue;}

    onFileChange(event) {
      const reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onload = () => {
        const csvData = reader.result as string;
        const allTextLines = csvData.split(/\r|\n|\r/);
        const headers = allTextLines[0].split(',');
        const data = [];
        for (let i = 1; i < allTextLines.length; i++) {
          const lineData = allTextLines[i].split(',');
          if (lineData.length === headers.length) {
            const tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(lineData[j]);
            }
            data.push(tarr);
          }
        }
        this.data = data;
        this.headers = headers;
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    }
    
    setUniqueOutcomes() {
      this.uniqueOutcomes = [];
      for (const row of this.data) {
        const value = row[this.headers.indexOf(this.selectedTargetColumn)];
        if (this.uniqueOutcomes.indexOf(value) === -1) {
          this.uniqueOutcomes.push(value);
        }
      }
    }
    
    toggleFavourableOutcome(value) {
      const index = this.selectedFavourableOutcomes.indexOf(value);
      if (index === -1) {
        this.selectedFavourableOutcomes.push(value);
      } else {
        this.selectedFavourableOutcomes.splice(index, 1);
      }
    }
    toggleProtectedFeature(feature) {
      const index = this.protectedFeatures.indexOf(feature);
      if (index === -1) {
        this.protectedFeatures.push(feature);
        this.uniqueValues = [];
        for (const row of this.data) {
          const value = row[this.headers.indexOf(feature)];
          if (this.uniqueValues.indexOf(value) === -1) {
            this.uniqueValues.push(value);
          }
        }
      } else {
        this.protectedFeatures.splice(index, 1);
        this.uniqueValues = [];
      }
    }
    
  
  
  

    
  onTrainnigDatafile(event: any){
    // const file = event.target.files[0];
    // this.form.get('profile').setValue(file);
    this.TrainnigDatafile = event.target.files[0];
    const file = event.target.files[0];
  
      // Use a library like PapaParse to parse the contents of the file
      // into a 2D array of strings
      Papa.parse(file, {
        header: true,
        complete: result => {
          this.headers = result.meta.fields;
          this.data = result.data;
        }
      });
  }
  onTestFile(event: any){
    // const file = event.target.files[0];
    // this.form.get('profile').setValue(file);
    this.TestFile = event.target.files[0];
  }

  onOutlierdatafile(event: any){
    // const file = event.target.files[0];
    // this.form.get('profile').setValue(file);
    this.Outlierdatafile = event.target.files[0];
  }


  onFactsheetfile(event: any){
    // const file = event.target.files[0];
    // this.form.get('profile').setValue(file);
    this.FactsheetFile = event.target.files[0];
  }
  onModelfile(event: any){
    // const file = event.target.files[0];
    // this.form.get('profile').setValue(file);
    this.ModelFile = event.target.files[0];
  }

  saveTutorial(): void {
    const formData = new FormData();
    formData.append('Userid', this.tutorial.Userid);
    formData.append('SelectScenario', this.tutorial.SelectScenario);
    formData.append('NameSolution', this.tutorial.NameSolution);
    formData.append('DescriptionSolution', this.tutorial.DescriptionSolution);
    formData.append('TrainingFile', this.TrainnigDatafile);
    formData.append('TestFile', this.TestFile);
    formData.append('FactsheetFile', this.FactsheetFile);
    formData.append('Solutiontype', this.Solutiontype);


    formData.append('ProtectedFeature', new Blob(this.ProtectedFeatures, {type: 'text/plain'}));
    formData.append('Protectedvalues', new Blob(this.Protectedvalues, {type: 'text/plain'}));
    
    
    formData.append('Outlierdatafile', this.Outlierdatafile);
    
    formData.append('ModelFile', this.ModelFile);
    formData.append('Targetcolumn', this.tutorial.Targetcolumn);
    formData.append('Favourableoutcome', this.tutorial.Favourableoutcome);

    const data = {
      SelectScenario: this.tutorial.SelectScenario,
      TrainnigDatafile: this.TrainnigDatafile,
      // TrainnigDatafile: this.form.get('profile').value,
      DatafileName: this.TrainnigDatafile.name,
      ModelLinks: this.tutorial.ModelLinks,
      LinktoDataset: this.tutorial.LinktoDataset,
      Description: this.tutorial.Description,
      emailid: this.tutorial.emailid,
      Userid: this.tutorial.Userid
    };

    this.tutorialservice.uploadsolution(formData)
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
