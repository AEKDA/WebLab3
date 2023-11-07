package itmo.web.lab3.beans;

import java.util.List;

import itmo.web.lab3.services.HitService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

@Named
@ApplicationScoped
public class HitsManager {
    private HitService service;
    private Hit hit;

    public HitsManager() {
        service = new HitService();
        hit = new Hit();
    }

    public List<Hit> getHits() {
        return service.getHitsData();
    }

    public void checkHit() {
        long currentDateTime = System.currentTimeMillis() / 1000L;
        hit.setDate(currentDateTime);
        hit.setHit(service.checkHit(hit));
        hit.setExecutionTime(currentDateTime);
        service.saveHit(hit);

    }
}
