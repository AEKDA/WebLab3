package itmo.web.lab3.util;

import java.util.List;

import itmo.web.lab3.beans.Hit;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;

public class HitDAOImpl implements HitDAO {

    private EntityManagerFactory factory;

    public HitDAOImpl() {
        factory = HibernateUtil.getSessionFactory();
    }

    @Override
    public void save(Hit hit) {
        Hit newHit = new Hit(hit.getX(), hit.getY(), hit.getR(), hit.getHit(), hit.getDate(), hit.getExecutionTime());
        EntityManager manager = factory.createEntityManager();
        try {
            manager.getTransaction().begin();
            manager.persist(newHit);
            manager.getTransaction().commit();
        } catch (Exception e) {
            if (manager.getTransaction().isActive()) {
                manager.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            manager.close();
        }
    }

    @Override
    public void clear() {
        EntityManager entityManager = factory.createEntityManager();
        try {
            entityManager.getTransaction().begin();
            entityManager.createQuery("DELETE FROM Hit").executeUpdate();
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            e.printStackTrace();
        } finally {
            entityManager.close();
        }
    }

    @Override
    public List<Hit> getAll() {
        EntityManager entityManager = factory.createEntityManager();
        try {
            return entityManager.createQuery("SELECT h FROM Hit h", Hit.class).getResultList();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            entityManager.close();
        }
        return null;
    }

}
