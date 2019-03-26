import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-bar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

    @Input() addTaskSelected: string;
    @Input() viewTasksSelected: string;
    
    constructor(private router: Router) { }

    addTask(): void {
        this.router.navigate(['add-task']);
    }

    viewTasks(): void {
        this.router.navigate(['view-tasks']);
    }
}