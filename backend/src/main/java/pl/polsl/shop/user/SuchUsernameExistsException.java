package pl.polsl.shop.user;

public class SuchUsernameExistsException extends Exception{
    public SuchUsernameExistsException(String message){
        super(message);
    }
}
