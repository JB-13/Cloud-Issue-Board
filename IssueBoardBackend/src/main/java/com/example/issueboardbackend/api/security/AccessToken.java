package com.example.issueboardbackend.api.security;

import java.util.Objects;

public class AccessToken {
    private String accessToken;

    public  AccessToken(String uuid) {
        this.accessToken = uuid;
    }

    public AccessToken() {}

    public String getAccessToken()
    {
        return accessToken;
    }

    public void setAccessToken(String accessToken)
    {
        this.accessToken = accessToken;
    }

    @Override
    public boolean equals(Object o)
    {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        AccessToken accessToken = (AccessToken) o;
        return Objects.equals(this.accessToken, accessToken.accessToken);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(accessToken);
    }
}
