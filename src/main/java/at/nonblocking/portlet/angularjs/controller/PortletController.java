package at.nonblocking.portlet.angularjs.controller;

import at.nonblocking.portlet.angularjs.model.UserList;
import at.nonblocking.portlet.angularjs.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liferay.portal.kernel.util.WebKeys;
import com.liferay.portal.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.portlet.bind.annotation.RenderMapping;
import org.springframework.web.portlet.bind.annotation.ResourceMapping;

import javax.inject.Inject;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;
import javax.portlet.ResourceResponse;
import javax.portlet.ResourceURL;

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

        return "index";
    }

    @ResourceMapping("users")
    public void users(@RequestParam int startIndex, @RequestParam int limit, ResourceResponse response) throws Exception {
        LOG.debug("Got request for users with startIndex {} and limit {}", startIndex, limit);

        UserList users = this.userService.getPortalUsers(startIndex, limit);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        //Automatic JSON serialization doesn't work yet in Protlet MVC
        //See: https://jira.spring.io/browse/SPR-7344
        JSON_MAPPER.writeValue(response.getPortletOutputStream(), users);
    }

}
