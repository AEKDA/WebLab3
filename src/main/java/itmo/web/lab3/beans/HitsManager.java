package itmo.web.lab3.beans;

import java.util.List;

import itmo.web.lab3.services.HitService;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

@Named
@ApplicationScoped
@ManagedBean
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

    public Hit getHit() {
        return hit;
    }

    public void checkHit() {
        long currentDateTime = System.currentTimeMillis() / 1000L;
        long currentTime = System.nanoTime();
        hit.setDate(currentDateTime);
        hit.setHit(service.checkHit(hit));
        hit.setExecutionTime(System.nanoTime() - currentTime);
        service.saveHit(hit);
    }
}
