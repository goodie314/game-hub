import {Component, OnInit} from "@angular/core";
import {User} from "../../util/types/user";
import {UserAddService} from "./user-add.service";

@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})

export class UserAddComponent implements OnInit {
  users: User[] = [];
  visibleUsers: User[] = [];
  searchText: string;
  dropdown = false;

  constructor(private userAddService: UserAddService) {
  }

  ngOnInit(): void {
    this.userAddService.getUsers()
      .subscribe((users) => {
        this.users = users;
        console.log('users: ', users);
      });
  }

  filterResults(): void {
    if (this.searchText) {
      this.visibleUsers = this.users.filter((user) => {
        return user.userName.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.visibleUsers = [];
    }
  }
}
