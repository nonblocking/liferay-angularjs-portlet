package at.nonblocking.portlet.angularjs.model;

import java.util.Date;

public class UserDetail {

    private String screenName;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private Date lastLoginDate;
    private String lastLoginIp;
    private String languageId;
    private String userGroups;
    private String roles;

    public String getScreenName() {
      return screenName;
    }

    public void setScreenName(String screenName) {
      this.screenName = screenName;
    }

    public String getFirstName() {
      return firstName;
    }

    public void setFirstName(String firstName) {
      this.firstName = firstName;
    }

    public String getLastName() {
      return lastName;
    }

    public void setLastName(String lastName) {
      this.lastName = lastName;
    }

    public String getEmailAddress() {
      return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
      this.emailAddress = emailAddress;
    }

    public Date getLastLoginDate() {
      return lastLoginDate;
    }

    public void setLastLoginDate(Date lastLoginDate) {
      this.lastLoginDate = lastLoginDate;
    }

    public String getLastLoginIp() {
      return lastLoginIp;
    }

    public void setLastLoginIp(String lastLoginIp) {
      this.lastLoginIp = lastLoginIp;
    }

    public String getLanguageId() {
      return languageId;
    }

    public void setLanguageId(String languageId) {
      this.languageId = languageId;
    }

    public String getUserGroups() {
      return userGroups;
    }

    public void setUserGroups(String userGroups) {
      this.userGroups = userGroups;
    }

    public String getRoles() {
      return roles;
    }

    public void setRoles(String roles) {
      this.roles = roles;
    }
}
