package com.example.issueboardbackend.model.dbaccess.repos;

import com.example.issueboardbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, UserRepositoryJPA{
    @Query("select u from User u")
    public List<User> getAll();

    @Query("select u from User u where u.username = ?1")
    public User getUserByUsername(String username);

    @Query("select u from User u where u.userid = ?1")
    public User getUserById(int userid);
}
