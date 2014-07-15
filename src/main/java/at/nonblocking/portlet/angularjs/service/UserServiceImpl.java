package at.nonblocking.portlet.angularjs.service;

import at.nonblocking.portlet.angularjs.model.User;
import at.nonblocking.portlet.angularjs.model.UserList;
import com.liferay.portal.kernel.exception.SystemException;
import com.liferay.portal.service.UserLocalServiceUtil;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

@Named
public class UserServiceImpl implements UserService {

    @Override
    public UserList getPortalUsers(int startIndex, int limit) throws SystemException {

        int usersTotal = UserLocalServiceUtil.getUsersCount();
        int start = Math.min(startIndex, usersTotal);
        int end = Math.min(startIndex + limit, usersTotal);

        List<com.liferay.portal.model.User> portalUsers = UserLocalServiceUtil.getUsers(start, end);
        List<User> users = new ArrayList<User>();

        for (com.liferay.portal.model.User portalUser : portalUsers) {
            users.add(new User(portalUser.getScreenName(), portalUser.getFirstName(), portalUser.getLastName(), portalUser.getEmailAddress()));
        }

        return new UserList(usersTotal, users);
    }
}
