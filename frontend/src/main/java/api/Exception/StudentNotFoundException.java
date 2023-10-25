package api.Exception;

public class StudentNotFoundException extends RuntimeException{
    public StudentNotFoundException(long id){
        super("Could not find student with the id: "+id);
    }
}
