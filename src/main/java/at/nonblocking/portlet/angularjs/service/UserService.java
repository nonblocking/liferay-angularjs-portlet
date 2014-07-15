package at.nonblocking.portlet.angularjs.service;


import at.nonblocking.portlet.angularjs.model.UserList;
import com.liferay.portal.kernel.exception.SystemException;

public interface UserService {

    UserList getPortalUsers(int startIndex, int limit) throws SystemException;

}
