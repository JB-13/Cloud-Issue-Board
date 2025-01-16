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
    public User createUser(String username, String password)
    {
        byte[] passwordSalt = PasswordTools.generateSalt();
        byte[] passwordHash = PasswordTools.generatePasswordHash(password, passwordSalt);

        User user = new User(username, passwordSalt, passwordHash, "Zuschauer");

        entityManager.persist(user);
        entityManager.flush();
        entityManager.refresh(user);

        return user;
    }

    @Override
    public User updateUser(int userId, String role, int id) {
        User currentUser = entityManager.find(User.class, id);
        if (!currentUser.getRole().equals("Admin")) {
            throw new SecurityException("Benutzer hat keine Berechtigung, den Benutzer zu bearbeiten");
        }
        User user = entityManager.find(User.class, userId);
        user.setRole(role);

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
