package itmo.web.lab3.beans;

import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.RequestScoped;

@ManagedBean
@RequestScoped
public class Navigation {
    public String toMain() {
        return "main";
    }

    public String toInfo() {
        return "info";
    }
}
