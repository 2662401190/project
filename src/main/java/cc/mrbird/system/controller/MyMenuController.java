package cc.mrbird.system.controller;


import cc.mrbird.common.annotation.Log;
import cc.mrbird.common.controller.BaseController;
import cc.mrbird.system.domain.Menu;
import cc.mrbird.system.service.MenuService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping()
public class MyMenuController extends BaseController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private MenuService menuService;

    @Log("我的菜单")
    @RequestMapping("mymenu")
    @RequiresPermissions("mymenu:list")
    public String  index(){
        System.out.println(".............................进来");
        return "system/mymenu/mymenu";
    }

    @RequestMapping("my-menu/list")
    @RequiresPermissions("mymenu:list")
    @ResponseBody
    public List<Menu> menuList(Menu menu) {
        try {
            List<Menu> list = this.menuService.findAllMenus(menu);
            System.out.println("...................");
            for (Menu menu1 : list) {
                System.out.println(menu1);
            }

            return this.menuService.findAllMenus(menu);
        } catch (Exception e) {
            logger.error("获取菜单集合失败", e);
            return new ArrayList<>();
        }
    }

}
