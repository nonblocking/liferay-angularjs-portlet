package at.nonblocking.portlet.angularjs.service;


import at.nonblocking.portlet.angularjs.model.UserDetail;
import at.nonblocking.portlet.angularjs.model.UserList;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.exception.SystemException;

public interface UserService {

    UserList getPortalUserList(int startIndex, int limit) throws SystemException;

    UserDetail getPortalUserDetail(long userId) throws SystemException, PortalException;

}
