package itmo.web.lab3.infra;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class HibernateUtil {
    private HibernateUtil() {
    }

    public static EntityManagerFactory getSessionFactory() {
        try {
            EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("PostgresPU");
            return entityManagerFactory;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ExceptionInInitializerError(e);
        }
    }

}