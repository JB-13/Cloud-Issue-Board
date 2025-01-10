package com.example.issueboardbackend.model.dbaccess;

import com.example.issueboardbackend.model.User;
import com.example.issueboardbackend.model.dbaccess.repos.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@Transactional
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUser() {return userRepository.getAll();}

    public User getUserByUsername(String username) {return userRepository.getUserByUsername(username);}

    public User getUserById(int userid) {return userRepository.getUserById(userid);}

    public User createUser(String username, String password, String role) {
        return userRepository.createUser(username, password, role);
    }

    public void deleteUser(int userid) {userRepository.deleteUser(userid);}


}
