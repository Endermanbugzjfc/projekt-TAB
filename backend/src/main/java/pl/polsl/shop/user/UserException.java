package pl.polsl.shop.user;

public abstract class UserException extends Exception {
    public UserException(String message){
        super(message);
    }
}
