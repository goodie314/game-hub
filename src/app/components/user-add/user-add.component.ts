import {Component, OnInit} from "@angular/core";
import {User} from "../../util/types/user";
import {UserAddService} from "./user-add.service";
import {MessageService} from "../message/message.service";

@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})

export class UserAddComponent implements OnInit {
  users: User[] = [];
  searchText: string;

  constructor(private userAddService: UserAddService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userAddService.getUsers()
      .subscribe((users) => {
        this.users = users;
        console.log('users: ', users);
      });
  }

  submit(): void {
    this.userAddService.makeRequest(null).subscribe();
  }
}
