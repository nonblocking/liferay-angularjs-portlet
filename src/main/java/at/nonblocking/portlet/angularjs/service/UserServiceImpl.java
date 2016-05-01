package at.nonblocking.portlet.angularjs.service;

import at.nonblocking.portlet.angularjs.model.User;
import at.nonblocking.portlet.angularjs.model.UserDetail;
import at.nonblocking.portlet.angularjs.model.UserList;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.exception.SystemException;
import com.liferay.portal.kernel.model.Role;
import com.liferay.portal.kernel.model.UserGroup;
import com.liferay.portal.kernel.service.UserLocalService;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import org.apache.commons.lang3.StringUtils;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

@Named
public class UserServiceImpl implements UserService {

    private UserLocalService liferayUserService;

    public UserServiceImpl(UserLocalService liferayUserService) {
        this.liferayUserService = liferayUserService;
    }

    public UserServiceImpl() {
        this(UserLocalServiceUtil.getService());
    }

    @Override
    public UserList getPortalUserList(int startIndex, int limit) throws SystemException {
        int usersTotal = this.liferayUserService.getUsersCount();
        int start = Math.min(startIndex, usersTotal);
        int end = Math.min(startIndex + limit, usersTotal);

        List<com.liferay.portal.kernel.model.User> portalUsers = this.liferayUserService.getUsers(start, end);
        List<User> users = new ArrayList<>();

        for (com.liferay.portal.kernel.model.User portalUser : portalUsers) {
            users.add(new User(portalUser.getUserId(), portalUser.getScreenName(), portalUser.getFirstName(), portalUser.getLastName(), portalUser.getEmailAddress()));
        }

        return new UserList(usersTotal, users);
    }


  public UserDetail getPortalUserDetail(long userId) throws SystemException, PortalException {
    com.liferay.portal.kernel.model.User liferayUser = this.liferayUserService.getUser(userId);

    UserDetail userDetail = new UserDetail();
    userDetail.setScreenName(liferayUser.getScreenName());
    userDetail.setEmailAddress(liferayUser.getEmailAddress());
    userDetail.setFirstName(liferayUser.getFirstName());
    userDetail.setLastName(liferayUser.getLastName());
    userDetail.setLastLoginDate(liferayUser.getLastLoginDate());
    userDetail.setLastLoginIp(liferayUser.getLastName());
    userDetail.setLanguageId(liferayUser.getLanguageId());

    userDetail.setUserGroups(toCommaSeparatedUserGroupList(liferayUser));
    userDetail.setRoles(toCommaSeparatedRoleList(liferayUser));

    return userDetail;
  }

  private String toCommaSeparatedUserGroupList(com.liferay.portal.kernel.model.User liferayUser)throws SystemException {
    List<String> userGroupNames = new ArrayList<>();
    for (UserGroup userGroup : liferayUser.getUserGroups()) {
      userGroupNames.add(userGroup.getName());
    }
    return StringUtils.join(userGroupNames, ",");
  }

  private String toCommaSeparatedRoleList(com.liferay.portal.kernel.model.User liferayUser)throws SystemException {
    List<String> roleNames = new ArrayList<>();
    for (Role role : liferayUser.getRoles()) {
      roleNames.add(role.getName());
    }
    return StringUtils.join(roleNames, ",");
  }
}
