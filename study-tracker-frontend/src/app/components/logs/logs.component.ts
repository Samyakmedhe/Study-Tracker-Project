import { Component, OnInit } from '@angular/core';
import { LogService, StudyLog } from '../../services/log.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-logs',
  standalone: false,
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit {
  logs: StudyLog[] = [];
  newLog: StudyLog = { date: '', subject: '', duration: 0, description: '' };

  constructor(private logService: LogService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.logService.getLogs().subscribe(data => {
      this.logs = data;
    });
  }

  addLog(): void {
    if (this.newLog.date && this.newLog.subject && this.newLog.description && this.newLog.duration > 0) {
      this.logService.addLog(this.newLog).subscribe(() => {
        this.loadLogs();
        this.toastr.success('Log added successfully!', 'Success');
        this.newLog = { date: '', subject: '', duration: 0, description: '' };
      }, err => {
        this.toastr.error('Failed to add log.', 'Error');
      });
    } else {
      this.toastr.warning('Please fill in all fields.', 'Validation');
    }
  }
  
  downloadCSV(): void {
    this.logService.downloadCSV();
    this.toastr.info('Your CSV will download soon.', 'Download');
  }
  toggleDarkMode() {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  }
  
  clearLogs() {
    if (confirm('Are you sure you want to delete ALL logs? This cannot be undone!')) {
      this.logService.clearLogs().subscribe(() => {
        this.loadLogs(); // ✅ works now!
        alert('All logs cleared!');
      });
    }
  }

  
  
}