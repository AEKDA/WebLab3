package itmo.web.lab3.util;

import org.hibernate.SessionFactory;
// import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// import itmo.web.lab3.beans.Hit;

public class HibernateUtil {
    private static final Logger log = LoggerFactory.getLogger(HibernateUtil.class);

    private static SessionFactory factory;

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

    public static SessionFactory getSessionFactory() {
        if (factory == null) {
            try {
                return new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
            } catch (Throwable ex) {
                System.err.println("Инициализация фабрики сессий не удалась." + ex);
                throw new ExceptionInInitializerError(ex);
            }
        }
        return factory;
    }
}