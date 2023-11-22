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
    private Hit canvasHit;

    public HitsManager() {
        service = new HitService();
        hit = new Hit();
        canvasHit = new Hit();
    }

    public List<Hit> getHits() {

        return service.getHitsData().stream()
                .sorted((o1, o2) -> Long.compare(o2.getDate(), o1.getDate())).toList();

    }

    public Hit getHit() {
        return hit;
    }

    public Hit getCanvasHit() {
        return canvasHit;
    }

    public void checkHit() {
        System.err.println("checkHit");
        long currentDateTime = System.currentTimeMillis() / 1000L;
        long currentTime = System.nanoTime();
        hit.setDate(currentDateTime);
        hit.setHit(service.checkHit(hit));
        hit.setExecutionTime(System.nanoTime() - currentTime);
        service.saveHit(hit);
    }

    public void checkCanvasHit() {
        System.err.println("checkCanvasHit");
        long currentDateTime = System.currentTimeMillis() / 1000L;
        long currentTime = System.nanoTime();
        canvasHit.setDate(currentDateTime);
        canvasHit.setHit(service.checkHit(canvasHit));
        canvasHit.setExecutionTime(System.nanoTime() - currentTime);
        service.saveHit(canvasHit);
    }

    public void clear() {
        System.err.println("clear");
        service.clear();
    }
}
