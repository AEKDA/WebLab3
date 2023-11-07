package itmo.web.lab3.beans;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

@Named
@ViewScoped
public class Clock implements Serializable {

    private static final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("d MMMM yyyy, HH:mm:ss");

    public String getTime() {
        return dtf.format(LocalDateTime.now());
    }
}