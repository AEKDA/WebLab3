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
        return false;
    }

}
