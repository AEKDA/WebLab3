package itmo.web.lab3.util;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import itmo.web.lab3.beans.Hit;

public class HitDAOImpl implements HitDAO {

    private SessionFactory factory;

    public HitDAOImpl() {
        factory = HibernateUtil.getSessionFactory();
    }

    @Override
    public void save(Hit hit) {
        Session session = factory.openSession();
        Transaction transaction = session.beginTransaction();
        session.save(hit);
        transaction.commit();
        session.close();
    }

    @Override
    public List<Hit> getAll() {
        Session session = factory.openSession();
        return session.createQuery("from " + Hit.class.getSimpleName(), Hit.class).getResultList();
    }
}
