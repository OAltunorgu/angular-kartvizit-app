import { Card } from './../../models/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from './../../services/card.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {
  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      title: [this.data?.title || '', Validators.required],
      phone: [this.data?.phone || '', Validators.required],
      email: [this.data?.email || '', Validators.email],
      address: this.data?.address || '',
    });
  }

  addCard() {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value).subscribe(
      (res: any) => {
        this.getSuccess('Kartvizit başarıyla eklendi.');
      },
      (err: any) => {
        this.getError(err.message || 'Hata oluştu.');
      }
    );
  }

  updateCard() {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value, this.data.id).subscribe(
      (res: any) => {
        this.getSuccess('Kartvizit başarıyla güncellendi.');
      },
      (err: any) => {
        this.getError(err.message || 'Hata oluştu.');
      }
    );
  }

  deleteCard() {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id).subscribe(
      (res: any) => {
        this.getSuccess('Kartvizit başarıyla silindi.');
      },
      (err: any) => {
        this.getError(err.message || 'Hata oluştu.');
      }
    );
  }

  getSuccess(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
    });
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
    });
    this.showSpinner = false;
  }
}
