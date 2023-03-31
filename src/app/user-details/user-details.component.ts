import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/model/user';
import { LocalStorageService } from '../local-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  id!: number;
  user!: User;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.loading = true
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.userService.getUser(this.id).subscribe((userData) => {
          this.user = userData.data;
          const favorites = this.localStorage.getFavorites();
          this.user.favorite = favorites?.includes(this.user.id) ?? false;
          this.loading = false;
        });
      }
    })
  }
  onUserClick(id: string) {
    this.user.favorite = !this.user.favorite
    this.localStorage.save(id);
  }
}
