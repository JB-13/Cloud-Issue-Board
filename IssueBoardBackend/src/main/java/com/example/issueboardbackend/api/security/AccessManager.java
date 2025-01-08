package com.example.issueboardbackend.api.security;


import com.example.issueboardbackend.model.User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AccessManager {
    private Map<AccessToken, User> accessList = new ConcurrentHashMap<>();

    public AccessToken createUserToken(User user) {
        String uuid = UUID.randomUUID().toString();
        AccessToken accessToken = new AccessToken(uuid);

        accessList.put(accessToken, user);

        return accessToken;
    }

    public boolean removeUserToken(AccessToken accessToken) {
        return accessList.remove(accessToken) != null;
    }

    public boolean hasAccess(AccessToken accessToken) {
        return accessList.containsKey(accessToken);
    }

    public User getUser(AccessToken accessToken) {
        return accessList.get(accessToken);
    }
}
