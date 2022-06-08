package pl.polsl.shop.user;

public class NoSuchUserException extends UserException{
    public NoSuchUserException(String message){
        super(message);
    }
}
