package itmo.web.lab3.services;

import java.util.List;

import itmo.web.lab3.beans.Hit;
import itmo.web.lab3.util.HitDAO;
import itmo.web.lab3.util.HitDAOImpl;



public class HitService {
    private HitDAO dao = new HitDAOImpl();

    public HitService() {
    }

    public List<Hit> getHitsData() {
        return dao.getAll();
    }

    public void saveHit(Hit h) {
        dao.save(h);
    }

    public boolean checkHit(Hit h) {
        return isHitCircle(h.getX(), h.getY(), h.getR()) || isHitRectangle(h.getX(), h.getY(), h.getR())
                || isHitTriangle(h.getX(), h.getY(), h.getR());
    }

    private boolean isHitCircle(double x, double y, double r) {
        return x >= 0 && y <= 0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2, 2));
    }

    private boolean isHitRectangle(double x, double y, double r) {
        return x >= 0 && x <= r && y >= 0 && y <= r;
    }

    private boolean isHitTriangle(double x, double y, double r) {
        return x <= 0 && y <= 0 && y >= -x - r;
    }

}
