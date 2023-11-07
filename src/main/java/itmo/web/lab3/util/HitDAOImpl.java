package itmo.web.lab3.util;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import itmo.web.lab3.beans.Hit;

public class HitDAOImpl implements HitDAO {
    private static final Logger log = LoggerFactory.getLogger(HitDAOImpl.class);

    private SessionFactory factory;

    public HitDAOImpl() {
        factory = HibernateUtil.getSessionFactory();
    }

    @Override
    public void save(Hit hit) {
        try {
            Session session = factory.openSession();
            Transaction transaction = session.beginTransaction();
            session.save(hit);
            transaction.commit();
            session.close();
        } catch (HibernateException e) {
            log.error("Ошибка HitDAOIMPL.save");
            log.error(e.getMessage());
        }
    }

    @Override
    public List<Hit> getAll() {
        Session session = factory.openSession();
        return session.createQuery("from " + Hit.class.getSimpleName(), Hit.class).getResultList();
    }
}
