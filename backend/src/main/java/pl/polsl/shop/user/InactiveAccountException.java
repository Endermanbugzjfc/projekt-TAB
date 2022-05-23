package pl.polsl.shop.user;

public class InactiveAccountException extends UserException{
    public InactiveAccountException(String message){
        super(message);
    }
}