package itmo.web.lab3.util;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

// import itmo.web.lab3.beans.Hit;

public class HibernateUtil {
    private HibernateUtil() {
    }

    // public static SessionFactory getSessionFactory() {
    // if (factory == null) {
    // try {
    // Configuration configuration = new Configuration().configure();
    // log.error(configuration.toString());
    // configuration.addAnnotatedClass(Hit.class);
    // StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder()
    // .applySettings(configuration.getProperties());
    // factory = configuration.buildSessionFactory(builder.build());
    // } catch (Exception e) {
    // log.error("Ошибка getSessionFactory");
    // log.error(e.getMessage());
    // e.printStackTrace();
    // }
    // }
    // return factory;
    // }

    // public static SessionFactory getSessionFactory() {
    // StandardServiceRegistry registry;
    // SessionFactory sessionFactory;
    // registry = new StandardServiceRegistryBuilder().configure().build();

    // MetadataSources sources = new MetadataSources(registry);

    // sources.addAnnotatedClass(Hit.class);

    // Metadata metadata = sources.getMetadataBuilder().build();

    // sessionFactory = metadata.getSessionFactoryBuilder().build();
    // return sessionFactory;
    // }

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