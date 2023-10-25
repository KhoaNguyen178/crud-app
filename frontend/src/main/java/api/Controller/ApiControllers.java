package api.Controller;
import api.Models.Student;
import api.Models.User;
import api.Repo.StudentRepo;
import api.Repo.UserRepository;
import api.Exception.StudentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import api.Exception.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Optional;

import java.util.List;

@RestController
//@CrossOrigin("http://localhost:3000")
@RequestMapping("/")
@CrossOrigin(origins ="*", maxAge = 3600)
public class ApiControllers {
    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    private UserRepository userRepository; // Add this line to inject the UserRepository
//    @Autowired
//    private Authentication authentication;
    @GetMapping("/")
    public String getPage(){
        return "Welcome";
    }
    @GetMapping(value ="/student")
    public List<Student> getUsers(){
        return studentRepo.findAll();
    }
    @PostMapping(value ="/save")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> saveStudent(@RequestBody Student student){
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            // Find the user by username (assuming username is unique)
            Optional<User> optionalUser = userRepository.findByUsername(userDetails.getUsername());
            System.out.println("Authenticated user: " + userDetails.getUsername());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                System.out.println("Found user: " + user.getUsername());
                // Set the user in the student object
                student.setUser(user);
                // Save the student to the database
                studentRepo.save(student);
                return new ResponseEntity<>("Saved!", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("Failed to save student!", HttpStatus.BAD_REQUEST);
    }
    //        studentRepo.save(student);
//        return new ResponseEntity<>("Saved!", HttpStatus.OK);
//    }
    @PutMapping(value ="update/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable long id, @RequestBody Student student) {
            Student updateStudent = getStudentById(id);
            updateStudent.setFirstName(student.getFirstName());
            updateStudent.setMiddleName(student.getMiddleName());
            updateStudent.setLastName(student.getLastName());
            updateStudent.setMajor(student.getMajor());
            updateStudent.setDob(student.getDob());
            studentRepo.save(updateStudent);
            return new ResponseEntity<>("Updated!", HttpStatus.OK);
    }
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable long id){
        Student deleteStudent= getStudentById(id);
        studentRepo.delete(deleteStudent);
        return new ResponseEntity<>("Deleted " +id+"!", HttpStatus.OK);
    }
    @GetMapping("/student/{id}")
    Student getStudentById(@PathVariable long id){
        return studentRepo.findById(id).orElseThrow(()->new StudentNotFoundException(id));
    }

}
