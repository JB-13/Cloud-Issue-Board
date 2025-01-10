package com.example.issueboardbackend.api;

import com.example.issueboardbackend.api.dto.LoginDtoIn;
import com.example.issueboardbackend.api.dto.LoginDtoOut;
import com.example.issueboardbackend.api.security.AccessManager;
import com.example.issueboardbackend.api.security.AccessToken;
import com.example.issueboardbackend.model.User;
import com.example.issueboardbackend.model.dbaccess.UserService;
import com.example.issueboardbackend.util.PasswordTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("access")
public class AccessController {
    private final AccessManager accessManager;
    private final UserService userService;

    @Autowired
    public AccessController(AccessManager accessManager, UserService userService) {
        this.accessManager = accessManager;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<LoginDtoOut> login(@RequestBody LoginDtoIn loginDtoIn) {
        String username = loginDtoIn.getUsername();
        String password = loginDtoIn.getPassword();

        User user = userService.getUserByUsername(username);

        if (!PasswordTools.checkPassword(password, user.getPasswordHash(), user.getPasswordSalt())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        AccessToken accessToken = accessManager.createUserToken(user);
        LoginDtoOut returnData = new LoginDtoOut(user.getUserId(), user.getUsername(), accessToken);

        return ResponseEntity.ok(returnData);
    }

    @DeleteMapping
    public  ResponseEntity<Boolean> logout(@RequestHeader AccessToken accessToken) {
        return ResponseEntity.ok(accessManager.removeUserToken(accessToken));
    }

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateAccessToken(@RequestBody AccessToken accessToken) {
        boolean isValid = accessManager.hasAccess(accessToken);
        return ResponseEntity.ok(isValid);
    }
}
