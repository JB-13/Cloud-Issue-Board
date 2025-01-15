package com.example.issueboardbackend.api;

import com.example.issueboardbackend.api.dto.*;
import com.example.issueboardbackend.api.security.AccessManager;
import com.example.issueboardbackend.api.security.AccessToken;
import com.example.issueboardbackend.model.Issue;
import com.example.issueboardbackend.model.User;
import com.example.issueboardbackend.model.dbaccess.IssueService;
import com.example.issueboardbackend.model.dbaccess.UserService;
import com.example.issueboardbackend.model.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.Collections;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final AccessManager accessManager;
    private final IssueService issueService;

    @Autowired
    public UserController(AccessManager accessManager, UserService userService, IssueService issueService) {
        this.userService = userService;
        this.accessManager = accessManager;
        this.issueService = issueService;
    }

    @GetMapping
    public ResponseEntity<Collection<UserDtoOut>> getAllUser(@RequestHeader AccessToken accessToken)
    {
        checkAnmeldung( accessToken );

        return ResponseEntity.ok(userService.getAllUser().stream()
                .map(UserDtoOut::new)
                .toList()
        );
    }


    @GetMapping("{userid}")
    public ResponseEntity<UserDtoOut> getUserById(@RequestHeader AccessToken accessToken, @PathVariable int userid)
    {
        checkAnmeldung( accessToken );

        try {
            return ResponseEntity.ok(new UserDtoOut(userService.getUserById(userid)));
        } catch (NotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getLocalizedMessage());
        }
    }


    @PostMapping
    public ResponseEntity<LoginDtoOut> createUser(@RequestBody UserCreateDtoIn userCreateDtoIn)
    {
        try {
            User user = userService.createUser(userCreateDtoIn.getUsername(),
                    userCreateDtoIn.getPassword(),
                    userCreateDtoIn.getRole());

            AccessToken accessToken = accessManager.createUserToken(user);

            LoginDtoOut returnData = new LoginDtoOut( user.getUserId(), user.getUsername(), accessToken);
            return ResponseEntity.ok(returnData);
        }
        catch (Exception exception)
        {
            exception.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getLocalizedMessage());
        }
    }

    @DeleteMapping("{userid}")
    public ResponseEntity<Void> deleteUserById(@RequestHeader AccessToken accessToken, @PathVariable("userid") int userid)
    {
        checkAnmeldung( accessToken );
        checkBerechtigung( accessToken, userid );

        try {
            accessManager.removeUserToken( accessToken );
            userService.deleteUser(userid);
            return ResponseEntity.ok().build();
        } catch (NotFoundException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getLocalizedMessage());
        }
    }


    @PostMapping("/{id}/issue")
    public ResponseEntity<?> createIssue(@RequestHeader AccessToken accessToken, @PathVariable int id, @RequestBody IssueCreateDtoIn issueCreateDtoIn) {
        checkAnmeldung(accessToken);
        checkBerechtigung(accessToken, id);

        try {
            Integer createdBy = id;

            Issue issue = issueService.createIssue(
                    issueCreateDtoIn.getTitel(),
                    issueCreateDtoIn.getDescription(),
                    issueCreateDtoIn.getStatus(),
                    issueCreateDtoIn.getCreatedAt(),
                    issueCreateDtoIn.getUpdatedAt(),
                    createdBy,
                    issueCreateDtoIn.getAssignedTo()
            );
            IssueDtoOut issueDtoOut = new IssueDtoOut(issue);
            return ResponseEntity.status(HttpStatus.CREATED).body(issueDtoOut);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getLocalizedMessage());
        }
    }


    @GetMapping("/issues")
    public ResponseEntity<?> getIssues() {

        try {
            List<Issue> issues = issueService.getAllIssues();
            List<IssueDtoOut> issueDtoOutList = issues.stream().map(IssueDtoOut::new).toList();
            return ResponseEntity.ok(issueDtoOutList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getLocalizedMessage());
        }
    }


    @DeleteMapping("/{id}/issue/{issueId}")
    public ResponseEntity<?> deleteIssue(@RequestHeader AccessToken accessToken, @PathVariable int id, @PathVariable int issueId) {
        checkAnmeldung(accessToken);
        checkBerechtigung(accessToken, id);

        try {
            issueService.deleteIssue(issueId);
            return ResponseEntity.ok(Collections.singletonMap("message", "Issue successfully deleted."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Internal server error: " + e.getMessage()));
        }
    }



    private void checkAnmeldung(AccessToken accessToken)
    {
        if( !accessManager.hasAccess(accessToken) )
        {
            throw new ResponseStatusException( HttpStatus.UNAUTHORIZED, "User nicht angemeldet");
        }
    }

    private void checkBerechtigung(AccessToken accessToken, int userid )
    {
        if( accessManager.getUser(accessToken).getUserId() != userid )
        {
            throw new ResponseStatusException( HttpStatus.UNAUTHORIZED, "User hat keine Berechtigung");
        }
    }
}
