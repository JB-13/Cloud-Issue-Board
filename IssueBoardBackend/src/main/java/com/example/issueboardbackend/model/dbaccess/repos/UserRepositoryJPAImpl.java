package com.example.issueboardbackend.model.dbaccess.repos;

import com.example.issueboardbackend.model.User;
import com.example.issueboardbackend.util.PasswordTools;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class UserRepositoryJPAImpl implements UserRepositoryJPA{
    EntityManager entityManager;

    @Autowired
    public UserRepositoryJPAImpl(EntityManager entityManager) {this.entityManager = entityManager;}

    @Override
    public User createUser(String username, String passwort, String role)
    {
        byte[] passwordSalt = PasswordTools.generateSalt();
        byte[] passwordHash = PasswordTools.generatePasswordHash(passwort, passwordSalt);

        User user = new User(username, passwordSalt, passwordHash, role);

        entityManager.persist(user);
        entityManager.flush();
        entityManager.refresh(user);

        return user;
    }


    @Override
    public void deleteUser(int userid){
        User user = entityManager.find(User.class, userid);
        entityManager.remove(user);
    }
}
