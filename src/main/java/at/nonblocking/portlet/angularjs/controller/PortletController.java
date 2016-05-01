package at.nonblocking.portlet.angularjs.controller;

import at.nonblocking.portlet.angularjs.model.UserDetail;
import at.nonblocking.portlet.angularjs.model.UserList;
import at.nonblocking.portlet.angularjs.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.theme.PortletDisplay;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.portlet.bind.annotation.RenderMapping;
import org.springframework.web.portlet.bind.annotation.ResourceMapping;

import javax.inject.Inject;
import javax.portlet.*;

@Component
@RequestMapping("view")
public class PortletController {

    private static final Logger LOG = LoggerFactory.getLogger(PortletController.class);

    private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

    @Inject
    private UserService userService;

    @RenderMapping
    public String view(RenderRequest request, RenderResponse response, ModelMap model) {
        User user = (User) request.getAttribute(WebKeys.USER);
        String userScreenName = user != null ? user.getScreenName() : "anonymous";

        ResourceURL baseResourceUrl = response.createResourceURL();

        model.addAttribute("ajaxURL", baseResourceUrl.toString());
        model.addAttribute("standalone", false);
        model.addAttribute("authenticatedUser", userScreenName);
        model.addAttribute("portletId", getPortletId(request));
        model.addAttribute("portletAppContextPath", request.getContextPath() + "/");

        return "index";
    }

    @ResourceMapping("userList")
    public void userList(@RequestParam int startIndex, @RequestParam int limit, ResourceResponse response) throws Exception {
        LOG.debug("Got list request for users with startIndex {} and limit {}", startIndex, limit);

        UserList users = this.userService.getPortalUserList(startIndex, limit);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        //Automatic JSON serialization doesn't work yet in Portlet MVC
        //See: https://jira.spring.io/browse/SPR-7344
        JSON_MAPPER.writeValue(response.getPortletOutputStream(), users);
    }

    @ResourceMapping("userDetail")
    public void userDetail(@RequestParam long userId, ResourceResponse response) throws Exception {
        LOG.debug("Got detail request for user with id {}", userId);

        UserDetail userDetail = this.userService.getPortalUserDetail(userId);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        JSON_MAPPER.writeValue(response.getPortletOutputStream(), userDetail);
    }

    private String getPortletId(PortletRequest request) {
        ThemeDisplay themeDisplay = (ThemeDisplay) request.getAttribute(WebKeys.THEME_DISPLAY);
        PortletDisplay portletDisplay = themeDisplay.getPortletDisplay();
        return portletDisplay.getId();
    }
}
