import { Card } from './../models/card';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards!: Card[];

  private apiUrl: string = `${environment.APIURL}`;

  constructor(private http: HttpClient) {}

  getCards() {
    let url = `${this.apiUrl}/cards`;
    this.http.get<Card[]>(url).subscribe((res: Card[]) => {
      this.cards = res;
    });
  }

  addCard(card: Card) {
    let url = `${this.apiUrl}/cards`;
    return this.http.post(url, card);
  }

  updateCard(card: Card, cardId: number) {
    let url = `${this.apiUrl}/cards/${cardId}`;
    return this.http.put(url, card);
  }

  deleteCard(cardId: number) {
    let url = `${this.apiUrl}/cards/${cardId}`;
    return this.http.delete(url);
  }
}
