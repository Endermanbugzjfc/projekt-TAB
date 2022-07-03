package pl.polsl.shop;

public class EntityUtils {
    public static <T> T nonNullOrDefault(T validated, T defaultValue) {
        return validated == null ? defaultValue : validated;
    }
}
