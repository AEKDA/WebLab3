package itmo.web.lab3.beans;

import jakarta.persistence.*;

@Entity
@Table(name = "hits")
public class Hit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double x;
    private double y;
    private double r;
    private boolean hit;
    private long date;
    private long executionTime;

    public Hit(double x, double y, double r, boolean hit, long date, long executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.date = date;
        this.executionTime = executionTime;
    }

    public Hit() {

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

    public long getExecutionTime() {
        return executionTime;
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
