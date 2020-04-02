package org.biosino.dev.antnest.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
@CrossOrigin
public class IndexController {

    @RequestMapping(path = {"/","/index"},method = RequestMethod.GET)
    public String indexPage(HttpServletRequest request,Model model) {
//        model.addAttribute("title","dashboard");
        return "mobile";
    }

}
