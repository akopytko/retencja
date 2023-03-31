import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/model/user';
import { LocalStorageService } from '../local-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-browser',
  templateUrl: './user-browser.component.html',
  styleUrls: ['./user-browser.component.scss'],
  providers: [MessageService]
})

export class UserBrowserComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;

  constructor(private userService: UserService,
    private localStorage: LocalStorageService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.get().subscribe((usersData) => {
      var favorites = this.localStorage.getFavorites();
      this.users = usersData.data;
      this.users.forEach(element => {
        if (favorites?.includes(element.id)) {
          element.favorite = true;
        }
        else {
          element.favorite = false;
        }
      });
      this.loading = false;
    });
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  clear(table: Table) {
    table.clear();
  }

  onUserClick(user: User) {
    user.favorite = !user.favorite;
    if(user.favorite) {
          this.messageService.add({ severity: 'success', summary: 'Super', detail:  user.first_name + ' został dodany do ulubionych!'})}
          else{
            this.messageService.add({ severity: 'success', summary: 'Super', detail:  user.first_name + ' został usunięty z ulubionych!' });
          }
    this.localStorage.save(user.id);
  }
}
