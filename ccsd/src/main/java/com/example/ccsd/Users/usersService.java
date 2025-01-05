//usersService.java
package com.example.ccsd.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class usersService {

    @Autowired
    private usersRepository usersRepository;

    public List<users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Optional<users> getUserById(String id) {
        return usersRepository.findById(id);
    }

    public users addUser(users user) {
        return usersRepository.save(user);
    }

    public users updateUser(String id, users userDetails) {
        Optional<users> user = usersRepository.findById(id);
        if (user.isPresent()) {
            userDetails.setId(id);
            return usersRepository.save(userDetails);
        }
        return null;
    }

    public void deleteUser(String id) {
        usersRepository.deleteById(id);
    }

    public users getUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
}
