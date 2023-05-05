import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-capsule',
  templateUrl: './create-capsule.component.html',
  styleUrls: ['./create-capsule.component.scss']
})
export class CreateCapsuleComponent {

  public form = {
    title: null,
    description: null,
    file: null,
  }

  constructor(private dialogRef: MatDialogRef<CreateCapsuleComponent>) {}

  onSubmit(){

  }
}

