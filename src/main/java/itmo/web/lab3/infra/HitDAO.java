package itmo.web.lab3.infra;

import java.util.List;

import itmo.web.lab3.beans.Hit;

public interface HitDAO {
    void save(Hit p);

    List<Hit> getAll();

    void clear();
}
