package itmo.web.lab3.beans;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "hits")
public class Hit implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "x")
    private double x;
    @Column(name = "y")
    private double y;
    @Column(name = "r")
    private double r;
    @Column(name = "hit")
    private boolean hit;
    @Column(name = "date")
    private long date;
    @Column(name = "execution_time")
    private long executionTime;

    public Hit(double x, double y, double r, boolean hit, long date, long executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.date = date;
        this.executionTime = executionTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Hit() {
        x = 0;
        y = 0;
        r = 1;
        hit = false;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getHit() {
        return hit;
    }

    public long getDate() {
        return date;
    }

    public Long getExecutionTime() {
        return executionTime;
    }

    public String getDateString() {
        return new Date(date * 1000L).toString();
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setHit(boolean v) {
        hit = v;
    }

    public void setDate(long d) {
        date = d;
    }

    public void setExecutionTime(long l) {
        executionTime = l;
    }

}
