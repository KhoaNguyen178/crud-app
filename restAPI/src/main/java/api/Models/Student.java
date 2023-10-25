package api.Models;
import jakarta.persistence.*;
import lombok.Data;
import java.time.*;
@Data
@Entity
@Table(name = "Student") //user is a reserved keyword
public class Student {
    @Id
    @GeneratedValue
    private int id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String middleName;
    @Column
    private String major;
    @Column
    private LocalDate dob;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    public String getFirstName(){
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getMiddleName(){return middleName;}
    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }
    public String getLastName(){
        return lastName;
    }
    public void setLastName(String lastName){
        this.lastName=lastName;
    }
    public String getMajor() {
        return major;
    }
    public void setMajor(String major) {
        this.major = major;
    }
    public void setDob(LocalDate dob) {
        this.dob = dob;
    }
    public LocalDate getDob() {
        return dob;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}
