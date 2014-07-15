package at.nonblocking.portlet.angularjs.model;

import java.util.List;

public class UserList {

    private int total;
    private List<User> users;

    public UserList() {

    }

    public UserList(int total, List<User> users) {
        this.total = total;
        this.users = users;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
