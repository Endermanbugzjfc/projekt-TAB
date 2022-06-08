package pl.polsl.shop.user;

public abstract class UserException extends RuntimeException {
    public UserException(String message){
        super(message);
    }
}
