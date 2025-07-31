import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudyLog {
  id?: number;
  date: string;
  subject: string;
  duration: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:8080/api/studylogs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<StudyLog[]> {
    return this.http.get<StudyLog[]>(this.apiUrl);
  }

  addLog(log: StudyLog): Observable<StudyLog> {
    return this.http.post<StudyLog>(this.apiUrl, log);
  }

  downloadCSV(): void {
    window.open(`${this.apiUrl}/export`, '_blank');
  }
  clearLogs(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`);
  }
  
}
